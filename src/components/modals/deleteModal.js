import './deleteModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../assets/media/x-circle.svg';
import { useState } from 'react';
import RoomSlotHelper from '../../data/store/RoomSlotHelper';
import { RoomStore } from '../../data/store/RoomStore';
import { ParticipantStore } from '../../data/store/ParticipantStore';
import RoomSlot from '../../data/model/RoomSlot';
import Room from '../../data/model/Room';
import Participant from '../../data/model/Participant';
const helper = new RoomSlotHelper();
const roomStore = RoomStore.getSingleton();
const participantStore = ParticipantStore.getSingleton();

function deleteModal (props, onClose, onSave, onHide) {
  const [showModal, setShowModal] = useState(true);
  const [item, setItem] = useState(props.deleteobject);
  const handleClose = () => {
    setShowModal(false);
  };
  const deleteItem = () => {
    console.log('delete');
    if (item instanceof RoomSlot) {
      helper.deleteSlotAndCorrespondingRooms(item.getId());
    } else if (item instanceof Room) {
      roomStore.delete(item.getId());
    } else if (item instanceof Participant) {
      participantStore.delete(item.getId());
    } else {
      console.log('No matching item found to delete!');
    }
    setShowModal(false);
    setItem(undefined);
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
                        <span className={'modal-header border-0'}>Delete {props.titleobject}</span>
                        <img src={exit} alt={'exitModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'text-container'}>
                        <h2 className={'delete-title-subheadline'}>Are you sure you want to delete {props.textobject}?</h2>
                        <span className={'delete-title-subheadline'}>This Action can&lsquo;t be undone.</span>
                    </div>
                    <div className={'footer'}>
                        <button className={'confirm-button'} onClick={() => {
                          deleteItem();
                          props.onHide();
                        }
                        }>
                            <span className={'confirm-text'}>Confirm</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
export default deleteModal;
