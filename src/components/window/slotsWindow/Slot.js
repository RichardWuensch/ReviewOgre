import React, { useState } from 'react';
import { Accordion, Card, Image, useAccordionButton } from 'react-bootstrap';
import fileImage from '../../../assets/media/file-earmark.svg';
import deleteButton from '../../../assets/media/trash.svg';
import folderImage from '../../../assets/media/folder.svg';
import edit from '../../../assets/media/pencil-square.svg';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import DeleteModal from '../../modals/deleteModal/deleteModal';
import './Slot.css';

function SlotCard ({ eventKey, roomSlot }) {
  const [childUpdated, setChildUpdated] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleteTitleObject, setDeleteTitleObject] = React.useState('');
  const [deleteTextObject, setDeleteTextObject] = React.useState('');
  const [modalShowSlot, setModalShowSlot] = React.useState(false);
  const [deleteObject, setDeleteObject] = React.useState(null);
  const [roomToDelete, setRoomToDelete] = React.useState(-1);

  const openAccordion = useAccordionButton(eventKey, () =>
    console.log('totally custom!')
  );
  const expandAndToggle = () => {
    openAccordion(undefined);
    setOpen(prevOpen => prevOpen !== true);
  };
  function handleDelete () {
    console.log('Delete successful');
  }
  function handleUpdate () {
    setChildUpdated(!childUpdated);
  }

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
                            {open
                              ? (
                                    <Image src={folderImage} alt={'folderImage'} />
                                )
                              : (
                                    <Image src={folderImage} alt={'folderImage'} />
                                )}
                            <span className={'slot-text'} style={{ paddingLeft: 5 }}>
                                {roomSlot.getFormattedDate() + ' From: ' + roomSlot.getFormattedStartTime() + ' to ' + roomSlot.getFormattedEndTime()}
                            </span>
                        </button>
                        <div className={'options'}>
                            <button className={'button-options-edit'} onClick={() => {
                              setModalShowSlot(true);
                            }}>
                                <Image src={edit} alt={'icon'}/>
                            </button>
                            <button className={'button-options-delete'} onClick={() => {
                              setDeleteTitleObject('Slot');
                              setDeleteTextObject('this Slot');
                              setDeleteObject(roomSlot);
                              setModalDelete(true);
                            }}>
                                <img src={deleteButton} alt={'icon'}/>
                            </button>
                        </div>
                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <ul style={{ listStyle: 'none', overflowY: 'auto' }}>
                            {roomSlot.getRooms()?.map((room, roomIndex) =>
                                <li key={roomIndex}>
                                    <div className={'room-properties'}>
                                        <Image src={fileImage} alt={'fileImage'} />
                                        <span style={{ paddingLeft: 5 }}>{room.getName()}</span>
                                        <div className={'options'}>
                                            <button className={'button-options-delete'} onClick={() => {
                                              // remove room from array
                                              setDeleteTitleObject('Room');
                                              setDeleteTextObject(room.getName());
                                              setDeleteObject(roomSlot);
                                              setRoomToDelete(roomIndex);
                                              console.log(roomIndex);
                                              setModalDelete(true);
                                            }}>
                                                <img src={deleteButton} alt={'icon'}/>
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
                show={modalShowSlot}
                onHide={() => { setModalShowSlot(false); handleUpdate(); }}
                header={'Edit Slot'}
                id={roomSlot.getId()}
                edit={true}
                date={roomSlot.getDate()}
                starttime={roomSlot.getFormattedStartTime()}
                endtime={roomSlot.getFormattedEndTime()}
                items={roomSlot.getRooms()}/>
            <DeleteModal
                show={modalDelete}
                onHide={() => {
                  setModalDelete(false);
                  handleUpdate();
                }}
                onSave={handleDelete}
                titleObject={deleteTitleObject}
                textobject={deleteTextObject}
                deleteobject={deleteObject}
                roomid={roomToDelete}/>
        </>

  );
}
export default SlotCard;
