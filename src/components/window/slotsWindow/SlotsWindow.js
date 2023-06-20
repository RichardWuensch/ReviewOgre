import React, { useState, useEffect } from 'react';
import './SlotsWindow.css';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import add from '../../../assets/media/plus-circle.svg';
import { Accordion, Button, Image, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
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

  const [showTooltip, setShowTooltip] = useState([false]);
  const [popoverText, setPopoverText] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const handleMouseEnter = (buttonId) => {
    const newShowTooltips = [false];
    newShowTooltips[buttonId] = true;
    setShowTooltip(newShowTooltips);
  };
  const handleMouseLeave = (buttonId) => {
    const newShowTooltips = [false];
    setShowTooltip(newShowTooltips);
  };
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
      <div className={'slotsWindow'} onMouseMove={handleMouseMove}>
          <h2 className={'title-subheadline'} style={{ marginBottom: 0 }}>Slots</h2>
          <div className={'slots-button-container'} >
              <div className={'button-container-slots'}>
                  <OverlayTrigger
                    key='0'
                    placement="top"
                    overlay={<Tooltip id="tooltip-0">{popoverText}</Tooltip>}
                    show={showTooltip[0]}
                    target={mousePosition}
                  >
                      <Button variant={'light'} className="button-container-green" onClick={() => setShowModalAddSlot(true)}
                        onMouseEnter={() => { setPopoverText('Add Slot'); handleMouseEnter(0); }}
                        onMouseLeave={() => handleMouseLeave(0)}>
                          <Image src={add} className={'button-image'} alt="addSlot" height={16} width={16} />
                          <span className="button-text">Add Slot</span>
                      </Button>
                  </OverlayTrigger>
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
