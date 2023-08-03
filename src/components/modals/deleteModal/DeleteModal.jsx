import './DeleteModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../../assets/media/x-circle.svg';
import PropTypes from 'prop-types';
import ParticipantModal from '../participantModals/addEditModal/ParticipantModal';
import { Col, Image, Row } from 'react-bootstrap';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';

function deleteModal ({ onDeleteClick, deleteObject, titleObject, textObject, onHide, ...props }) {
  const deleteItem = () => {
    onDeleteClick(deleteObject);
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
                <Modal.Title>{'Delete ' + titleObject}</Modal.Title>
                <Image src={exit} alt={'exitModal'} className={'modal-header-icon'} onClick={onHide}/>
            </Modal.Header>
            <Modal.Body>
                <div className={'text-container text-center'}>
                    <div className={'delete-title-subheadline'} style={{ whiteSpace: 'pre-line' }}>
                        Are you sure you want to delete {textObject} <br/><br/>
                        This Action can&lsquo;t be undone.
                    </div>
                </div>
                <div className={'footer'}>
                    <Row>
                        <Col>
                            <ModalButton
                                backgroundColor={'#B0D7AF'}
                                onButtonClick={onHide}
                            > Abort </ModalButton>
                        </Col>
                        <Col>
                            <ModalButton
                                backgroundColor={'#C40233'}
                                onButtonClick={() => { deleteItem(); onHide(); }}
                            > Confirm </ModalButton>
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
  onClose: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func,
  deleteObject: PropTypes.object
};
export default deleteModal;
