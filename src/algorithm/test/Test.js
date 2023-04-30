// import OldTestData from './OldTestData';
import SmallTestData from './SmallTestData';
import Algorithm from '../logic/Algorithm';
import RoomSlotHelper from '../../data/store/RoomSlotHelper';
import { ParticipantStore } from '../../data/store/ParticipantStore';
import { ConfigurationStore } from '../../data/store/ConfigurationStore';

export default class Test {
  run () {
    const helper = new RoomSlotHelper();
    const participantStore = ParticipantStore.getSingleton();
    const configurationStore = ConfigurationStore.getSingleton();

    const participants = participantStore.getAll();
    const roomSlots = helper.getAllRoomSlots();
    const authorIsNotary = configurationStore.getAuthorIsNotary();

    const algo = new Algorithm(participants, roomSlots, authorIsNotary);
    algo.run();

    algo.printResult();
    algo.printLikeOldRevOger();
    participantStore.getAll().forEach(p => p.resetStatistics());
  }

  getTestConfiguration () {
    const testConfiguration = new SmallTestData();
    return testConfiguration;
  }
}
