import Room from '../../data/model/Room';
import RoomSlot from '../../data/model/RoomSlot';
// import AbstractTestData from './AbstractTestData';

export default class SmallTestDataUpdatedWithoutParticipants /* extends AbstractTestData */ {
  constructor (participants, participantsDispatch, roomSlots, roomSlotsDispatch) {
    // super()
    // this.participants = participants;

    // this.authorIsNotary = true;

    const startDate1 = new Date();
    startDate1.setHours(14);
    const endDate1 = new Date();
    endDate1.setHours(16);

    const startDate2 = new Date();
    startDate2.setHours(17);
    const endDate2 = new Date();
    endDate2.setHours(19);

    this.roomSlots = [
      new RoomSlot(new Date(), startDate1, endDate2, [
        new Room('I.1.2', true),
        new Room('I.1.3', true)
      ]),
      new RoomSlot(new Date(), startDate1, endDate2, [
        new Room('I.2.2', true),
        new Room('I.2.3', true)
      ])
    ];
    /* eslint-enable object-shorthand */
    this.roomSlots.forEach(r => {
      roomSlotsDispatch({
        type: 'added',
        itemToAdd: r
      });
    });
    /* eslint-enable object-shorthand */
  }
}
