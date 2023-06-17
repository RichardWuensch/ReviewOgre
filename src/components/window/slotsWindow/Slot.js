import './Slot.css';
import React, { useState, useEffect } from 'react';
import { Accordion, Card, Image, useAccordionButton, OverlayTrigger, Tooltip } from 'react-bootstrap';
import locationImage from '../../../assets/media/geo-alt-fill.svg';
import deleteButton from '../../../assets/media/trash.svg';
import alarmImage from '../../../assets/media/alarm-fill.svg';
import edit from '../../../assets/media/pencil-square.svg';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { useRoomSlotsDispatch } from '../context/RoomSlotContext';

function SlotCard (props) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  /* const [showModalDeleteRoom, setShowModalDeleteRoom] = React.useState(false); */
  const [showModalDeleteSlot, setShowModalDeleteSlot] = React.useState(false);
  const [showModalEditSlot, setShowModalEditSlot] = React.useState(false);
  /* const [deleteModalText, setDeleteModalText] = React.useState(''); */
  /* const [objectToDelete, setObjectToDelete] = React.useState(null); */

  const openAccordion = useAccordionButton(props.eventKey, () => {});

  const roomSlotdispatch = useRoomSlotsDispatch();

  const expandAndToggle = () => {
    openAccordion(undefined);
    setIsAccordionOpen(prevOpen => prevOpen !== true);
  };
  function handleDelete () {
    console.log('Delete successful');
  }

  /* function removeRoom (slot, roomToRemove) {
    slot.setRooms(
      slot.getRooms().filter(room => room.getId() !== roomToRemove.getId())
    );

    return slot;
  } */

  function getSlotDescription () {
    const options = { weekday: 'long' };
    return props.roomSlot.getDate().toLocaleDateString('en-US', options) + ' ' + props.roomSlot.getFormattedDate() + ' From: ' + props.roomSlot.getFormattedStartTime() + ' to ' + props.roomSlot.getFormattedEndTime();
  }

  const removeSlot = (roomSlot) => {
    /* eslint-disable object-shorthand */
    roomSlotdispatch({
      type: 'deleted',
      itemToDelete: roomSlot
    });
    /* eslint-enable object-shorthand */
  };

  /* const removeRoomFromSlot = (roomSlot) => {
    // eslint-disable object-shorthand
    roomSlotdispatch({
      type: 'changed',
      updatedRoomSlot: roomSlot
    });
    // eslint-enable object-shorthand
  }; */

  const updateSlot = (roomSlot) => {
    /* eslint-disable object-shorthand */
    roomSlotdispatch({
      type: 'changed',
      updatedRoomSlot: roomSlot
    });

    /* eslint-enable object-shorthand */
  };

  const [showTooltip, setShowTooltip] = useState([false, false, false]);
  const [popoverText, setPopoverText] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const handleMouseEnter = (buttonId) => {
    const newShowTooltips = [false, false, false];
    newShowTooltips[buttonId] = true;
    setShowTooltip(newShowTooltips);
  };
  const handleMouseLeave = (buttonId) => {
    const newShowTooltips = [false, false, false];
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

  const slotContent = (
        <>
            <Card>
                <Card.Header className={'list-item'}>
                    <div className={'slots-infos'} onMouseMove={handleMouseMove}>
                        <OverlayTrigger
                          key='0'
                          placement="top"
                          overlay={<Tooltip id="tooltip-0">{popoverText}</Tooltip>}
                          show={showTooltip[0]}
                          target={mousePosition}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                  isAccordionOpen ? setPopoverText('Show Rooms') : setPopoverText('Hide Rooms');
                                  expandAndToggle();
                                }}
                                className={'expand-structure-button'}
                                onMouseEnter={() => {
                                  isAccordionOpen ? setPopoverText('Hide Rooms') : setPopoverText('Show Rooms');
                                  handleMouseEnter(0);
                                }}
                                onMouseLeave={() => handleMouseLeave(0)}>
                                {isAccordionOpen
                                  ? (
                                        <Image src={alarmImage} alt={'alarmImage'} />
                                    )
                                  : (
                                        <Image src={alarmImage} alt={'alarmImage'} />
                                    )}
                                <span className={'slot-text'} style={{ paddingLeft: 5 }}>
                                    {getSlotDescription()}
                                </span>
                            </button>
                        </OverlayTrigger>
                        <div className={'options'}>
                            <OverlayTrigger
                              key='1'
                              placement="top"
                              overlay={<Tooltip id="tooltip-1">{popoverText}</Tooltip>}
                              show={showTooltip[1]}
                              target={mousePosition}
                            >
                                <button className={'button-options-edit'} onClick={() => {
                                  setShowModalEditSlot(true);
                                }}
                                  onMouseEnter={() => { setPopoverText('Edit Slot with linked Rooms'); handleMouseEnter(1); }}
                                  onMouseLeave={() => handleMouseLeave(1)}>
                                    <Image src={edit} alt={'icon'}/>
                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              key='2'
                              placement="top"
                              overlay={<Tooltip id="tooltip-2">{popoverText}</Tooltip>}
                              show={showTooltip[2]}
                              target={mousePosition}
                            >
                                <button className={'button-options-delete'} onClick={() => setShowModalDeleteSlot(true)}
                                  onMouseEnter={() => { setPopoverText('Delete Slot with linked Rooms'); handleMouseEnter(2); }}
                                  onMouseLeave={() => handleMouseLeave(2)}>
                                    <img src={deleteButton} alt={'icon'}/>
                                </button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey={props.eventKey}>
                    <Card.Body>
                        <ul style={{ listStyle: 'none', overflowY: 'auto' }}>
                            {props.roomSlot.getRooms()?.map((room, roomIndex) =>
                                <li key={roomIndex}>
                                    <div className={'room-properties'}>
                                        <Image src={locationImage} alt={'locationImage'} />
                                        <span style={{ paddingLeft: 5 }}>{room.getName()}</span>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </>
  );

  return (
        <>
            {slotContent}
            <SlotModal
                show={showModalEditSlot}
                onHide={() => setShowModalEditSlot(false)}
                header={'Edit Slot'}
                roomslot={props.roomSlot}
                edit={true}
                onSaveClick={(slot) => updateSlot(slot)}/>
            <DeleteModal
                // modal to delete the whole slot
                show={showModalDeleteSlot}
                onHide={() => setShowModalDeleteSlot(false)}
                onSave={handleDelete}
                titleObject={'Slot'}
                textobject={'the selected Slot ?\n\n\'' + getSlotDescription() + '\''}
                deleteobject={props.roomSlot}
                onDeleteClick={(slot) => removeSlot(slot)}/>
        </>

  );
}
export default SlotCard;
