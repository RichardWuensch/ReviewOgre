import Algorithm from './Algorithm';

export default class Runner {
  runAlgorithm (participants, participantsDispatch, roomSlots, roomSlotsDispatch, settings) {
    const algo = new Algorithm(participants, participantsDispatch, roomSlots, roomSlotsDispatch, settings);
    algo.run();
    algo.printParticipantsSortByAmountOfActiveInSlots();

    // only to see which participant is possible for testing dragndrop
    const result = algo.getResult();
    console.log(result[0].getRooms()[0].getReview().getPossibleParticipants());
  }
}
