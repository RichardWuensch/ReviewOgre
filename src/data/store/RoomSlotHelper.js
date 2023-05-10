import { SlotStore } from './SlotStore';
import { RoomStore } from './RoomStore';
import Slot from '../model/Slot';
import RoomSlot from '../model/RoomSlot';

const slotStore = SlotStore.getSingleton();
const roomStore = RoomStore.getSingleton();

export default class RoomSlotHelper {
  /**
   * Returns a slot with all its corresponding rooms
   * @param slotId
   * @returns {RoomSlot} composed of slot and rooms
   */
  getRoomSlot (slotId) {
    const slot = slotStore.getById(slotId);
    const rooms = this.getAllRoomsOfSlot(slotId);
    const roomSlot = new RoomSlot(slot.getDate(), slot.getStartTime(), slot.getEndTime(), rooms);
    roomSlot.setId(slotId);
    return roomSlot;
  }

  /**
   * Returns all slots with their corresponding rooms
   * @returns {*[]} composed of slots and rooms
   */
  getAllRoomSlots () {
    const slots = slotStore.getAll();

    const roomSlots = [];
    slots.forEach(slot => {
      roomSlots.push(this.getRoomSlot(slot.getId()));
    });

    return roomSlots;
  }

  /**
   * store a slot with its corresponding rooms
   * @param roomSlot
   */
  putRoomSlot (roomSlot) {
    const slot = new Slot(roomSlot.getDate(), roomSlot.getStartTime(), roomSlot.getEndTime());

    slotStore.put(slot);
    console.log(slot.getId());

    roomSlot.getRooms()
      .forEach(room => {
        room.setSlotId(slot.getId());
        roomStore.put(room);
      });
  }

  /**
   * Delete a slot with all its corresponding rooms
   * @param slotId
   */
  deleteSlotAndCorrespondingRooms (slotId) {
    const rooms = this.getAllRoomsOfSlot(slotId);

    slotStore.delete(slotId);

    rooms.forEach(room => {
      roomStore.delete(room.getId());
    });
  }

  /**
   * Delete every slot and every room
   */
  deleteAllSlotsAndRooms () {
    slotStore.deleteAll();
    roomStore.deleteAll();
  }

  getAllRoomsOfSlot (slotId) {
    return roomStore.getAll().filter(room => room.getSlotId() === slotId);
  }
}
