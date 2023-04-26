import Participant from '../data/model/Participant';
import Room from '../data/model/Room';
import RoomSlot from '../data/model/RoomSlot';
import ImportFile from './ImportFile';
import { ParticipantStore } from '../data/store/ParticipantStore';
import RoomSlotHelper from '../data/store/RoomSlotHelper';
import { ConfigurationStore } from '../data/store/ConfigurationStore';

export default class LoadConfiguration {
  async runConfigurationImport (event) {
    const fileContent = await new ImportFile('application/json').runFileLoad(event);
    const parseData = JSON.parse(fileContent);
    const participants = [];
    const roomSlotHelper = new RoomSlotHelper();
    roomSlotHelper.deleteAllSlotsAndRooms();
    ParticipantStore.getSingleton().deleteAll();
    return new Promise((resolve) => {
      parseData.participants.forEach(p => participants.push(new Participant(p.firstName, p.lastName, p.email, p.group, p.topic, p.languageLevel)));
      parseData.roomSlots.forEach(rs => roomSlotHelper.putRoomSlot(new RoomSlot(new Date(rs.date), new Date(rs.startTime), new Date(rs.endTime),
        rs.rooms.map(r => new Room(r.name, r.beamer))
      )));
      ParticipantStore.getSingleton().putMultiple(participants);
      ConfigurationStore.getSingleton().setAuthorIsNotary(parseData.authorIsNotary);
      // resolve(parseData.authorIsNotary);
    });
  }
}
