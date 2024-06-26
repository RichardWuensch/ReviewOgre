/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import './Slot.css';
import React, { useState } from 'react';
import { Accordion, Card, Col, Image, Row, useAccordionButton } from 'react-bootstrap';
import locationImage from '../../../media/geo-alt-fill.svg';
import deleteButton from '../../../media/trash.svg';
import alarmImage from '../../../media/alarm-fill.svg';
import editImage from '../../../media/pencil-square.svg';
import copyImage from '../../../media/files.svg';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import AddCopyModal from '../../modals/slotRoomModal/SlotRoomModal';
import { useRoomSlotsDispatch } from '../../shared/context/RoomSlotContext';
import CustomIconButton from '../../shared/buttons/iconButton/CustomIconButton';
import PropTypes from 'prop-types';

function SlotCard ({ roomSlot, eventKey, changePossible, ...props }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [showModalDeleteSlot, setShowModalDeleteSlot] = useState(false);
  const [showModalEditSlot, setShowModalEditSlot] = useState(false);
  const [showModalAddSlotCopyRooms, setShowModalAddSlotCopyRooms] = React.useState(false);

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
    return roomSlot.getDate().toLocaleDateString('en-US', options) + ' ' + roomSlot.getFormattedDate() + ' from ' + roomSlot.getFormattedStartTime() + ' to ' + roomSlot.getFormattedEndTime() + ' o\'Clock';
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

  const saveNewSlot = (slot) => {
    /* eslint-disable object-shorthand */
    roomSlotDispatch({
      type: 'added',
      newRoomSlot: slot
    });
    /* eslint-enable object-shorthand */
  };

  const slotContent = (
        <>
            <Card>
                <Card.Header className={'list-item'} >
                    <Row style={{ marginTop: '6px', marginBottom: '6px' }}>
                        <Col lg={9} md={9} sm={9}>
                            <CustomIconButton
                                onButtonClick={() => expandAndToggle()}
                                toolTip={isAccordionOpen ? 'Click to hide rooms' : 'Click to show rooms'}
                                routeSection={'slots-and-rooms'}>
                                <Image src={alarmImage} alt={'alarmImage'} />
                                <span className={'w-100'} style={{ paddingLeft: 5 }}>
                                {getSlotDescription()}
                            </span>
                            </CustomIconButton>
                        </Col>
                        <Col lg={3} md={3} sm={3} className="d-flex justify-content-end">
                            {changePossible
                              ? (
                                    <>
                                        <CustomIconButton
                                            as="button"
                                            onButtonClick={() => setShowModalAddSlotCopyRooms(true)}
                                            toolTip={'Copy the rooms of this slot in a new slot.'}
                                            routeSection={'slots-and-rooms'}>
                                            <Image src={copyImage} alt={'icon'}/>
                                        </CustomIconButton>
                                        <CustomIconButton
                                            as="button"
                                            onButtonClick={() => setShowModalEditSlot(true)}
                                            toolTip={'Edit this slot'}
                                            routeSection={'slots-and-rooms'}>
                                            <Image src={editImage} alt={'icon'}/>
                                        </CustomIconButton>
                                        <CustomIconButton
                                            as="button"
                                            onButtonClick={() => setShowModalDeleteSlot(true)}
                                            toolTip={'Delete this slot and linked rooms'}
                                            routeSection={'slots-and-rooms'}>
                                            <Image src={deleteButton} alt={'icon'}/>
                                        </CustomIconButton>
                                    </>
                                )
                              : null}
                        </Col>
                    </Row>
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
                edit={'true'}
                onSaveClick={(slot) => updateSlot(slot)}/>
            <DeleteModal
                // modal to delete the whole slot
                show={showModalDeleteSlot}
                onHide={() => setShowModalDeleteSlot(false)}
                onSave={handleDelete}
                titleObject={'Slot'}
                textType={'the selected Slot and the associated rooms?\n\n'}
                textObject={'\'' + getSlotDescription() + '\''}
                deleteObject={roomSlot}
                onDeleteClick={(slot) => removeSlot(slot)}/>
            <AddCopyModal
                /* open Slot Modal with copied rooms */
                show={showModalAddSlotCopyRooms}
                onHide={() => setShowModalAddSlotCopyRooms(false)}
                header={'New Time Slot'}
                copiedRooms={roomSlot.getRooms()}
                copy={'true'}
                onSaveClick={(slot) => saveNewSlot(slot)}/>
        </>

  );
}
SlotCard.propTypes = {
  changePossible: PropTypes.bool,
  roomSlot: PropTypes.object.isRequired,
  eventKey: PropTypes.number.isRequired
};
export default SlotCard;
