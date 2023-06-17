import { saveAs } from 'file-saver';
import ConverterForPrinting from './ConverterForPrinting';

export default class StoreResult {
  /**
  * save the result as .json-File
  * @param {list} roomSlots - all neccessary informations from the result
  */
  saveAsJSON (roomSlots) {
    const converter = new ConverterForPrinting();
    const result = [];
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
          beamer: room.getBeamerNeeded(),
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
      }
      result.push(newRoomSlot);
    }
    const resultString = JSON.stringify(result, null, 1);
    const blob = new Blob([resultString], { type: 'application/json' });
    saveAs(blob, 'result.json');
  }

  /**
   * save the result as .txt-File
   * @param {list} roomSlots - all neccessary informations from the result
   */
  saveAsTXT (roomSlots) {
    let result = '';
    const converter = new ConverterForPrinting();
    for (const s of roomSlots) {
      for (const room of s.getRooms()) {
        if (room.getReview() === null) {
          continue;
        }
        result += 'Review: ' + room.getReview().getGroupName() +
            ' on ' + converter.getDataDDmmYYYYforPrinting(s.getDate()) +
            ' from ' + converter.getTimeHHmm(s.getStartTime()) +
            ' to ' + converter.getTimeHHmm(s.getEndTime()) +
            ' in ' + room.getName() + '\n';
        result += (room.getBeamerNeeded() ? 'Beamer needed' : 'No Beamer needed') + '\n';
        result += 'Author: ' + converter.getParticipantAttributsForPrinting(room.getReview().getAuthor()) + '\n';
        result += 'Moderator: ' + converter.getParticipantAttributsForPrinting(room.getReview().getModerator()) + '\n';
        result += 'Notary: ' + converter.getParticipantAttributsForPrinting(room.getReview().getNotary()) + '\n';
        for (const reviewer of room.getReview().getReviewer()) {
          result += 'Reviewer: ' + converter.getParticipantAttributsForPrinting(reviewer) + '\n';
        }
        result += '*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x' + '\n';
      }
    }
    const blob = new Blob([result], { type: 'text/plain' });
    saveAs(blob, 'result.txt');
  }
}
