import Participant from '../algorithm/model/Participant';
import Room from '../algorithm/model/Room';
import RoomSlot from '../algorithm/model/RoomSlot';
import Configuration from './model/Configuration';
import ImportFile from './ImportFile';

export default class LoadConfiguration {
  async runConfigurationImport (event) {
    const fileContent = await new ImportFile('application/json').runFileLoad(event);
    const parseData = JSON.parse(fileContent);
    const config = new Configuration();
    const participants = [];
    const roomSlots = [];
    return new Promise((resolve) => {
      parseData.participants.forEach(p => participants.push(new Participant(p.firstName, p.lastName, p.email, p.group, p.topic, p.languageLevel)));
      parseData.roomSlots.forEach(rs => roomSlots.push(new RoomSlot(new Date(rs.date), new Date(rs.startTime), new Date(rs.endTime),
        rs.rooms.map(r => new Room(r.name, r.beamer))
      )));
      config.setAuthorIsNotary(parseData.authorIsNotary);
      config.setParticipants(participants);
      config.setRoomSlots(roomSlots);
      resolve(config);
    });
  }
}
