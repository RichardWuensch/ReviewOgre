import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './SuccessfulCalculationModal.css';
import exit from '../../../assets/media/return.svg';
import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import upload from '../../../assets/media/upload.svg';
import ReviewWindow from './ReviewWindow';

function SuccessfulCalculationsModal (props) {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  function runAlgorithm () {
    try {
      // Mail export
      props.onHide();
    } catch (error) {
      console.log(error.message);
    }
  }

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
                            Success!</span>
                    </div>
                    <div className={'reviews-table-container'}>
                        <ReviewWindow/>
                    </div>
                    <div className={'footer'}>
                        <div className={'mail-export-button-container'}>
                            <Button variant={'light'} className="button-mail-export" onClick={runAlgorithm}>
                                <Image src={upload} alt="mailExport" className={'modal-mailExport-icon'}/>
                                <span className="button-text">Export As Mailing List</span>
                            </Button>
                        </div>
                        <div className={'exit-button-container'}>
                            <Button variant={'light'} className="exit-successful-calculation-button" onClick={props.onHide}>
                                <Image src={exit} alt={'exitParticipantModal'} className={'modal-exit-icon'}/>
                                <span className={'button-text'}>Return to Configuration</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
SuccessfulCalculationsModal.propTypes = {
  onHide: PropTypes.func.isRequired
};
export default SuccessfulCalculationsModal;
