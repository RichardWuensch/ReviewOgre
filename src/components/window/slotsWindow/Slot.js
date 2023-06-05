import './Slot.css';
import React, { useState } from 'react';
import { Accordion, Card, Image, useAccordionButton } from 'react-bootstrap';
import fileImage from '../../../assets/media/file-earmark.svg';
import deleteButton from '../../../assets/media/trash.svg';
import folderImage from '../../../assets/media/folder.svg';
import edit from '../../../assets/media/pencil-square.svg';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { useRoomSlotsDispatch } from '../context/RoomSlotContext';

function SlotCard (props) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [showModalDeleteRoom, setShowModalDeleteRoom] = React.useState(false);
  const [showModalDeleteSlot, setShowModalDeleteSlot] = React.useState(false);
  const [showModalEditSlot, setShowModalEditSlot] = React.useState(false);
  const [deleteModalText, setDeleteModalText] = React.useState('');
  const [objectToDelete, setObjectToDelete] = React.useState(null);

  const openAccordion = useAccordionButton(props.eventKey, () => {});
  const roomSlotdispatch = useRoomSlotsDispatch();

  const expandAndToggle = () => {
    openAccordion(undefined);
    setIsAccordionOpen(prevOpen => prevOpen !== true);
  };
  function handleDelete () {
    console.log('Delete successful');
  }

  function removeRoom (slot, roomToRemove) {
    slot.setRooms(
      slot.getRooms().filter(room => room.getId() !== roomToRemove.getId())
    );

    return slot;
  }

  function getSlotDescription () {
    return props.roomSlot.getFormattedDate() + ' From: ' + props.roomSlot.getFormattedStartTime() + ' to ' + props.roomSlot.getFormattedEndTime();
  }

  const removeSlot = (roomSlot) => {
    /* eslint-disable object-shorthand */
    roomSlotdispatch({
      type: 'deleted',
      itemToDelete: roomSlot
    });
    /* eslint-enable object-shorthand */
  };

  const removeRoomFromSlot = (roomSlot) => {
    /* eslint-disable object-shorthand */
    roomSlotdispatch({
      type: 'changed',
      updatedRoomSlot: roomSlot
    });
    /* eslint-enable object-shorthand */
  };

  const updateSlot = (roomSlot) => {
    /* eslint-disable object-shorthand */
    roomSlotdispatch({
      type: 'changed',
      updatedRoomSlot: roomSlot
    });

    /* eslint-enable object-shorthand */
  };

  const slotContent = (
        <>
            <Card>
                <Card.Header className={'list-item'}>
                    <div className={'slots-infos'}>
                        <button
                            type="button"
                            onClick={expandAndToggle}
                            className={'expand-structure-button'}
                        >
                            {isAccordionOpen
                              ? (
                                    <Image src={folderImage} alt={'folderImage'} />
                                )
                              : (
                                    <Image src={folderImage} alt={'folderImage'} />
                                )}
                            <span className={'slot-text'} style={{ paddingLeft: 5 }}>
                                {getSlotDescription()}
                            </span>
                        </button>
                        <div className={'options'}>
                            <button className={'button-options-edit'} onClick={() => {
                              setShowModalEditSlot(true);
                            }}>
                                <Image src={edit} alt={'icon'}/>
                            </button>
                            <button className={'button-options-delete'} onClick={() => setShowModalDeleteSlot(true)}>
                                <img src={deleteButton} alt={'icon'}/>
                            </button>
                        </div>
                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey={props.eventKey}>
                    <Card.Body>
                        <ul style={{ listStyle: 'none', overflowY: 'auto' }}>
                            {props.roomSlot.getRooms()?.map((room, roomIndex) =>
                                <li key={roomIndex}>
                                    <div className={'room-properties'}>
                                        <Image src={fileImage} alt={'fileImage'} />
                                        <span style={{ paddingLeft: 5 }}>{room.getName()}</span>
                                        <div className={'options'}>
                                            <button className={'button-options-delete'} onClick={() => {
                                              // remove room from array
                                              setDeleteModalText(room.getName());
                                              setObjectToDelete(removeRoom(props.roomSlot.getDeepCopy(), room));
                                              setShowModalDeleteRoom(true);
                                            }}>
                                                <Image src={deleteButton} alt={'icon'}/>
                                            </button>
                                        </div>
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
                textobject={'this Slot'}
                deleteobject={props.roomSlot}
                onDeleteClick={(slot) => removeSlot(slot)}/>
            <DeleteModal
                // remove a room from the slot
                show={showModalDeleteRoom}
                onHide={() => setShowModalDeleteRoom(false)}
                onSave={handleDelete}
                titleObject={'Room'}
                textobject={deleteModalText}
                deleteobject={objectToDelete}
                onDeleteClick={(slot) => removeRoomFromSlot(slot)}/>
        </>

  );
}
export default SlotCard;
