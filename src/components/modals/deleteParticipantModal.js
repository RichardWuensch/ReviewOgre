import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './deleteParticipantModal.css';
import exit from '../../assets/media/x-circle.svg';
import React, { useState } from 'react';

function ParticipantModal (props) {
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
                        <span className={'modal-header border-0'}>Delete Participant</span>
                        <img src={exit} alt={'exitParticipantModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'text-container'}>
                        <h2 className={'title-subheadline'}>Are you sure you want to delete this Participant?</h2>
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
ParticipantModal.propTypes = {
  eventKey: PropTypes.string.isRequired,
  onHide: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  group: PropTypes.string,
  topic: PropTypes.string,
  languageLevel: PropTypes.string
};
export default ParticipantModal;
