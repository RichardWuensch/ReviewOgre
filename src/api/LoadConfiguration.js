import Participant from '../algorithm/model/Participant';
import Room from '../algorithm/model/Room';
import RoomSlot from '../algorithm/model/RoomSlot';
import Configuration from './model/Configuration';

export default class LoadConfiguration {
  authorIsNotary;
  participants = [];
  roomSlots = [];
  configuration = {};

  async runFileLoad (event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);

    if (selectedFile.type === 'application/json') {
      return new Promise((resolve) => {
        reader.onload = (event) => {
          const fileContent = event.target.result;
          const parseData = JSON.parse(fileContent);
          this.authorIsNotary = parseData.authorIsNotary;
          parseData.participants.forEach(p => this.participants.push(new Participant(p.firstName, p.lastName, p.email, p.group, p.topic, p.languageLevel)));
          parseData.roomSlots.forEach(rs => this.roomSlots.push(new RoomSlot(new Date(rs.date), new Date(rs.startTime), new Date(rs.endTime),
            rs.rooms.map(r => new Room(r.name, r.beamer))
          )));
          this.setConfiguration();
          resolve(this.configuration);
        };
      });
    } else {
      console.log('Hier könnte Ihre Webung stehen, nein Spaß, aber eine Fehlermeldung ausgelöst werden');
    }
  }

  setConfiguration () {
    this.configuration = new Configuration();
    this.configuration.setAuthorIsNotary(this.authorIsNotary);
    this.configuration.setParticipants(this.participants);
    this.configuration.setRoomSlots(this.roomSlots);
  }
}
