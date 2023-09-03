import { jsPDF as JSPDF } from 'jspdf';
import 'jspdf-autotable';
import ConverterForPrinting from './ConverterForPrinting';

const minimumXIndentation = 15;
const minimumYIndentation = 25;
const reviewOgerGreen = [176, 215, 175];
const reviewOgerTextGrey = [79, 90, 86];

export default class SaveRoomPlan {
  #roomSlots;
  #roomPlan;
  #rooms;
  #converter = new ConverterForPrinting();
  constructor (roomSlots) {
    this.#roomSlots = roomSlots; // reviews are saved in roomSlots after algorithm ran successfully
    this.#roomPlan = new JSPDF({ orientation: 'landscape' });
  }

  // call this method to trigger file save
  // pdf is saved to download folder and opened in browser
  runSaveAsTable () {
    this.#initDocument();
    this.#fillPDFAsTable();
    this.#roomPlan.save('Room-Plan-Table.pdf');
  }

  #initDocument () {
    // header text before table
    this.#roomPlan
      .setFont(undefined, 'bold')
      .text(
        'Room Plan',
        minimumXIndentation,
        minimumYIndentation)
      .setFont(undefined, 'normal');
  }

  // creates a table including all slots and their corresponding rooms
  #fillPDFAsTable () {
    // create table
    this.#roomPlan.autoTable({
      head: [['Slot', 'Room', 'Review', 'Moderator']],
      body: this.#createTableBody(),
      theme: 'grid',
      headStyles: {
        fillColor: reviewOgerGreen,
        textColor: reviewOgerTextGrey
      },
      tableLineWidth: 0.5,
      tableLineColor: reviewOgerTextGrey,
      styles: {
        lineWidth: 0.25,
        lineColor: reviewOgerTextGrey
      },
      columnStyles: {
        0: { fontStyle: 'bold' } // header texts are bold
      },
      startY: minimumYIndentation + 5
    });
  }

  #createTableBody () {
    const tableBody = [];
    for (const roomSlot of this.#roomSlots) {
      for (let i = 0; i < roomSlot.getRooms().length; i++) {
        const row = [];
        const room = roomSlot.getRooms()[i];
        if (!room.getReview()) continue;
        row.push(room.getName());
        row.push(room.getReview().getGroupName());
        row.push(room.getReview().getModerator().getFullName());

        // on first room of slots, split column span
        if (i === 0) {
          row.unshift({
            rowSpan: roomSlot.getRooms().length,
            content: this.#getSlotTimes(roomSlot),
            styles: { valign: 'middle', halign: 'center' }
          });
        }
        tableBody.push(row);
      }
    }

    return tableBody;
  }

  runSaveAsMatrix () {
    this.#initDocument();
    this.#fillRoomsFromRoomSlots();
    this.#fillPDFAsMatrix();
    this.#roomPlan.save('Room-Plan-Matrix.pdf');
  }

  #fillPDFAsMatrix () {
    const header = [[{
      content: 'Slot',
      colSpan: 3,
      style: { halign: 'center', valign: 'middle' }
    }, {
      content: 'Room',
      colSpan: this.#rooms.length
    }]];

    this.#roomPlan.autoTable({
      head: header,
      body: this.#createMatrixBody(),
      theme: 'grid',
      headStyles: {
        fillColor: reviewOgerGreen,
        textColor: reviewOgerTextGrey
      },
      tableLineWidth: 0.5,
      tableLineColor: reviewOgerTextGrey,
      startY: minimumYIndentation + 5,
      styles: {
        lineWidth: 0.15,
        lineColor: reviewOgerTextGrey
      },
      columnStyles: {
        3: { lineWidth: { right: 0.15, left: 0.5, top: 0.15, bottom: 0.15 } } // line between slots and rooms is bold
      },
      didParseCell: function (data) {
        // styling on first row (second header)
        if (data.row.index === 0) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.lineWidth = { bottom: 0.75, left: 0.375, right: 0.375 };
          data.cell.styles.fillColor = reviewOgerGreen;
        }
      }
    });
  }

  #createMatrixBody () {
    const tableBody = [];
    const slotHeaderCells = ['Date', 'Start Time', 'End Time'];
    tableBody.push([
      ...slotHeaderCells,
      ...this.#rooms.map(room => room.getName())
    ]); // room names in header

    for (const roomSlot of this.#roomSlots) {
      const row = [
        this.#converter.getDataDDmmYYYYforPrinting(roomSlot.getDate()),
        this.#converter.getTimeHHmm(roomSlot.getStartTime()),
        this.#converter.getTimeHHmm(roomSlot.getEndTime())
      ];
      for (const room of this.#rooms) {
        const slotRoom = roomSlot.getRooms().find(slotRoom => slotRoom.getName() === room.getName());
        if (!slotRoom || !slotRoom.getReview()) {
          row.push('-');
        } else {
          row.push(slotRoom.getReview().getGroupName());
        }
      }

      tableBody.push(row);
    }

    return tableBody;
  }

  #fillRoomsFromRoomSlots () {
    this.#rooms = [];
    for (const roomSlot of this.#roomSlots) {
      for (const room of roomSlot.getRooms()) {
        const foundRoom = this.#rooms.find(savedRoom => savedRoom.getName() === room.getName());
        if (!foundRoom) {
          this.#rooms.push(room);
        }
      }
    }
  }

  #getSlotTimes (roomSlot) {
    const date = this.#converter.getDataDDmmYYYYforPrinting(roomSlot.getDate());
    const startTime = this.#converter.getTimeHHmm(roomSlot.getStartTime());
    const endTime = this.#converter.getTimeHHmm(roomSlot.getEndTime());

    return date + ' from ' + startTime + ' - ' + endTime;
  }
}
