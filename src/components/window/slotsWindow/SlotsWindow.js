import React, { useState } from 'react';
import './SlotsWindow.css';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import DeleteModal from '../../modals/deleteModal/deleteModal';
import add from '../../../assets/media/plus-circle.svg';
import folderImage from '../../../assets/media/folder.svg';
import fileImage from '../../../assets/media/file-earmark.svg';
import edit from '../../../assets/media/pencil-square.svg';
import deleteButton from '../../../assets/media/trash.svg';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import RoomSlotHelper from '../../../data/store/RoomSlotHelper';
import PropTypes from 'prop-types';
import { useRoomSlots } from '../context/RoomSlotContext';

function ToggleSlot (props) {
  const [open, setOpen] = useState(false);
  const helper = props.slothelper;
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleteTitleObject, setDeleteTitleObject] = React.useState('');
  const [deleteTextObject, setDeleteTextObject] = React.useState('');
  const [modalShowSlot, setModalShowSlot] = React.useState(false);
  const [deleteObject, setDeleteObject] = React.useState(null);
  const openAccordion = useAccordionButton(props.eventKey, () =>
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
    props.onUpdate();
  }
  return (
        <div className={'slots-infos'}>
            <button
                type="button"
                onClick={expandAndToggle}
                className={'expand-structure-button'}
            >
                {open
                  ? (
                    <img src={folderImage} alt={'folderImage'} />
                    )
                  : (
                    <img src={folderImage} alt={'folderImage'} />
                    )}
                <span className={'slot-text'} style={{ paddingLeft: 5 }}>{props.slotText}</span>
            </button>
            <div className={'options'}>
                <button className={'button-options-edit'} onClick={() => {
                  setModalShowSlot(true);
                }}>
                    <img src={edit} alt={'icon'}/>
                </button>
                <button className={'button-options-delete'} onClick={() => {
                  setDeleteTitleObject('Slot');
                  setDeleteTextObject('this Slot');
                  setDeleteObject(helper.getRoomSlot(props.slotId));
                  setModalDelete(true);
                }}>
                    <img src={deleteButton} alt={'icon'}/>
                </button>
            </div>
            <div className={'setup-start-container'}>
                <SlotModal
                    show={modalShowSlot}
                    onHide={() => { setModalShowSlot(false); handleUpdate(); }}
                    header={'Edit Slot'}
                    id={props.slotId}
                    edit={true}
                    date={props.date}
                    starttime={props.starttime}
                    endtime={props.endtime}
                    items={props.rooms}/>
                {deleteObject !== null && (
                    <DeleteModal
                        show={modalDelete}
                        onHide={() => {
                          setModalDelete(false);
                          handleUpdate();
                        }}
                        onSave={handleDelete}
                        titleobject={deleteTitleObject}
                        textobject={deleteTextObject}
                        deleteobject={deleteObject}
                    />
                )}
                {/* replace with helper.getRoomSlot(slotId) not stable atm */}
            </div>
        </div>
  );
}
ToggleSlot.propTypes = {
  eventKey: PropTypes.string.isRequired,
  slotId: PropTypes.number,
  slotText: PropTypes.string,
  date: PropTypes.any,
  starttime: PropTypes.any,
  endtime: PropTypes.any,
  rooms: PropTypes.array,
  slothelper: PropTypes.any,
  onUpdate: PropTypes.any
};

function SlotsWindow () {
  const [childUpdated, setChildUpdated] = React.useState(false);
  const [modalShowSlot, setModalShowSlot] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleteTitleObject, setDeleteTitleObject] = React.useState('');
  const [deleteTextObject, setDeleteTextObject] = React.useState('');
  const [deleteObject, setDeleteObject] = React.useState(null);
  const helper = new RoomSlotHelper();

  const roomSlots = useRoomSlots();

  function handleChildUpdate () {
    setChildUpdated(!childUpdated);
  }
  function handleDelete () {
    console.log('Delete successful');
  }

  return (
      <div className={'slotsWindow'}>
          <h2 className={'title-subheadline'}>Slots</h2>
          <div className={'slots-button-container'}>
              <button className={'button-container-green-slots'} onClick={() => setModalShowSlot(true)}>
                  <img src={add} alt={'addSlotIcon'} height={16} width={16}/>
                  <span className={'button-text'}>Add Slot</span>
              </button>
          </div>
          <div className={'slots-list-container'}>
              <Accordion defaultActiveKey="0">
              <ul className={'list-style'}>
                  {roomSlots.map((slot, index) => (
                          <li key={index}>
                              <Card>
                                  <Card.Header className={'list-item'}>
                                          <ToggleSlot eventKey={index}
                                                      slotId={slot.getId()}
                                                      slotText={slot.getFormattedDate() + ' From: ' + slot.getFormattedStartTime() + ' to ' + slot.getFormattedEndTime()}
                                                      date={slot.getDate()}
                                                      starttime={slot.getFormattedStartTime()}
                                                      endtime={slot.getFormattedEndTime()}
                                                      rooms={slot.getRooms()}
                                                      slothelper={helper}
                                                      onUpdate={handleChildUpdate}></ToggleSlot>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey={index}>
                                      <Card.Body>
                                          <ul style={{ listStyle: 'none', overflowY: 'auto' }}>
                                              {slot.getRooms()?.map((room, roomIndex) =>
                                              <li key={roomIndex}>
                                                  <div className={'room-properties'}>
                                                      <img src={fileImage} alt={'fileImage'} />
                                                      <span style={{ paddingLeft: 5 }}>{room.getName()}</span>
                                                      <div className={'options'}>
                                                          <button className={'button-options-delete'} onClick={() => {
                                                            setDeleteTitleObject('Room');
                                                            setDeleteTextObject(room.getName());
                                                            setDeleteObject(room);
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
                          </li>
                  ))}
              </ul>
              </Accordion>
          </div>
          <div className={'setup-start-container'}>
            <SlotModal
                /* open Slot Modal without data */
                show={modalShowSlot}
                onHide={() => setModalShowSlot(false)}
                header={'New Time Slot'}/>

              {deleteObject !== null && (
                  <DeleteModal
                      show={modalDelete}
                      onHide={() => setModalDelete(false)}
                      onSave={handleDelete}
                      titleobject={deleteTitleObject}
                      textobject={deleteTextObject}
                      deleteobject={deleteObject}
                  />
              )}
        </div>
      </div>
  );
}

SlotsWindow.propTypes = {
  listAllSlots: PropTypes.arrayOf(
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.number
  )
};

export default SlotsWindow;
