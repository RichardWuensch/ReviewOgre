import React from 'react';
import './DataImportCheckModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../assets/media/x-circle.svg';
import { Col, Image, Row } from 'react-bootstrap';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';

function DataImportCheckModal ({ onAddData, onOverwriteData, title, text, onHide, ...props }) {
  return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'modal'}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <Image src={exit} alt={'exitModal'} className={'modal-header-icon'} onClick={onHide}/>
            </Modal.Header>
            <Modal.Body>
                <div className={'text-container text-center'}>
                    <div className={'delete-title-subheadline'} style={{ whiteSpace: 'pre-line' }}>
                        Do you want to overwrite the already existing { text } in your list
                        <br/>or<br/>add the imported { text } to the list?
                    </div>
                </div>
                <div className={'footer'}>
                    <Row>
                        <Col>
                            <ModalButton
                                backgroundColor={ '#B0D7AF' }
                                onButtonClick={() => { onOverwriteData(); onHide(); }}
                            > Overwrite </ModalButton>
                        </Col>
                        <Col>
                            <ModalButton
                                backgroundColor={ '#B0D7AF' }
                                onButtonClick={() => { onAddData(); onHide(); }}
                            > Add </ModalButton>
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
DataImportCheckModal.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  onOverwriteData: PropTypes.func.isRequired,
  onAddData: PropTypes.func.isRequired
};
export default DataImportCheckModal;
