/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './ErrorModal.css';
import exit from '../../../media/return.svg';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';

function ErrorModal ({ errorObject, modalHeader, onHide, ...props }) {
  const [showModal, setShowModal] = useState(true);
  const [header, setHeader] = useState('');

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!errorObject) {
      return;
    }
    if (modalHeader) {
      setHeader(modalHeader);
      return;
    }
    switch (errorObject.cause) {
      case 'noSolution':
        setHeader('No Solution found');
        break;
      case 'prechecksFailed':
        setHeader('Prechecks failed');
        break;
      default:
        setHeader('');
    }
  }, [errorObject]);

  return (
    <Modal
      onExit={handleClose}
      show={showModal}
      {...props}
      size="l"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className={'modal-container'}>
          <div className={'modal-header-container'}>
            <span className={'modal-header border-0'}>{header}</span>
          </div>
          <div className={'response-container'}>
            <div className={'error-message'}>{errorObject?.message}</div>
          </div>
          <div className={'footer'}>
            <ModalButton
                backgroundColor={'#B0D7AF'}
                onButtonClick={onHide}>
              <Image
                  src={exit}
                  alt={'exitParticipantModal'}
                  className={'modal-exit-icon'}
              />
              <span className={'return-to-main-text'}> Return to Configuration </span>
            </ModalButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
ErrorModal.propTypes = {
  errorObject: PropTypes.object,
  modalHeader: PropTypes.string,
  onHide: PropTypes.func.isRequired
};
export default ErrorModal;
