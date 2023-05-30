import Slot from './Slot';

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
    const rooms = this.#rooms.filter(room => room.getId() === roomId);
    return rooms.length === 0 ? undefined : rooms[0];
  }

  setRooms (rooms) {
    this.#rooms = rooms;
  }
}
