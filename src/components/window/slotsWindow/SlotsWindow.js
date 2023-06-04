import React from 'react';
import './SlotsWindow.css';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import add from '../../../assets/media/plus-circle.svg';
import { Accordion, Button, Image, ListGroup } from 'react-bootstrap';
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
                  <Button variant={'light'} className="button-container-green" onClick={() => setShowModalAddSlot(true)} >
                      <Image src={add} alt="addSlot" height={16} width={16} />
                      <span className="button-text">Add slot</span>
                  </Button>
              </div>
          </div>
          <div className={'slots-list-container'}>
              <Accordion defaultActiveKey="0">
                  <div className={'overflow-container'}>
                      <ListGroup className={'list-group'}>
                          {roomSlots.map((slot, index) => (
                              <ListGroup.Item key={index}>
                                  <SlotCard
                                      key={slot.getId()}
                                      eventKey={index}
                                      roomSlot={slot}/>
                              </ListGroup.Item>
                          ))}
                      </ListGroup>
                  </div>
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
