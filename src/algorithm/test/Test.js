// import OldTestData from './OldTestData';
import SmallTestData from './SmallTestData';
import Algorithm from '../logic/Algorithm';

export default class Test {
  run () {
    const testData = /* new OldTestData(); */ new SmallTestData();
    const participants = testData.participants;
    const roomSlots = testData.roomSlots;

    const authorIsNotary = true;

    const algo = new Algorithm(participants, roomSlots, authorIsNotary);
    algo.run();
    algo.printResult();
    algo.printParticipantsSortByAmountOfActiveInSlots();
  }
}
