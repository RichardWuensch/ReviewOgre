import Participant from '../data/model/Participant';
import Room from '../data/model/Room';
import RoomSlot from '../data/model/RoomSlot';
import ImportFile from './ImportFile';

export default class LoadConfiguration {
  participants = [];
  roomSlots = [];
  authorIsNotary;

  /**
   * Handles the file import and parse the configuration file
   * containing participants, Slots, Rooms and some settings
   * @param {event} event - file handle event
   */
  async runConfigurationImport (event) {
    const fileContent = await new ImportFile('application/json').runFileLoad(event);
    const parseData = JSON.parse(fileContent);
    return new Promise((resolve) => {
      parseData.participants.forEach(p => this.participants.push(new Participant(-1, p.firstName, p.lastName, p.email, p.group, p.topic, p.languageLevel))); // TODO -1
      parseData.roomSlots.forEach(rs => this.roomSlots.push(new RoomSlot(-1, new Date(rs.date), new Date(rs.startTime), new Date(rs.endTime), // TODO -1
        rs.rooms.map(r => new Room(r.name, r.beamer))
      )));
      this.authorIsNotary = parseData.authorIsNotary;
      resolve([this.participants, this.roomSlots, this.authorIsNotary]);
    });
  }

  getAuthorIsNotary () {
    return this.authorIsNotary;
  }

  getParticipants () {
    this.participants.forEach(p => console.log(p));
    return this.participants;
  }

  getRoomSlots () {
    return this.roomSlots;
  }
}
