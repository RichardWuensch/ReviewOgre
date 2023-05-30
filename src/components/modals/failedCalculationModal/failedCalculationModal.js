import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './failedCalculationModal.css';
import exit from '../../../assets/media/return.svg';
import React, { useState } from 'react';

function FailedCalculationsModal (props) {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
        <Modal
            onExit={handleClose}
            show={showModal}
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={'modal-container'}>
                    <div className={'modal-header-container'}>
                        <span className={'modal-header border-0'}>
                            Oops... something went wrong</span>
                    </div>
                    <div className={'response-container'}>
                        <div>Could not calculate a solution!</div>
                        <div>This is because of the following error:</div>
                    </div>
                    <div className={'footer'}>
                        <button className={'exit-failed-calculation-button' } onClick={props.onHide}>
                            <img src={exit} alt={'exitParticipantModal'} className={'modal-exit-icon'} style={{ color: '#82868B', height: 20, width: 20, paddingRight: 2 }}/>
                            <span className={'return-to-main-text'}>Return to Configuration</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
FailedCalculationsModal.propTypes = {
  onHide: PropTypes.func.isRequired
};
export default FailedCalculationsModal;
