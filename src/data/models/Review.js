import Slot from './Slot';

export default class Review {
  #groupName;

  #author = {};
  #moderator = {};
  #notary = {};
  #reviewers = [];

  #possibleParticipants = [];

  constructor (roomSlot, author, groupName, moderator, notary, reviewers, possibleParticipants) {
    if (!moderator && !notary && !reviewers) {
      this.setAuthor(roomSlot, author);
      this.#groupName = author.getGroup();
    } else {
      // for the state import with the result you need to set all attributes without checking
      this.#groupName = groupName;
      this.#author = author;
      this.#moderator = moderator;
      this.#notary = notary;
      this.#reviewers = reviewers;
      this.#possibleParticipants = possibleParticipants;
    }
  }

  getGroupName () {
    return this.#groupName;
  }

  setGroupName (groupName) {
    this.#groupName = groupName;
  }

  getAuthor () {
    return this.#author;
  }

  setAuthor (roomSlot, author) {
    this.#author = author;
    this.#author.increaseAuthorCount();
    this.#author.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot, false));
    this.#deleteParticipantFromPossibleParticipants(this.#author);
  }

  setAuthorSuccessPage (roomSlot, author) {
    if (!this.#possibleParticipants.includes(author)) { // TODO check if a suitable frontend exists
      throw new Error('Author is not possible for this review');
    }
    this.setAuthor(roomSlot, author);
  }

  deleteAuthor (roomSlot) { // TODO check if a suitable frontend exists
    this.#author.decreaseAuthorCount();
    this.#author.deleteSlotFromActiveList(this.#getSlotFromRoomSlot(roomSlot, false));
    this.#addParticipantToPossibleParticipants(this.#author);
    this.#author = null;
  }

  getModerator () {
    return this.#moderator;
  }

  setModerator (roomSlots, index, moderator, breakForModeratorAndReviewer) {
    if (!this.#possibleParticipants.includes(moderator)) { // TODO check if a suitable frontend exists
      throw new Error('Moderator is not possible for this review');
    }
    this.#moderator = moderator;
    this.#moderator.increaseModeratorCount();
    this.#moderator.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlots[index], false));
    if (breakForModeratorAndReviewer) {
      if (index < roomSlots.length - 1) {
        if (roomSlots[index].getDate().getTime() === roomSlots[index + 1].getDate().getTime()) {
          this.#moderator.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlots[index + 1], true));
        }
      }
    }
    this.#deleteParticipantFromPossibleParticipants(this.#moderator);
  }

