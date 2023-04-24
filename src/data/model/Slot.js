export default class Slot {
  #id;
  #date;
  #startTime;
  #endTime;

  constructor (date, startTime, endTime) {
    this.#date = date;
    this.#startTime = startTime;
    this.#endTime = endTime;
  }

  setId (id) {
    this.#id = id;
  }

  getId () {
    return this.#id;
  }

  getDate () {
    return this.#date;
  }

  setDate (date) {
    this.#date = date;
  }

  getStartTime () {
    return this.#startTime;
  }

  setStartTime (startTime) {
    this.#startTime = startTime;
  }

  getEndTime () {
    return this.#endTime;
  }

  setEndTime (endTime) {
    this.#endTime = endTime;
  }
}
