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
      roomsCopy.push(new Room(room.getName(), room.hasBeamer(), room.getId()))
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
    const slotsOnSameDay = allSlots.filter((slot) =>
      this.#equalDates(slot.getDate(), this.getDate())
    );

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
    if (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    ) {
      return true;
    }
    return false;
  }

  #overlappingTimes (start1, end1, start2, end2) {
    if (start1 < end2 && start2 < end1) {
      return true;
    }

    return false;
  }
}
