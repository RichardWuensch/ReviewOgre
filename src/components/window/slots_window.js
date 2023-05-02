import React, { useState } from 'react';
import './slots_window.css';
import SlotModal from '../modals/SlotRoomModal';
import DeleteModal from '../modals/deleteModal';
import add from '../../assets/media/plus-circle.svg';
import folderImage from '../../assets/media/folder.svg';
import fileImage from '../../assets/media/file-earmark.svg';
import edit from '../../assets/media/pencil-square.svg';
import deleteButton from '../../assets/media/trash.svg';
import PropTypes from 'prop-types';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';

const items = [{ text: 'I.2.3.4', beamerNeeded: true }, { text: 'I.2.3.5', beamerNeeded: false }];

function ToggleSlot ({ eventKey, slotText, date, endTime, rooms, startTime }) {
  const [open, setOpen] = useState(false);
  const openAccordion = useAccordionButton(eventKey, () =>
    console.log('totally custom!')
  );
  const expandAndToggle = () => {
    openAccordion(undefined);
    setOpen(prevOpen => prevOpen !== true);
  };
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleteTitleObject, setDeleteTitleObject] = React.useState('');
  const [deleteTextObject, setDeleteTextObject] = React.useState('');
  const [modalShowSlot, setModalShowSlot] = React.useState(false);

  function handleDelete () {
    console.log('Delete successful');
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
                <span className={'slot-text'} style={{ paddingLeft: 5 }}>{slotText}</span>
            </button>
            <div className={'options'}>
                <button className={'button-options-edit'} onClick={() => setModalShowSlot(true)}>
                    <img src={edit} alt={'icon'}/>
                </button>
                <button className={'button-options-delete'} onClick={() => {
                  setDeleteTitleObject('Slot');
                  setDeleteTextObject('this Slot');
                  setModalDelete(true);
                }}>
                    <img src={deleteButton} alt={'icon'}/>
                </button>
            </div>
            <div className={'setup-start-container'}>
                <SlotModal
                    /* replace each attribute with value from store */
                    show={modalShowSlot}
                    onHide={() => setModalShowSlot(false)}
                    header={'Edit Slot'}
                    edit={true}
                    date={date}
                    startTime={startTime}
                    endTime={endTime}
                    items={rooms}/>
                <DeleteModal
                    show={modalDelete}
                    onHide={() => setModalDelete(false)}
                    onSave={handleDelete}
                    titleObject={deleteTitleObject}
                    textObject={deleteTextObject}/>
            </div>
        </div>
  );
}
ToggleSlot.propTypes = {
  eventKey: PropTypes.string.isRequired,
  slotText: PropTypes.string,
  date: PropTypes.any,
  startTime: PropTypes.any,
  endTime: PropTypes.any,
  rooms: PropTypes.array
};

function SlotsWindow (props) {
  const [modalShowSlot, setModalShowSlot] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleteTitleObject, setDeleteTitleObject] = React.useState('');
  const [deleteTextObject, setDeleteTextObject] = React.useState('');
  const slots = [{ date: DateFormatter('02/05/2023'), startTime: '09:00', endTime: '12:00', items }, { date: DateFormatter('03/05/2023'), startTime: '12:30', endTime: '18:30', items }];
  function DateFormatter (date) {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
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
                  {slots.map((slot, index) => (
                          <li key={index}>
                              <Card>
                                  <Card.Header className={'list-item'}>
                                          <ToggleSlot eventKey={index} slotText={slot.date + ' From: ' + slot.startTime + ' to ' + slot.endTime} date={slot.date} startTime={slot.startTime} endTime={slot.endTime} rooms={slot.items}></ToggleSlot>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey={index}>
                                      <Card.Body>
                                          <ul style={{ listStyle: 'none', overflowY: 'auto' }}>
                                              {slot.items.map((room, roomIndex) =>
                                              <li key={roomIndex}>
                                                  <div className={'room-properties'}>
                                                      <img src={fileImage} alt={'fileImage'} />
                                                      <span style={{ paddingLeft: 5 }}>{room.text}</span>
                                                      <div className={'options'}>
                                                          <button className={'button-options-delete'} onClick={() => {
                                                            setDeleteTitleObject('Room');
                                                            setDeleteTextObject(room.text);
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
                header={'New Time Slot'}
                edit={false}
                date={''}
                startTime={''}
                endTime={''}
                items={[]}/>
            <DeleteModal
                show={modalDelete}
                onHide={() => setModalDelete(false)}
                onSave={handleDelete}
                titleObject={deleteTitleObject}
                textObject={deleteTextObject}/>
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
