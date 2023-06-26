import Participant from '../data/models/Participant';
import Room from '../data/models/Room';
import RoomSlot from '../data/models/RoomSlot';
import ImportFile from './ImportFile';

export default class LoadConfiguration {
  participants = [];
  roomSlots = [];
  settings = {};

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
      this.settings.authorIsNotary = parseData.settings.authorIsNotary;
      this.settings.breakForModeratorAndReviewer = parseData.settings.breakForModeratorAndReviewer;
      this.settings.abReview = parseData.settings.abReview;
      this.settings.internationalGroups = parseData.settings.internationalGroups;
      resolve();
    });
  }

  getParticipants () {
    return this.participants;
  }

  getRoomSlots () {
    return this.roomSlots;
  }

  getSettings () {
    return this.settings;
  }
}
