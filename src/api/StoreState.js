import { saveAs } from 'file-saver';
import ConverterForPrinting from './ConverterForPrinting';

export default class StoreState {
  /**
  * saves the state as .json-File
  * @param {list} roomSlots - all configured roomSlots, can contain reviews, see saveWithReviews
  * @param {list} participants - all configured participants
  * @param {object} settings - all configured settings
  * @param {boolean} saveWithReviews - if true, the reviews and other calculated data are stored in the file as well
  */
  saveAsJSON (roomSlots, participants, settings, saveWithReviews) {
    const state = {
      roomSlots: this.#buildRoomSlotsForJSON(roomSlots, saveWithReviews),
      participants: this.#buildParticipantsForJSON(participants, saveWithReviews),
      settings
    };

    const stateString = JSON.stringify(state, null, 1);
    const blob = new Blob([stateString], { type: 'application/json' });
    const filename = saveWithReviews ? 'state-with-reviews.json' : 'state.json';
    saveAs(blob, filename);
  }

  #buildRoomSlotsForJSON (roomSlots, saveWithReviews) {
    const converter = new ConverterForPrinting();
    const newRoomSlots = [];
    for (const roomSlot of roomSlots) {
      const newRoomSlot = {
        roomSlotId: roomSlot.getId(),
        date: converter.getYYYYmmDDforRevagerLite(roomSlot.getDate()),
        startTime: converter.getTimeHHmm(roomSlot.getStartTime()),
        endTime: converter.getTimeHHmm(roomSlot.getEndTime()),
        rooms: []
      };
      for (const room of roomSlot.getRooms()) {
        const newRoom = {
          roomId: room.getId(),
          name: room.getName(),
          beamerNeeded: room.getBeamerNeeded()
        };
        if (saveWithReviews) {
          newRoom.notNeeded = room.getNotNeeded();
          if (room.getReview()) {
            newRoom.review = {
              groupName: room.getReview().getGroupName(),
              authorId: room.getReview().getAuthor().getId(),
              moderatorId: room.getReview().getModerator().getId(),
              notaryId: room.getReview().getNotary().getId(),
              reviewerIds: room.getReview().getReviewer().map(reviewer => reviewer.getId()),
              possibleParticipantIds: room.getReview().getPossibleParticipants().map(possibleP => possibleP.getId())
            };
          }
        }
        newRoomSlot.rooms.push(newRoom);
      }
      newRoomSlots.push(newRoomSlot);
    }
    return newRoomSlots;
  }

  #buildParticipantsForJSON (participants, saveWithReviews) {
    const newParticipants = [];
    for (const participant of participants) {
      const newParticipant = {
        participantId: participant.getId(),
        firstName: participant.getFirstName(),
        lastName: participant.getLastName(),
        email: participant.getEmail(),
        group: participant.getGroup(),
        topic: participant.getTopic(),
        languageLevel: participant.getLanguageLevel()
      };

      if (saveWithReviews) {
        newParticipant.reviewerCount = participant.getReviewerCount();
        newParticipant.authorCount = participant.getAuthorCount();
        newParticipant.notaryCount = participant.getNotaryCount();
        newParticipant.moderatorCount = participant.getModeratorCount();
        if (participant.getActiveSlots().length > 0) {
          newParticipant.activeInSlotIds = participant.getActiveSlots().map(slot => slot.getId());
        }
      };

      newParticipants.push(newParticipant);
    }
    return newParticipants;
  }

  /**
   * save the result as .txt-File
   * @param {list} roomSlots - all neccessary information from the result
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