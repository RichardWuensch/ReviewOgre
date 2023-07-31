import './Slot.css';
import React, { useState } from 'react';
import { Accordion, Card, Image, useAccordionButton } from 'react-bootstrap';
import locationImage from '../../../assets/media/geo-alt-fill.svg';
import deleteButton from '../../../assets/media/trash.svg';
import alarmImage from '../../../assets/media/alarm-fill.svg';
import editImage from '../../../assets/media/pencil-square.svg';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { useRoomSlotsDispatch } from '../../shared/context/RoomSlotContext';
import CustomIconButton from '../../shared/buttons/iconButton/CustomIconButton';
import PropTypes from 'prop-types';

function SlotCard ({ roomSlot, eventKey, changePossible, ...props }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [showModalDeleteSlot, setShowModalDeleteSlot] = React.useState(false);
  const [showModalEditSlot, setShowModalEditSlot] = React.useState(false);

  const openAccordion = useAccordionButton(eventKey, () => {});

  const roomSlotDispatch = useRoomSlotsDispatch();

  const expandAndToggle = () => {
    openAccordion(undefined);
    setIsAccordionOpen(prevOpen => prevOpen !== true);
  };
  function handleDelete () {
    console.log('Delete successful');
  }

  function getSlotDescription () {
    const options = { weekday: 'long' };
    return roomSlot.getDate().toLocaleDateString('en-US', options) + ' ' + roomSlot.getFormattedDate() + ' From: ' + roomSlot.getFormattedStartTime() + ' to ' + roomSlot.getFormattedEndTime();
  }

  const removeSlot = (roomSlot) => {
    /* eslint-disable object-shorthand */
    roomSlotDispatch({
      type: 'deleted',
      itemToDelete: roomSlot
    });
    /* eslint-enable object-shorthand */
  };

  const updateSlot = (roomSlot) => {
    /* eslint-disable object-shorthand */
    roomSlotDispatch({
      type: 'changed',
      updatedRoomSlot: roomSlot
    });

    /* eslint-enable object-shorthand */
  };

  const deleteRooms = (deletedRooms) => {
  };

  const addRooms = (newRooms) => {
  };

  const updateRooms = (updatedRooms) => {
  };

  const slotContent = (
        <>
            <Card>
                <Card.Header className={'list-item'}>
                    <div className={'slots-infos'}>
                        <CustomIconButton
                            onButtonClick={() => expandAndToggle()}
                            toolTip={isAccordionOpen ? 'Click to hide rooms' : 'Click to show rooms'}>
                            <Image src={alarmImage} alt={'alarmImage'} />
                            <span className={'slot-text'} style={{ paddingLeft: 5 }}>
                                {getSlotDescription()}
                            </span>
                        </CustomIconButton>
                        {changePossible
                          ? (
                                <div className={'options'}>
                                    <CustomIconButton
                                        onButtonClick={() => setShowModalEditSlot(true)}
                                        toolTip={'Edit this slot'}>
                                        <Image src={editImage} alt={'icon'}/>
                                    </CustomIconButton>
                                    <CustomIconButton
                                        onButtonClick={() => setShowModalDeleteSlot(true)}
                                        toolTip={'Delete this slot and linked rooms'}>
                                        <Image src={deleteButton} alt={'icon'}/>
                                    </CustomIconButton>
                                </div>
                            )
                          : (
                                <div className={'options'}></div>
                            )}
                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <ul style={{ listStyle: 'none', overflowY: 'auto' }}>
                            {roomSlot.getRooms()?.map((room, roomIndex) =>
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
                roomslot={roomSlot}
                edit={true}
                onSaveClick={(slot, deletedRooms, newRooms, updatedRooms) => { deleteRooms(deletedRooms); addRooms(newRooms); updateRooms(updatedRooms); updateSlot(slot); }}/>
            <DeleteModal
                // modal to delete the whole slot
                show={showModalDeleteSlot}
                onHide={() => setShowModalDeleteSlot(false)}
                onSave={handleDelete}
                titleObject={'Slot'}
                textObject={'the selected Slot ?\n\n\'' + getSlotDescription() + '\''}
                deleteObject={roomSlot}
                onDeleteClick={(slot) => removeSlot(slot)}/>
        </>

  );
}
SlotCard.propTypes = {
  changePossible: PropTypes.bool,
  roomSlot: PropTypes.object.isRequired,
  eventKey: PropTypes.number.isRequired
};
export default SlotCard;
