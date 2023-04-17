class RoomSlot extends Slot {
  #rooms = [];

  constructor(date, startTime, endTime, rooms) {
    super(date, startTime, endTime);
    this.#rooms = rooms;
  }

  getRooms(){
    return this.#rooms;
  }
  setRooms(rooms){
    this.#rooms= rooms;
  }
}
