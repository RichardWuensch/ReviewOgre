// import OldTestData from './OldTestData';
import SmallTestData from './SmallTestData';
import Algorithm from '../logic/Algorithm';
import RoomSlotHelper from '../../data/store/RoomSlotHelper';

export default class Test {
  run (configuration) {
    const helper = new RoomSlotHelper();

    const participants = configuration.participantStore.getAll();
    const roomSlots = helper.getAllRoomSlots();
    const authorIsNotary = configuration.authorIsNotary;

    const algo = new Algorithm(participants, roomSlots, authorIsNotary);
    algo.run();
    algo.printResult();
    algo.printLikeOldRevOger();
    configuration.participantStore.getAll().forEach(p => p.resetStatistics());
  }

  getTestConfiguration () {
    const testConfiguration = new SmallTestData();
    return testConfiguration;
  }
}
