class RoomSlot extends Slot {
  rooms = [];

  constructor(date, startTime, endTime, rooms) {
    super();
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.rooms = rooms;
  }
}
