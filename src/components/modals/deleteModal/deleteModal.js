import './deleteModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../../assets/media/x-circle.svg';
import { useState } from 'react';
import RoomSlot from '../../../data/model/RoomSlot';
import Participant from '../../../data/model/Participant';
import { useParticipantsDispatch } from '../../window/context/ParticipantsContext';
import PropTypes from 'prop-types';
import ParticipantModal from '../participantModals/addEditModal/ParticipantModal';
import { useRoomSlotsDispatch } from '../../window/context/RoomSlotContext';

function deleteModal (props) {
  const [showModal, setShowModal] = useState(true);
  const toDelete = props.deleteobject;
  const update = useState(props.update || false);
  const roomToRemove = useState(props.roomid);

  const participantDispatch = useParticipantsDispatch();
  const roomSlotDispatch = useRoomSlotsDispatch();

  const handleClose = () => {
    setShowModal(false);
  };

  const deleteItem = () => {
    if (toDelete instanceof RoomSlot && update) {
      // only update the changed roomSlot Object
      toDelete.setRooms(
        toDelete.getRooms()
          .splice(roomToRemove, 1)
      );

      console.log(toDelete.getRooms());

      roomSlotDispatch({
        type: 'changed',
        updatedRoomSlot: toDelete
      });
    } else if (toDelete instanceof RoomSlot) {
      roomSlotDispatch({
        type: 'deleted',
        itemToDelete: toDelete
      });
    } else if (Array.isArray(toDelete) && toDelete.every(i => i instanceof Participant)) {
      // delete participants always and array to allow delete multiple
      toDelete.forEach(participant => {
        participantDispatch({
          type: 'deleted',
          itemToDelete: participant
        });
      });
    } else {
      console.log('No matching item found to delete!');
    }

    handleClose();
  };

  return (
        <Modal
            onExit={handleClose}
            show={showModal}
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={'modal-container'}>
                    <div className={'modal-header-container'}>
                        <span className={'modal-header border-0'}> {'Delete' + props.titleObject}</span>
                        <img src={exit} alt={'exitModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'text-container'}>
                        <h2 className={'delete-title-subheadline'}>Are you sure you want to delete {props.textobject}?</h2>
                        <span className={'delete-title-subheadline'}>This Action can&lsquo;t be undone.</span>
                    </div>
                    <div className={'footer'}>
                        <button className={'confirm-button'} onClick= {() => {
                          deleteItem();
                          props.onHide();
                        }}>
                            <span className={'confirm-text'}>Confirm</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
ParticipantModal.propTypes = {
  textObject: PropTypes.string,
  titleObject: PropTypes.string,
  toDelete: PropTypes.array,
  onClose: PropTypes.func,
  update: PropTypes.bool,
  roomToRemove: PropTypes.number
};
export default deleteModal;
