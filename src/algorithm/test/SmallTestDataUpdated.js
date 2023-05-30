import Participant from '../../data/model/Participant';
import Room from '../../data/model/Room';
import RoomSlot from '../../data/model/RoomSlot';
import AbstractTestData from './AbstractTestData';

export default class SmallTestDataUpdated extends AbstractTestData {
  constructor () {
    super();

    this.authorIsNotary = true;

    this.participants = [
      new Participant(-1, 'Richard', '', 'richard.wuensch@study.thws.de', 1),
      new Participant(-1, 'Basti', '', 'richard.wuensch@study.thws.de', 1),
      new Participant(-1, 'Daniel', '', 'richard.wuensch@study.thws.de', 1),
      new Participant(-1, 'Jakob', '', 'richard.wuensch@study.thws.de', 2),
      new Participant(-1, 'Nico', '', 'richard.wuensch@study.thws.de', 2),
      new Participant(-1, 'Hannah', '', 'richard.wuensch@study.thws.de', 2),
      new Participant(-1, 'A', '', 'richard.wuensch@study.thws.de', 3),
      new Participant(-1, 'B', '', 'richard.wuensch@study.thws.de', 3),
      new Participant(-1, 'C', '', 'richard.wuensch@study.thws.de', 3),
      new Participant(-1, 'X', '', 'richard.wuensch@study.thws.de', 4),
      new Participant(-1, 'Y', '', 'richard.wuensch@study.thws.de', 4),
      new Participant(-1, 'Z', '', 'richard.wuensch@study.thws.de', 4)
    ];

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
      ])];
  }
}
