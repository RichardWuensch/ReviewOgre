// import OldTestData from './OldTestData';
import SmallTestData from './SmallTestData';
import Algorithm from '../logic/Algorithm';
import RoomSlotHelper from '../../data/store/RoomSlotHelper';
import { ParticipantStore } from '../../data/store/ParticipantStore';

export default class Test {
  run (authorIsNotary) {
    const helper = new RoomSlotHelper();
    const participantStore = ParticipantStore.getSingleton();

    const participants = participantStore.getAll();
    const roomSlots = helper.getAllRoomSlots();

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
