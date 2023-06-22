import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './SuccessfulCalculationModal.css';
import exit from '../../../assets/media/x-circle.svg';
import React from 'react';
import mail from '../../../assets/media/envelope-at.svg';
import download from '../../../assets/media/download.svg';
import { Button, Col, Image, Row } from 'react-bootstrap';
import upload from '../../../assets/media/upload.svg';
import ReviewWindow from './ReviewWindow';
import Mail from '../../../api/mail/Mail';
import StoreResult from '../../../api/StoreResult';
import SaveRoomPlan from '../../../api/SaveRoomPlan';
import RevagerLiteExport from '../../../api/RevagerLiteExport';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';

function SuccessfulCalculationsModal (props) {
  const roomSlots = useRoomSlots();

  function runAlgorithm () {
    try {
      new Mail(roomSlots).generateMailsForModerators();
      props.onHide();
    } catch (error) {
      console.log(error.message);
    }
  }

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
        <div className={'d-flex justify-content-center'}>
          <Row>
            <Col>
              <ModalButton
                  backgroundColor={'#B0D7AF'}
                  onButtonClick={runAlgorithm}>
                <Image
                    style={{ marginRight: '10px' }}
                    src={upload}
                    alt="mailExport"
                    className={'modal-mailExport-icon'}
                />
                Export for Mailing
              </ModalButton>
            </Col>
            <Col>
              <ModalButton
                  backgroundColor={'#B0D7AF'}
                  onButtonClick={props.onHide}>
                <Image
                    style={{ marginRight: '10px' }}
                    src={exit}
                    alt={'exitParticipantModal'}
                    className={'modal-exit-icon'}
                />
                Return to Main
              </ModalButton>
            </Col>
          </Row>
        <div className={'button-container'}>
          <div className="similar-buttons-container">
            Mail Operations
            <Button
              variant={'light'}
              className="button"
              onClick={() => new Mail(roomSlots).openMailClient()}
            >
              <Image
                src={mail}
                alt="openInMailClient"
                className={'modal-mailExport-icon'}
              />
              Open in Mailclient
            </Button>
            <Button
              variant={'light'}
              className="button"
              onClick={() => new Mail(roomSlots).saveMailsInTxt()}
            >
              <Image
                src={download}
                alt="mailExport"
                className={'modal-mailExport-icon'}
              />
              Export Mail list
            </Button>
          </div>
          <div className="similar-buttons-container">
            Export Result
            <Button
              className="button"
              variant="light"
              type="button"
              onClick={() => new StoreResult().saveAsTXT(roomSlots)}
            >
              <Image
                src={download}
                alt="exportResult"
                className={'modal-mailExport-icon'}
              />
              Result as txt
            </Button>
            <Button
              onClick={() => new StoreResult().saveAsJSON(roomSlots)}
              variant="light"
              className="button"
            >
              <Image
                src={download}
                alt="exportResult"
                className={'modal-mailExport-icon'}
              />
              Result as JSON
            </Button>
          </div>
          <div className="similar-buttons-container">
            <Button
              onClick={() => new SaveRoomPlan(roomSlots).runSave()}
              variant="light"
              className="button"
            >
              <Image
                src={download}
                alt="exportResult"
                className={'modal-mailExport-icon'}
              />
              Room Plan
            </Button>
          </div>
          <div className="similar-buttons-container">
            <Button
              onClick={() =>
                new RevagerLiteExport().buildJSONAllReviews(roomSlots)
              }
              variant="light"
              className="button"
            >
              <Image
                src={download}
                alt="exportResult"
                className={'modal-mailExport-icon'}
              />
              Export Revager Lite file
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
