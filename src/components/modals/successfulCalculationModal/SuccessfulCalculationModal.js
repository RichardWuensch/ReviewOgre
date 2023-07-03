import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './SuccessfulCalculationModal.css';
import exit from '../../../assets/media/x-circle.svg';
import React from 'react';
import mail from '../../../assets/media/envelope-at.svg';
import { Col, Image, Row } from 'react-bootstrap';
import upload from '../../../assets/media/upload.svg';
import download from '../../../assets/media/download.svg';
import ReviewWindow from './ReviewWindow';
import Mail from '../../../api/mail/Mail';
import StoreResult from '../../../api/StoreResult';
import SaveRoomPlan from '../../../api/SaveRoomPlan';
import RevagerLiteExport from '../../../api/RevagerLiteExport';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';

function SuccessfulCalculationsModal (props) {
  const roomSlots = useRoomSlots();

  return (
    <Modal
      onExit={props.onHide}
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={'modal'}
    >
      <Image
        src={exit}
        alt={'exitParticipantModal'}
        className={'exit-icon'}
        onClick={props.onHide}
      />
      <Modal.Header style={{ paddingLeft: '20px' }}>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReviewWindow />
          <Row className={'button-container'}>
            <Col className="similar-buttons-container">
              Mail Operations
              <ModalButton
                backgroundColor={'#B0D7AF'}
                onButtonClick={() => new Mail(roomSlots).openMailClient()}
              >
                <Image
                  src={mail}
                  alt="openInMailClient"
                  className={'button-icon'}
                />
                Open in Mailclient
              </ModalButton>
              <ModalButton
                backgroundColor={'#B0D7AF'}
                onButtonClick={() => new Mail(roomSlots).saveMailsInTxt()}
              >
                <Image
                  src={upload}
                  alt="mailExport"
                  className={'button-icon'}
                />
                Export Mail list
              </ModalButton>
            </Col>
            <Col className="similar-buttons-container">
              Export Result
              <ModalButton
                backgroundColor={'#B0D7AF'}
                onButtonClick={() => new StoreResult().saveAsTXT(roomSlots)}
              >
                <Image
                  src={upload}
                  alt="exportResult"
                  className={'button-icon'}
                />
                Result as txt
              </ModalButton>
              <ModalButton
                backgroundColor={'#B0D7AF'}
                onButtonClick={() => new StoreResult().saveAsJSON(roomSlots)}
              >
                <Image
                  src={upload}
                  alt="exportResult"
                  className={'button-icon'}
                />
                Result as JSON
              </ModalButton>
            </Col>
            <Col className="similar-buttons-container">
              Room Plan
              <ModalButton
                backgroundColor={'#B0D7AF'}
                onButtonClick={() => new SaveRoomPlan(roomSlots).runSave()}
              >
                <Image
                  src={download}
                  alt="exportResult"
                  className={'button-icon'}
                />
                Download pdf
              </ModalButton>
            </Col>
            <Col className="similar-buttons-container">
              Revager lite
              <ModalButton
                backgroundColor={'#B0D7AF'}
                onButtonClick={() =>
                  new RevagerLiteExport().buildZipWithAllRevagerLiteFiles(roomSlots)
                }
              >
                <Image
                  src={upload}
                  alt="exportResult"
                  className={'button-icon'}
                />
                Export reviews
              </ModalButton>
            </Col>
          </Row>
      </Modal.Body>
    </Modal>
  );
}
SuccessfulCalculationsModal.propTypes = {
  onHide: PropTypes.func.isRequired
};
export default SuccessfulCalculationsModal;
