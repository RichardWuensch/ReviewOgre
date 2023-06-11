import { saveAs } from 'file-saver';
import ConverterForPrinting from './ConverterForPrinting';

export default class StoreResult {
  #roomSlots = [];

  /**
  * Generate the file and start the download process
  * @param {list} roomSlots - all neccessary informations from the result
  */
  runFileSave (roomSlots) {
    this.parseRoomSlotsFromStore(roomSlots);
    const resultString = JSON.stringify(this.#roomSlots, null, 1);
    const blob = new Blob([resultString], { type: 'application/json' });
    saveAs(blob, 'result.json');
  }

  /**
  * Parse the result in a roomSlots object bc getters are needed for access
  * @param {list} roomSlots - all neccessary informations from the result
  */
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
        if (room.getReview() === null) continue;
        const newRoom = {
          name: room.getName(),
          beamer: room.hasBeamer(),
          review: {}
        };
        const review = room.getReview();
        const newReview = {
          groupName: review.getGroupName(),
          author: converter.getParticipantAttributsForPrinting(review.getAuthor()),
          moderator: converter.getParticipantAttributsForPrinting(review.getModerator()),
          notary: converter.getParticipantAttributsForPrinting(review.getNotary()),
          reviewers: []
        };
        for (const reviewer of review.getReviewer()) {
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
