import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './FailedCalculationModal.css';
import exit from '../../../assets/media/return.svg';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

function FailedCalculationsModal (props) {
  const [showModal, setShowModal] = useState(true);
  const [header, setHeader] = useState('');

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!props.errorMessage) {
      return;
    }
    switch (props.errorMessage.cause) {
      case 'noSolution':
        setHeader('No Solution found');
        break;
      case 'prechecksFailed':
        setHeader('Prechecks failed');
        break;
      default:
        setHeader('');
    }
  }, [props.errorMessage]);

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
            <span className={'modal-header border-0'}>{header}</span>
          </div>
          <div className={'response-container'}>
            <div className={'error-message'}>{props.errorMessage?.message}</div>
          </div>
          <div className={'footer'}>
            <button
              className={'exit-failed-calculation-button'}
              onClick={props.onHide}
            >
              <Image
                src={exit}
                alt={'exitParticipantModal'}
                className={'modal-exit-icon'}
              />
              <span className={'return-to-main-text'}>
                Return to Configuration
              </span>
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
