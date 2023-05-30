import React from 'react';
import './SlotsWindow.css';
import SlotModal from '../../modals/slotRoomModal/SlotRoomModal';
import DeleteModal from '../../modals/deleteModal/deleteModal';
import add from '../../../assets/media/plus-circle.svg';
import { Accordion, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRoomSlots } from '../context/RoomSlotContext';
import SlotCard from './Slot';

function SlotsWindow () {
  const [childUpdated, setChildUpdated] = React.useState(false);
  const [modalShowSlot, setModalShowSlot] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleteTitleObject, setDeleteTitleObject] = React.useState('');
  const [deleteTextObject, setDeleteTextObject] = React.useState('');
  const [deleteObject, setDeleteObject] = React.useState(null);

  const roomSlots = useRoomSlots();

  function handleChildUpdate () {
    setChildUpdated(!childUpdated);
    setDeleteObject('');
    setDeleteTextObject('');
    setDeleteTitleObject(null);
  }
  function handleDelete () {
    handleChildUpdate();
    console.log('Delete successful');
  }

  return (
      <div className={'slotsWindow'}>
          <h2 className={'title-subheadline'}>Slots</h2>
          <div className={'slots-button-container'}>
              <button className={'button-container-green-slots'} onClick={() => setModalShowSlot(true)}>
                  <Image src={add} alt={'addSlotIcon'} height={16} width={16}/>
                  <span className={'button-text'}>Add Slot</span>
              </button>
          </div>
          <div className={'slots-list-container'}>
              <Accordion defaultActiveKey="0">
              <ul className={'list-style'}>
                  {roomSlots.map((slot, index) => (
                          <li key={index}>
                              <SlotCard
                                  eventKey={index}
                                  roomSlot={slot}/>

                          </li>
                  ))}
              </ul>
              </Accordion>
          </div>
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
