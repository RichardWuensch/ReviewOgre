import Participant from '../../data/model/Participant';
import Room from '../../data/model/Room';
import RoomSlot from '../../data/model/RoomSlot';
import { ConfigurationStore } from '../../data/store/ConfigurationStore';
import { ParticipantStore } from '../../data/store/ParticipantStore';
import RoomSlotHelper from '../../data/store/RoomSlotHelper';
import Test from './Test';

export default class SmallTestDataUpdated {
  constructor () {
    const participantStore = ParticipantStore.getSingleton();
    const helper = new RoomSlotHelper();

    ConfigurationStore.getSingleton().setAuthorIsNotary(true);
    participantStore.putMultiple([
      new Participant('Richard', '', 'richard.wuensch@study.thws.de', 1),
      new Participant('Basti', '', 'richard.wuensch@study.thws.de', 1),
      new Participant('Daniel', '', 'richard.wuensch@study.thws.de', 1),
      new Participant('Jakob', '', 'richard.wuensch@study.thws.de', 2),
      new Participant('Nico', '', 'richard.wuensch@study.thws.de', 2),
      new Participant('Hannah', '', 'richard.wuensch@study.thws.de', 2),
      new Participant('A', '', 'richard.wuensch@study.thws.de', 3),
      new Participant('B', '', 'richard.wuensch@study.thws.de', 3),
      new Participant('C', '', 'richard.wuensch@study.thws.de', 3),
      new Participant('X', '', 'richard.wuensch@study.thws.de', 4),
      new Participant('Y', '', 'richard.wuensch@study.thws.de', 4),
      new Participant('Z', '', 'richard.wuensch@study.thws.de', 4)
    ]);

    const startDate1 = new Date();
    startDate1.setHours(14);
    const endDate1 = new Date();
    endDate1.setHours(16);

    const startDate2 = new Date();
    startDate2.setHours(17);
    const endDate2 = new Date();
    endDate2.setHours(19);

    helper.putRoomSlot(
      new RoomSlot(new Date(), startDate1, endDate2, [
        new Room('I.1.2', true),
        new Room('I.1.3', true)
      ]));

    helper.putRoomSlot(
      new RoomSlot(new Date(), startDate1, endDate2, [
        new Room('I.2.2', true),
        new Room('I.2.3', true)
      ]));
  }

  runTest () {
    new Test().run();
  }
}
