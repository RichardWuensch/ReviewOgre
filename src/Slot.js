class Slot {
  date = {};
  startTime = {};
  endTime = {};

  rooms = [];

  constructor(date, startTime, endTime, rooms) {
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.rooms = rooms;
  }
}
