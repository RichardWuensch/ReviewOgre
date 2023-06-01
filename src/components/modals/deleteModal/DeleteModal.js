import './DeleteModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../../assets/media/x-circle.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ParticipantModal from '../participantModals/addEditModal/ParticipantModal';

function deleteModal (props) {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  const deleteItem = () => {
    props.onDeleteClick(props.deleteobject);
    handleClose();
  };

  return (
        <Modal
            onExit={handleClose}
            show={showModal}
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={'modal-container'}>
                    <div className={'modal-header-container'}>
                        <span className={'modal-header border-0'}> {'Delete' + props.titleObject}</span>
                        <img src={exit} alt={'exitModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'text-container'}>
                        <h2 className={'delete-title-subheadline'}>Are you sure you want to delete {props.textobject}?</h2>
                        <span className={'delete-title-subheadline'}>This Action can&lsquo;t be undone.</span>
                    </div>
                    <div className={'footer'}>
                        <button className={'confirm-button'} onClick= {() => {
                          deleteItem();
                          props.onHide();
                        }}>
                            <span className={'confirm-text'}>Confirm</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
ParticipantModal.propTypes = {
  textObject: PropTypes.string.isRequired,
  titleObject: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};
export default deleteModal;
