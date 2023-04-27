import React, { useState } from 'react';
import './slots_window.css';
import SlotModal from '../modals/addSlotRoomModal';
import DeleteModal from '../modals/deleteModal';
import add from '../../assets/media/plus-circle.svg';
import folderImage from '../../assets/media/folder.svg';
import fileImage from '../../assets/media/file-earmark.svg';
import edit from '../../assets/media/pencil-square.svg';
import deleteButton from '../../assets/media/trash.svg';
import PropTypes from 'prop-types';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';

function ToggleSlot ({ eventKey, slotText }) {
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
                <button className={'button-options-edit'}>
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
  slotText: PropTypes.string
};

function SlotsWindow (props) {
  const [modalShowSlot, setModalShowSlot] = React.useState(false);
  const items = [{ text: '', room: false }, { text: '', room: false }];
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleteTitleObject, setDeleteTitleObject] = React.useState('');
  const [deleteTextObject, setDeleteTextObject] = React.useState('');

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
                  {items.map((item, index) => (
                          <li key={index}>
                              <Card>
                                  <Card.Header className={'list-item'}>
                                          <ToggleSlot eventKey={index} slotText={'Test Slot Text'} ></ToggleSlot>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey={index}>
                                      <Card.Body>
                                          <div className={'room-properties'}>
                                              <img src={fileImage} alt={'fileImage'} />
                                              <span style={{ paddingLeft: 5 }}>Room</span>
                                              <div className={'options'}>
                                                  <button className={'button-options-edit'}>
                                                      <img src={edit} alt={'icon'}/>
                                                  </button>
                                                  <button className={'button-options-delete'} onClick={() => {
                                                    setDeleteTitleObject('Room');
                                                    setDeleteTextObject('this Room');
                                                    setModalDelete(true);
                                                  }}>
                                                      <img src={deleteButton} alt={'icon'}/>
                                                  </button>
                                              </div>
                                          </div>
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
                show={modalShowSlot}
                onHide={() => setModalShowSlot(false)}/>
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
