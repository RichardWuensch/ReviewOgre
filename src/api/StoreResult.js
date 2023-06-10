import { saveAs } from 'file-saver';
import ConverterForPrinting from './ConverterForPrinting';

export default class StoreResult {
  #roomSlots = [];
  runFileSave (roomSlots) {
    this.parseRoomSlotsFromStore(roomSlots);
    const resultString = JSON.stringify(this.#roomSlots, null, 1);
    console.log(resultString);
    const blob = new Blob([resultString], { type: 'application/json' });
    saveAs(blob, 'result.json');
  }

  parseRoomSlotsFromStore (roomSlots) {
    const converter = new ConverterForPrinting();
    for (const roomSlot of roomSlots) {
      const newRoomSlot = {
        date: converter.getDataDDmmYYYYforPrinting(roomSlot.getDate()),
        startTime: converter.getTimeHHmm(roomSlot.getStartTime()),
        endTime: converter.getTimeHHmm(roomSlot.getEndTime()),
        rooms: []
      };
      for (const room of roomSlot.getRooms()) {
        console.log(room.getReview());
        if (room.getReview() === null) continue;
        const newRoom = {
          name: room.getName(),
          beamer: room.hasBeamer(),
          review: {}
        };
        const newReview = {
          groupName: room.getReview().getGroupName(),
          author: converter.getParticipantAttributsForPrinting(room.getReview().getAuthor()),
          moderator: converter.getParticipantAttributsForPrinting(room.getReview().getModerator()),
          notary: converter.getParticipantAttributsForPrinting(room.getReview().getNotary()),
          reviewers: []
        };
        for (const reviewer of room.getReview().getReviewer()) {
          const newReviewer = {
            reviewer: converter.getParticipantAttributsForPrinting(reviewer)
          };
          newReview.reviewers.push(newReviewer);
        }
        newRoom.review = newReview;
        newRoomSlot.rooms.push(newRoom);
      };
      this.#roomSlots.push(newRoomSlot);
    }
  }
}
