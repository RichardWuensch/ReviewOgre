import './DeleteModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../../assets/media/x-circle.svg';
import PropTypes from 'prop-types';
import ParticipantModal from '../participantModals/addEditModal/ParticipantModal';
import { Button, Col, Image, Row } from 'react-bootstrap';

function deleteModal (props) {
  const deleteItem = () => {
    props.onDeleteClick(props.deleteobject);
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
                <Modal.Title>{'Delete ' + props.titleObject}</Modal.Title>
                <Image src={exit} alt={'exitModal'} className={'modal-header-icon'} onClick={props.onHide}/>
            </Modal.Header>
            <Modal.Body>
                <div className={'text-container text-center'}>
                    <div className={'delete-title-subheadline'}>
                        Are you sure you want to delete {props.textobject}? <br/>
                        This Action can&lsquo;t be undone.
                    </div>
                </div>
                <div className={'footer'}>
                    <Row>
                        <Col>
                            <Button
                                variant={'light'}
                                style={{ backgroundColor: '#C40233' }}
                                className={'confirm-button'}
                                onClick={() => { deleteItem(); props.onHide(); }}>
                                Confirm
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant={'light'}
                                style={{ backgroundColor: '#B0D7AF', color: 'black' }}
                                className={'confirm-button'}
                                onClick={props.onHide}>
                                Abort
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
  );
}
ParticipantModal.propTypes = {
  textObject: PropTypes.string,
  titleObject: PropTypes.string,
  onClose: PropTypes.func,
  onDeleteClick: PropTypes.func
};
export default deleteModal;
