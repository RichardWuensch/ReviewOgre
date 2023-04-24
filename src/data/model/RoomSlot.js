import Slot from './Slot';

export default class RoomSlot extends Slot {
  #id;
  #rooms = [];

  constructor (date, startTime, endTime, rooms) {
    super(date, startTime, endTime);
    this.#rooms = rooms;
  }

  setId (id) {
    this.#id = id;
  }

  getId () {
    return this.#id;
  }

  getRooms () {
    return this.#rooms;
  }

  setRooms (rooms) {
    this.#rooms = rooms;
  }
}