  deleteModerator (roomSlots, index, moderator, breakForModeratorAndReviewer) { // TODO check if a suitable frontend exists
    moderator.decreaseModeratorCount();
    moderator.deleteSlotFromActiveList(this.#getSlotFromRoomSlot(roomSlots[index + 1], false));
    if (breakForModeratorAndReviewer) {
      if (breakForModeratorAndReviewer && index < roomSlots.length - 1) {
        if (roomSlots[index].getDate().getTime() === roomSlots[index + 1].getDate().getTime()) {
          moderator.deleteSlotFromActiveList(this.#getSlotFromRoomSlot(roomSlots[index + 1], false));
        }
      }
    }
    this.#moderator = null;
    this.#addParticipantToPossibleParticipants(moderator);
  }

  getNotary () {
    return this.#notary;
  }

  setNotary (roomSlot, notary, authorIsNotary) {
    if (!this.#possibleParticipants.includes(notary) && authorIsNotary === false) { // TODO check if a suitable frontend exists
      throw new Error('Notary is not possible for this review');
    }
    this.#notary = notary;
    this.#notary.increaseNotaryCount();
    if (authorIsNotary === false) {
      this.#notary.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot, false));
      this.#deleteParticipantFromPossibleParticipants(this.#notary);
    } else {
      // do nothing, this is done because of the double role
    }
  }

  deleteNotary (roomSlot, notary) { // TODO check if a suitable frontend exists
    this.#notary = notary;
    this.#notary.decreaseNotaryCount();
    this.#notary.deleteSlotFromActiveList(this.#getSlotFromRoomSlot(roomSlot, false));
    this.#addParticipantToPossibleParticipants(this.#notary);
    // no check against authorIsNotary to make it possible to break this rule in some cases in the successful calc page
  }

  getReviewer () {
    return this.#reviewers;
  }

  setReviewer (reviewers) {
    this.#reviewers = reviewers;
  }

  addReviewer (roomSlots, index, participant, breakForModeratorAndReviewer) {
    /** if (!this.#possibleParticipants.includes(participant)) { // TODO check if a suitable frontend exists
      throw new Error('Participant is not possible for this review');
    } */
    participant.increaseReviewerCount();
    participant.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlots[index], false));
    if (breakForModeratorAndReviewer) {
      if (index < roomSlots.length - 1) {
        if (roomSlots[index].getDate().getTime() === roomSlots[index + 1].getDate().getTime()) {
          participant.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlots[index + 1], true));
        }
      }
    }
    this.#reviewers.push(participant);
    this.#deleteParticipantFromPossibleParticipants(participant);
  }

  deleteReviewer (roomSlots, index, reviewer, breakForModeratorAndReviewer) { // TODO check if a suitable frontend exists
    console.log(reviewer);
    reviewer.decreaseReviewerCount();
    reviewer.deleteSlotFromActiveList(this.#getSlotFromRoomSlot(roomSlots[index + 1], false));
    if (breakForModeratorAndReviewer) {
      if (breakForModeratorAndReviewer && index < roomSlots.length - 1) {
        if (roomSlots[index].getDate().getTime() === roomSlots[index + 1].getDate().getTime()) {
          reviewer.deleteSlotFromActiveList(this.#getSlotFromRoomSlot(roomSlots[index + 1], false));
        }
      }
    }
    this.#reviewers = this.#reviewers.filter(r => r !== reviewer);
    this.#addParticipantToPossibleParticipants(reviewer);
  }

  getPossibleParticipants () {
    return this.#possibleParticipants;
  }

  setPossibleParticipants (possibleParticipants) {
    this.#possibleParticipants = possibleParticipants;
  }

  /**
  * delete a participant from the possibleParticipant list after he is assigned to a role in this review
  * @param {Participant} participant - the participant to be deleted
  */
  #deleteParticipantFromPossibleParticipants (participant) {
    this.#possibleParticipants.splice(
      this.#possibleParticipants.indexOf(participant), 1
    );
  }

  /**
   * add a participant to the possibleParticipant list after he is deleted from a role in this review
   * @param {Participant} participant - the participant to be deleted
   */
  #addParticipantToPossibleParticipants (participant) {
    this.#possibleParticipants.push(participant);
  }

  /**
  * search all possible participants for this review
  * @param {Slot} roomSlot - to get the slot and check if the participants is currently active in this slot
  * @param {Participant} participants - to check if the participant is not in the same group as the author and currently not ative in this timeslot
  * @param {Boolean} abReview - it is not allowed to have participants with the same topic as the author in the review group
  */
  fillPossibleParticipantsOfReview (roomSlot, participants, abReview) {
    const slot = this.#getSlotFromRoomSlot(roomSlot, false);
    this.setPossibleParticipants(
      participants.filter((p) => {
        if (abReview === true) {
          return this.getAuthor().getGroup() !== p.getGroup() && !p.isActiveInSlot(slot) && this.getAuthor().getTopic() !== p.getTopic();
        } else {
          return this.getAuthor().getGroup() !== p.getGroup() && !p.isActiveInSlot(slot);
        }
      })
    );
  }

  /**
  * parse the roomSlot in the upper class slot object
  * @param {RoomSlot} roomSlot
  * @param {boolean} breakSlotForUser
  * @returns {Slot}
  */
  #getSlotFromRoomSlot (roomSlot, breakSlotForUser) {
    const slot = new Slot(roomSlot.getId(), roomSlot.getDate(), roomSlot.getStartTime(), roomSlot.getEndTime());
    slot.setBreakSlotForUser(breakSlotForUser);
    return slot;
  }
}
