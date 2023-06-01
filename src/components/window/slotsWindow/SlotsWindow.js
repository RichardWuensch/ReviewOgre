import React from 'react';
import './SlotsWindow.css';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import add from '../../../assets/media/plus-circle.svg';
import { Accordion, Button, Image } from 'react-bootstrap';
import SlotCard from './Slot';
import { useRoomSlots } from '../context/RoomSlotContext';

function SlotsWindow () {
  const [showModalAddSlot, setShowModalAddSlot] = React.useState(false);

  const roomSlots = useRoomSlots();

  return (
      <div className={'slotsWindow'}>
          <h2 className={'title-subheadline'}>Slots</h2>
          <div className={'slots-button-container'}>
              <div className={'button-container-participants'}>
                  <Button className="button-container-green" onClick={() => setShowModalAddSlot(true)} >
                      <Image src={add} alt="addSlot" height={16} width={16} />
                      <span className="button-text">Add slot</span>
                  </Button>
              </div>
          </div>
          <div className={'slots-list-container'}>
              <Accordion defaultActiveKey="0">
              <ul className={'list-style'}>
                  {roomSlots.map((slot, index) => (
                          <li key={index}>
                              <SlotCard
                                  key={slot.getId()}
                                  eventKey={index}
                                  roomSlot={slot}/>

                          </li>
                  ))}
              </ul>
              </Accordion>
          </div>
            <SlotModal
                /* open Slot Modal without data */
                show={showModalAddSlot}
                onHide={() => setShowModalAddSlot(false)}
                header={'New Time Slot'}/>
      </div>
  );
}
export default SlotsWindow;
