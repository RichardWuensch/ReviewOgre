import Runner from '../logic/Runner';
// import SmallTestDataUpdated from './SmallTestDataUpdated';
/* import SmallTestDataUpdatedWithoutParticipants from './SmallTestDataUpdatedWithoutParticipants';
import SmallTestDataUpdated from './SmallTestDataUpdated'; */

export default class Test {
  run (participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary) {
    // check if stored data is empty

    /* if (participants.length === 2 && roomSlots.length === 2) { // 2 because of the 2 frontend testdata
      console.log('Running algorithm with test configuration');
      this.#storeTestData(participants, participantsDispatch, roomSlots, roomSlotsDispatch);
    }

    if (participants.length > 2 && roomSlots.length === 2) {
      console.log('Running algorithm with test configuration but without test participants');
      this.#storeTestDataWithoutParticipants(participants, participantsDispatch, roomSlots, roomSlotsDispatch);
    } */

    const result = new Runner().runAlgorithm(participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary);

    // ParticipantStore.getSingleton().getAll().forEach(p => p.resetStatistics());
    /* eslint-disable object-shorthand */
    for (const p of participants) {
      p.resetStatistics();
      participantsDispatch({
        type: 'changed',
        updatedParticipant: p
      });
    }
    /* eslint-enable object-shorthand */
    return result;
  }

  /* #storeTestData (participants, participantsDispatch, roomSlots, roomSlotsDispatch) {
    const testConfiguration = new SmallTestDataUpdated(participants, participantsDispatch, roomSlotsDispatch);
    console.log(testConfiguration);
    // testConfiguration.setTestStores(participants, participantsDispatch, roomSlots, roomSlotsDispatch);
  }

  #storeTestDataWithoutParticipants (participants, participantsDispatch, roomSlots, roomSlotsDispatch) {
    const testConfiguration = new SmallTestDataUpdatedWithoutParticipants(participants, roomSlots, roomSlotsDispatch);
    console.log(testConfiguration);
    // testConfiguration.setTestStores(participants, participantsDispatch, roomSlots, roomSlotsDispatch);
  } */
}
