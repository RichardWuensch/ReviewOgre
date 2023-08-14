import React from 'react';
import '../dataImportCheckModal/DataImportCheckModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../media/x-circle.svg';
import { Col, Image, Row } from 'react-bootstrap';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';

function StateExportSaveReviewsModal ({ saveState, onHide, ...props }) {
  return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'modal'}
        >
            <Modal.Header>
                <Modal.Title>Save Reviews</Modal.Title>
                <Image src={exit} alt={'exitModal'} className={'modal-header-icon'} onClick={onHide}/>
            </Modal.Header>
            <Modal.Body>
                <div className={'text-container text-center'}>
                    <div className={'delete-title-subheadline'} style={{ whiteSpace: 'pre-line' }}>
                        Do you want to save the already assigned Reviews and other calculated data in your State?
                        These can be imported again.
                    </div>
                </div>
                <div className={'footer'}>
                    <Row>
                        <Col>
                            <ModalButton
                                backgroundColor={ '#B0D7AF' }
                                onButtonClick={() => { onHide(); saveState(true); }}
                            > Yes </ModalButton>
                        </Col>
                        <Col>
                            <ModalButton
                                backgroundColor={ '#B0D7AF' }
                                onButtonClick={() => { onHide(); saveState(false); }}
                            > No </ModalButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ModalButton
                                backgroundColor={ '#C40233' }
                                onButtonClick={onHide}
                            > Cancel </ModalButton>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
  );
}
StateExportSaveReviewsModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  saveState: PropTypes.func.isRequired
};
export default StateExportSaveReviewsModal;
