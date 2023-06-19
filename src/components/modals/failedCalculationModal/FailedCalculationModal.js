import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './FailedCalculationModal.css';
import exit from '../../../assets/media/return.svg';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';

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
                        <div>{props.errorMessage}</div>
                    </div>
                    <div className={'footer'}>
                        <button className={'exit-failed-calculation-button' } onClick={props.onHide}>
                            <Image src={exit} alt={'exitParticipantModal'} className={'modal-exit-icon'}/>
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
