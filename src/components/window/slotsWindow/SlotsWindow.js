import React from 'react';
import './SlotsWindow.css';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import add from '../../../assets/media/plus-circle.svg';
import { Accordion, Button, Image, ListGroup } from 'react-bootstrap';
import SlotCard from './Slot';
import { useRoomSlots, useRoomSlotsDispatch } from '../context/RoomSlotContext';

function SlotsWindow () {
  const [showModalAddSlot, setShowModalAddSlot] = React.useState(false);

  const roomSlots = useRoomSlots();
  const dispatch = useRoomSlotsDispatch();

  const saveNewSlot = (slot) => {
    /* eslint-disable object-shorthand */
    dispatch({
      type: 'added',
      newRoomSlot: slot
    });

    /* eslint-enable object-shorthand */
  };

  return (
      <div className={'slotsWindow'}>
          <h2 className={'title-subheadline'} style={{ marginBottom: 0 }}>Slots</h2>
          <div className={'slots-button-container'} >
              <div className={'button-container-slots'}>
                  <Button variant={'light'} className="button-container-green" onClick={() => setShowModalAddSlot(true)} >
                      <Image src={add} className={'button-image'} alt="addSlot" height={16} width={16} />
                      <span className="button-text">Add Slot</span>
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
                header={'New Time Slot'}
                onSaveClick={(slot) => saveNewSlot(slot)}/>
      </div>
  );
}
export default SlotsWindow;
