// import OldTestData from './OldTestData';
import SmallTestData from './SmallTestData';
import Algorithm from '../logic/Algorithm';

export default class Test {
  run () {
    const testData = /* new OldTestData(); */ new SmallTestData();
    const participants = testData.participants;
    const roomSlots = testData.roomSlots;
    const authorIsNotary = testData.authorIsNotary;

    const algo = new Algorithm(participants, roomSlots, authorIsNotary);
    algo.run();
    algo.printResult();
    algo.printLikeOldRevOger();
  }

  getTestConfiguration () {
    const testConfiguration = new SmallTestData();
    return testConfiguration;
  }
}
