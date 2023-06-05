import { jsPDF as JSPDF } from 'jspdf';
import 'jspdf-autotable';
import ConverterForPrinting from './ConverterForPrinting';

const minimumXIndentation = 15;
const minimumYIndentation = 25;

export default class SaveRoomPlan {
  #roomSlots;
  #roomPlan;
  #converter = new ConverterForPrinting();
  constructor (roomSlots) {
    this.#roomSlots = roomSlots; // reviews are saved in roomSlots after algorithm ran successfully
    this.#roomPlan = new JSPDF();
  }

  // call this method to trigger file save
  // pdf is saved to download folder and opened in browser
  runSave () {
    this.#fillPDFAsTable();
    this.#roomPlan.save('Room-Plan.pdf');
  }

  // creates a table including all slots and their corresponding rooms
  #fillPDFAsTable () {
    // header text before table
    this.#roomPlan
      .setFont(undefined, 'bold')
      .text(
        'Room Plan',
        minimumXIndentation,
        minimumYIndentation)
      .setFont(undefined, 'normal');

    // create table
    this.#roomPlan.autoTable({
      head: [['Slot', 'Room', 'Review', 'Moderator']],
      body: this.#createTableBody(),
      theme: 'grid',
      headStyles: {
        fillColor: [176, 215, 175],
        textColor: [79, 90, 86]
      },
      tableLineWidth: 0.5,
      tableLineColor: [79, 90, 86],
      styles: {
        lineWidth: 0.25,
        lineColor: [79, 90, 86]
      },
      columnStyles: {
        0: { fontStyle: 'bold' } // slot column text is set to bold
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
        // TODO: check for room.getReview() === null necessary?
        if (room.getReview() === null) continue;
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

  #getSlotTimes (roomSlot) {
    const date = this.#converter.getDataDDmmYYYYforPrinting(roomSlot.getDate());

    const startTime = this.#converter.getTimeHHmm(roomSlot.getStartTime());

    const endTime = this.#converter.getTimeHHmm(roomSlot.getEndTime());

    return date + ' from ' + startTime + ' - ' + endTime;
  }
}
