import React from 'react';
import './DataImportCheckModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../assets/media/x-circle.svg';
import { Button, Col, Image, Row } from 'react-bootstrap';

function DataImportCheckModal (props) {
  const handleAddData = () => {
    props.adddata();
  };
  const handleOverwriteData = () => {
    props.overwritedata();
  };

  return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'modal'}
        >
            <Modal.Header>
                <Modal.Title>{props.titleObject}</Modal.Title>
                <Image src={exit} alt={'exitModal'} className={'modal-header-icon'} onClick={props.onHide}/>
            </Modal.Header>
            <Modal.Body>
                <div className={'text-container text-center'}>
                    <div className={'delete-title-subheadline'} style={{ whiteSpace: 'pre-line' }}>
                        Do you want to overwrite the already existing {props.textobject} in your list<br/>or<br/>add the imported {props.textobject} to the list?
                    </div>
                </div>
                <div className={'footer'}>
                    <Row className={'row'}>
                        <Col className={'col'}>
                            <Button
                                variant={'light'}
                                style={{ backgroundColor: '#B0D7AF', color: 'black' }}
                                className={'confirm-button'}
                                onClick={() => { handleOverwriteData(); props.onHide(); }}>
                                Overwrite
                            </Button>
                        </Col>
                        <Col className={'col'}>
                            <Button
                                variant={'light'}
                                style={{ backgroundColor: '#B0D7AF', color: 'black' }}
                                className={'confirm-button'}
                                onClick={() => { handleAddData(); props.onHide(); }}>
                                Add
                            </Button>
                        </Col>
                    </Row>
                    <Row className={'row'}>
                        <Col className={'col'}>
                            <Button
                                variant={'light'}
                                style={{ backgroundColor: '#C40233' }}
                                className={'cancel-button'}
                                onClick={props.onHide}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
  );
}
DataImportCheckModal.propTypes = {
  textObject: PropTypes.string,
  titleObject: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  overwritedata: PropTypes.func.isRequired,
  adddata: PropTypes.func.isRequired
};
export default DataImportCheckModal;
