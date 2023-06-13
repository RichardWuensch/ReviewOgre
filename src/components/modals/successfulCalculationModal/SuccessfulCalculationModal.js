import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './SuccessfulCalculationModal.css';
import exit from '../../../assets/media/return.svg';
import React from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import upload from '../../../assets/media/upload.svg';
import ReviewWindow from './ReviewWindow';
import Mail from '../../../api/mail/Mail';
import { useRoomSlots } from '../../window/context/RoomSlotContext';

function SuccessfulCalculationsModal (props) {
  const roomSlots = useRoomSlots();

  function runAlgorithm () {
    try {
      if (new Mail(roomSlots).generateMailsForModerators()) {
      // successful Email Calculation
        console.log('Successful Email Calculation');
        props.onHide();
      } else {
      // failed Email Calculation
        console.log('Failed Email Calculation');
        props.onHide();
      }
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
            <Modal.Header style={{ paddingLeft: '20px' }}>
                <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReviewWindow/>
                <div className={'d-flex justify-content-center'}>
                    <Row>
                        <Col>
                            <Button variant={'light'} className="button-mail-export" onClick={runAlgorithm}>
                                <Image src={upload} alt="mailExport" className={'modal-mailExport-icon'}/>
                                Export for Mailing
                            </Button>
                        </Col>
                        <Col>
                            <Button variant={'light'} className="exit-successful-calculation-button" onClick={props.onHide}>
                                <Image src={exit} alt={'exitParticipantModal'} className={'modal-exit-icon'}/>
                                Return to Main
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
  );
}
SuccessfulCalculationsModal.propTypes = {
  onHide: PropTypes.func.isRequired
};
export default SuccessfulCalculationsModal;
