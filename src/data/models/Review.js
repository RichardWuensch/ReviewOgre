import Slot from './Slot';

export default class Review {
  #groupName;

  #author = {};
  #moderator = {};
  #notary = {};
  #reviewers = [];

  #possibleParticipants = [];

  #invalidReview = false;

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
    this.#author.addSlotToActiveList(this.getSlotFromRoomSlot(roomSlot, false));
    this.#deleteParticipantFromPossibleParticipants(this.#author);
  }

  getModerator () {
    return this.#moderator;
  }

  /**
   * Check if this participant is possible for the review and add him if it is so
   * @param {array} roomSlots - the list of all roomSlots
   * @param {int} index - index of the current roomSlot (this is needed to add also the next slot to the active list if breakForModeratorAndReviewer is true)
   * @param {Participant} moderator - the participant that should be the moderator
   * @param {boolean} breakForModeratorAndReviewer - is true if the moderator should get a break of one slot (only if the next slot is on the same day)
   */
  setModerator (roomSlots, index, moderator, breakForModeratorAndReviewer) {
    this.#moderator = moderator;
    this.#moderator.increaseModeratorCount();
    this.#moderator.addSlotToActiveList(this.getSlotFromRoomSlot(roomSlots[index], false));
    if (breakForModeratorAndReviewer) {
      if (index < roomSlots.length - 1) {
        if (roomSlots[index].getDate().getTime() === roomSlots[index + 1].getDate().getTime()) {
          this.#moderator.addSlotToActiveList(this.getSlotFromRoomSlot(roomSlots[index + 1], true));
        }
      }
    }
    this.#deleteParticipantFromPossibleParticipants(this.#moderator);
  }

  getNotary () {
    return this.#notary;
  }

  setNotary (roomSlot, notary, authorIsNotary) {
    this.#notary = notary;
    this.#notary.increaseNotaryCount();
    if (authorIsNotary === false) {
      this.#notary.addSlotToActiveList(this.getSlotFromRoomSlot(roomSlot, false));
      this.#deleteParticipantFromPossibleParticipants(this.#notary);
    } else {
      // do nothing, this is done because of the double role
    }
  }

  getReviewer () {
    return this.#reviewers;
  }

  setReviewer (reviewers) {
    this.#reviewers = reviewers;
  }

  /**
   * Check if the participant can be reviewer for this review
   * if this participant is possible the add will be performed by additional method
   * @param {array} roomSlots - the list of all roomSlots
   * @param {int} index - index of the current roomSlot (this is needed to add also the next slot to the active list if breakForModeratorAndReviewer is true)
   * @param {Participant} participant - the participant that should be a reviewer
   * @param {boolean} breakForModeratorAndReviewer - is true if the reviewer should get a break of one slot (only if the next slot is on the same day)
   */
  addReviewer (roomSlots, index, participant, breakForModeratorAndReviewer) {
    if (!this.#possibleParticipants.includes(participant)) {
      throw new Error('Participant is not possible for this review');
    }
    if (breakForModeratorAndReviewer) {
      if (index < roomSlots.length - 1) {
        const dateCurrentSlot = roomSlots[index].getDate();
        const dateNextSlot = roomSlots[index + 1].getDate();
        const dateCurrent = new Date(dateCurrentSlot.getFullYear(), dateCurrentSlot.getMonth(), dateCurrentSlot.getDate());
        const dateNext = new Date(dateNextSlot.getFullYear(), dateNextSlot.getMonth(), dateNextSlot.getDate());
        if (dateCurrent.getTime() === dateNext.getTime()) {
          participant.addSlotToActiveList(this.getSlotFromRoomSlot(roomSlots[index + 1], true));
        }
      }
    }
    this.#performAdd(participant, this.getSlotFromRoomSlot(roomSlots[index], false));
  }

  /**
   * From principle the same functionality as addReviewer method. A separate method was needed bc by execution from algo
   * possibleParticipants of the next slots are always empty and so the break error would be always thrown
   */
  addReviewerDragnDrop (roomSlots, index, participant, breakForModeratorAndReviewer) {
    if (!this.#possibleParticipants.includes(participant)) {
      throw new Error('Participant is not possible for this review');
    }
    if (breakForModeratorAndReviewer) {
      if (index < roomSlots.length - 1) {
        const dateCurrentSlot = roomSlots[index].getDate();
        const dateNextSlot = roomSlots[index + 1].getDate();
        const dateCurrent = new Date(dateCurrentSlot.getFullYear(), dateCurrentSlot.getMonth(), dateCurrentSlot.getDate());
        const dateNext = new Date(dateNextSlot.getFullYear(), dateNextSlot.getMonth(), dateNextSlot.getDate());
        if (dateCurrent.getTime() === dateNext.getTime()) {
          for (const room of roomSlots[index + 1].getRooms()) {
            if (!room.getReview().getPossibleParticipants().includes(participant)) {
              throw new Error('Because of breakForModeratorAndReviewer is selected, this participant is not possible for this review. ' +
                  'If you want to break the rule, please change the appropriate setting and return.');
            }
          }
          participant.addSlotToActiveList(this.getSlotFromRoomSlot(roomSlots[index + 1], true));
        }
      }
    }
    this.#performAdd(participant, this.getSlotFromRoomSlot(roomSlots[index], false));
  }

  /**
   * Add the participant to the review
   * @param {Participant} participant - the participant that should be a reviewer
   * @param {Slot} roomSlot - the list of all roomSlots
   */
  #performAdd (participant, roomSlot) {
    participant.increaseReviewerCount();
    participant.addSlotToActiveList(roomSlot, false);
    participant.addSlotToActiveInSlotsAsReviewer(this, roomSlot);
    this.#reviewers.push(participant);
    this.#deleteParticipantFromPossibleParticipants(participant);
    this.validateReview();
  }

  /**
   * Delete the participant from the review
   * @param {array} roomSlots - the list of all roomSlots
   * @param {int} index - index of the current roomSlot (this is needed to delete also the next slot to the active list if breakForModeratorAndReviewer is true)
   * @param {Participant} reviewer - the participant that should be deleted as reviewer
   * @param {boolean} breakForModeratorAndReviewer - is true if the reviewer has the next slot as break slot (only if the next slot is on the same day)
   * */
  deleteReviewer (roomSlots, index, reviewer, breakForModeratorAndReviewer) {
    reviewer.decreaseReviewerCount();
    reviewer.deleteSlotFromActiveList(this.getSlotFromRoomSlot(roomSlots[index], false));
    reviewer.deleteSlotFromActiveInSlotsAsReviewer(this.getSlotFromRoomSlot(roomSlots[index], false));
    if (breakForModeratorAndReviewer) {
      if (breakForModeratorAndReviewer && index < roomSlots.length - 1) {
        const dateCurrentSlot = roomSlots[index].getDate();
        const dateNextSlot = roomSlots[index + 1].getDate();
        const dateCurrent = new Date(dateCurrentSlot.getFullYear(), dateCurrentSlot.getMonth(), dateCurrentSlot.getDate());
        const dateNext = new Date(dateNextSlot.getFullYear(), dateNextSlot.getMonth(), dateNextSlot.getDate());
        if (dateCurrent.getTime() === dateNext.getTime()) {
          reviewer.deleteSlotFromActiveList(this.getSlotFromRoomSlot(roomSlots[index + 1], false));
        }
      }
    }
    this.#reviewers = this.#reviewers.filter(r => r !== reviewer);
    this.#addParticipantToPossibleParticipants(reviewer);
    this.validateReview();
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
    const slot = this.getSlotFromRoomSlot(roomSlot, false);
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
  getSlotFromRoomSlot (roomSlot, breakSlotForUser) {
    const slot = new Slot(roomSlot.getId(), roomSlot.getDate(), roomSlot.getStartTime(), roomSlot.getEndTime());
    slot.setBreakSlotForUser(breakSlotForUser);
    return slot;
  }

  /**
   * validate reviews after changing so make sure that the author, moderator and notary is not null and there are
   * at least 3 reviewer
   */
  validateReview () {
    this.#invalidReview = this.#author === {} || this.#moderator === {} || this.#notary === {} || this.#reviewers.length < 3;
  }

  isReviewValid () {
    return this.#invalidReview;
  }
}
