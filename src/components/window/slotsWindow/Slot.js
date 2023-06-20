import './Slot.css';
import React, { useState } from 'react';
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

  const renderTooltip = (props, tooltip) => (
        <Tooltip id="button-tooltip" {...props}>
            {tooltip}
        </Tooltip>
  );

  const slotContent = (
        <>
            <Card>
                <Card.Header className={'list-item'}>
                    <div className={'slots-infos'}>
                        <OverlayTrigger
                            trigger={['hover', 'focus']}
                            placement="top"
                            overlay={(props) => renderTooltip(props, isAccordionOpen ? 'Click to hide rooms' : 'Click to show rooms')}
                            delay={200}
                        >
                            <button
                                type="button"
                                onClick={() => expandAndToggle()}
                                className={'expand-structure-button'}>
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
                                trigger={['hover', 'focus']}
                                placement="top"
                                overlay={(props) => renderTooltip(props, 'Edit this slot')}
                                delay={200}
                            >
                                <button className={'button-options-edit'} onClick={() => setShowModalEditSlot(true)}>
                                    <Image src={edit} alt={'icon'}/>
                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                trigger={['hover', 'focus']}
                                placement="top"
                                overlay={(props) => renderTooltip(props, 'Delete this slot and linked rooms')}
                                delay={200}
                            >
                                <button className={'button-options-delete'} onClick={() => setShowModalDeleteSlot(true)}>
                                    <Image src={deleteButton} alt={'icon'}/>
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
