/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import Room from '../data/models/Room';
import Slot from '../data/models/Slot';
import RoomSlot from '../data/models/RoomSlot';
import Review from '../data/models/Review';
import ImportFile from './ImportFile';
import Participant from '../data/models/Participant';

export default class LoadState {
  #participants = [];
  #roomSlots = [];
  #settings = {};

  /**
   * Handles the file import and parses the state file
   * containing participants, roomSlots and settings.
   * Filled reviews can be stored as well
   * @param {event} event - file handle event
   */
  async runStateImport (event) {
    const fileContent = await new ImportFile('application/json').runFileLoad(event);
    const parseData = JSON.parse(fileContent);
    return new Promise((resolve) => {
      this.#parseParticipantsFromJSON(parseData.participants, parseData.roomSlots);
      this.#parseRoomSlotsFromJSON(parseData.roomSlots);
      this.#settings = parseData.settings;
      resolve();
    });
  }

  #parseParticipantsFromJSON (participantsJSON, roomSlotsJSON) {
    participantsJSON.forEach(participant => {
      const newParticipant = new Participant(participant);
      if (participant.activeInSlotIds) {
        participant.activeInSlotIds.forEach(slotId => {
          const newActiveSlot = roomSlotsJSON.find(roomSlot => roomSlot.roomSlotId === slotId);
          if (newActiveSlot) {
            newParticipant.addSlotToActiveList(
              new Slot(
                newActiveSlot.roomSlotId,
                new Date(Date.parse(newActiveSlot.date)),
                this.#parseTime(newActiveSlot.startTime),
                this.#parseTime(newActiveSlot.endTime)
              ));
          }
        });
      }
      this.#participants.push(newParticipant);
    });
  }

  #parseRoomSlotsFromJSON (roomSlotsJSON) {
    roomSlotsJSON.forEach(rs => this.#roomSlots.push(
      new RoomSlot(rs.roomSlotId,
        new Date(Date.parse(rs.date)),
        this.#parseTime(rs.startTime),
        this.#parseTime(rs.endTime),
        rs.rooms.map(roomData => {
          const room = new Room(
            roomData.name,
            roomData.beamerNeeded ?? roomData.beamer, // beamer for configuration files of version 1.0.0
            roomData.roomId);
          if (roomData.notNeeded) {
            room.setNotNeeded(roomData.notNeeded.bool, roomData.notNeeded.topic);
          }
          if (roomData.review) {
            const author = this.#participants.find(p => p.getId() === roomData.review.authorId);
            const moderator = this.#participants.find(p => p.getId() === roomData.review.moderatorId);
            const notary = this.#participants.find(p => p.getId() === roomData.review.notaryId);
            const reviewers = roomData.review.reviewerIds.map(reviewerId => this.#participants.find(p => p.getId() === reviewerId));
            const possibleParticipants = roomData.review.possibleParticipantIds.map(pId => this.#participants.find(p => p.getId() === pId));
            const newReview = new Review(undefined, author, roomData.review.groupName, moderator, notary, reviewers);
            newReview.setPossibleParticipants(possibleParticipants);
            newReview.validateReview();
            room.setReview(newReview);
          }
          return room;
        })
      )));
  }

  #parseTime (timeOrDateAsString) {
    const parsedDate = Date.parse(timeOrDateAsString);
    if (!isNaN(parsedDate)) {
      // for configuration files of version 1.0.0
      return new Date(parsedDate);
    }
    const newDate = new Date();
    newDate.setHours(timeOrDateAsString.substring(0, 2));
    newDate.setMinutes(timeOrDateAsString.substring(3, 5));
    return newDate;
  }

  getParticipants () {
    return this.#participants;
  }

  getRoomSlots () {
    return this.#roomSlots;
  }

  getSettings () {
    return this.#settings;
  }
}
