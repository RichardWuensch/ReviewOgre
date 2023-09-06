/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import Slot from './Slot';
import Room from './Room';

export default class RoomSlot extends Slot {
  #rooms = [];

  constructor (id, date, startTime, endTime, rooms) {
    super(id, date, startTime, endTime);
    this.#rooms = rooms;
  }

  getRooms () {
    return this.#rooms;
  }

  getRoom (roomId) {
    const rooms = this.#rooms.filter((room) => room.getId() === roomId);
    return rooms.length === 0 ? undefined : rooms[0];
  }

  setRooms (rooms) {
    this.#rooms = rooms;
  }

  getDeepCopy () {
    const roomsCopy = [];
    this.#rooms.forEach((room) =>
      roomsCopy.push(new Room(room.getName(), room.getBeamerNeeded(), room.getId()))
    );
    return new RoomSlot(
      super.getId(),
      super.getDate(),
      super.getStartTime(),
      super.getEndTime(),
      roomsCopy
    );
  }

  retrieveOverlappingSlots (allSlots) {
    const slotsOnSameDay = allSlots
      .filter((slot) =>
        this.#equalDates(slot.getDate(), this.getDate()))
      .filter(slot => slot.getId() !== this.getId());

    return slotsOnSameDay.filter((slot) =>
      this.#overlappingTimes(
        this.getStartTime(),
        this.getEndTime(),
        slot.getStartTime(),
        slot.getEndTime()
      )
    );
  }

  #equalDates (date1, date2) {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  #overlappingTimes (start1, end1, start2, end2) {
    return start1 < end2 && start2 < end1;
  }
}
