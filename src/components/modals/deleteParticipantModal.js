import './deleteParticipantModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../assets/media/x-circle.svg';
import { useState } from 'react';

function deleteParticipantModal (props, onClose, onSave, onHide, multiple) {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
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
                        {props.multiple
                          ? (
                                <span className={'modal-header border-0'}>Delete selected<br />Participants</span>
                            )
                          : (
                                <span className={'modal-header border-0'}>Delete Participant</span>
                            )}
                        <img src={exit} alt={'exitParticipantModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'text-container'}>
                        {props.multiple
                          ? (
                                <h2 className={'title-subheadline'}>Are you sure you want to delete the selected Participants?</h2>
                            )
                          : (
                                <h2 className={'title-subheadline'}>Are you sure you want to delete this Participant?</h2>
                            )}
                        <span className={'title-subheadline'} style={{ fontSize: 12 }}>This Action can&lsquo;t be undone.</span>
                    </div>
                    <div className={'footer'}>
                        <button className={'confirm-button'}>
                            <span className={'confirm-text'}>Confirm</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
export default deleteParticipantModal;
