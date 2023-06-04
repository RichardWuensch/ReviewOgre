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
    const rooms = this.#rooms.filter(room => room.getId() === roomId);
    return rooms.length === 0 ? undefined : rooms[0];
  }

  setRooms (rooms) {
    this.#rooms = rooms;
  }

  getDeepCopy () {
    const roomsCopy = [];
    this.#rooms.forEach(room => roomsCopy.push(new Room(room.getName(), room.hasBeamer(), room.getId())));
    return new RoomSlot(super.getId(), super.getDate(), super.getStartTime(), super.getEndTime(), roomsCopy);
  }
}
