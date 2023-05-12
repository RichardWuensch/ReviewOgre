import Participant from '../../data/model/Participant';
import Room from '../../data/model/Room';
import RoomSlot from '../../data/model/RoomSlot';
import AbstractTestData from './AbstractTestData';

export default class SmallTestDataUpdated extends AbstractTestData {
  constructor () {
    super();

    this.authorIsNotary = true;

    this.participants = [
      new Participant('Richard', '', 'richard.wuensch@study.thws.de', 1),
      new Participant('Basti', '', 'richard.wuensch@study.thws.de', 1),
      new Participant('Daniel', '', 'richard.wuensch@study.thws.de', 1),
      new Participant('Jakob', '', 'richard.wuensch@study.thws.de', 2),
      new Participant('Nico', '', 'richard.wuensch@study.thws.de', 2),
      new Participant('Hannah', '', 'richard.wuensch@study.thws.de', 2),
      new Participant('A', '', 'richard.wuensch@study.thws.de', 3),
      new Participant('B', '', 'richard.wuensch@study.thws.de', 3),
      new Participant('C', '', 'richard.wuensch@study.thws.de', 3),
      new Participant('X', '', 'richard.wuensch@study.thws.de', 4),
      new Participant('Y', '', 'richard.wuensch@study.thws.de', 4),
      new Participant('Z', '', 'richard.wuensch@study.thws.de', 4)
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
