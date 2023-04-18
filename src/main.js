//setup
const testData = /*new OldTestData();*/ new SmallTestData(); 
let participants = testData.participants;
let roomSlots = testData.roomSlots;

const authorIsNotary = true;

let algo = new Algorithm(participants, roomSlots, authorIsNotary);
algo.run();
algo.printResult();
algo.printParticipantsSortByAmountOfActiveInSlots();