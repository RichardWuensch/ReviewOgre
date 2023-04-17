import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import '../window/SlotModal.css';
import exit from '../../../src/assets/media/x-circle.svg';
import add from '../../assets/media/plus-circle.svg';

function SlotModal (props) {
  return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={'modal-container'}>
                    <div className={'modal-header-container'}>
                        <h2 className={'modal-header'}>New Time Slot</h2>
                        <img src={exit} alt={'exitSlotModal'} className={'modal-header-icon'} onClick={props.onHide}/>
                    </div>
                    <div className={'date-container'}>
                        <input type={'date'} className={'input-date-container'}/>
                    </div>
                    <div className={'time-container'}>
                        <span>From:</span>
                        <input className={'input-time-container'}/>
                        <span>To:</span>
                        <input className={'input-time-container'}/>
                    </div>
                    <div className={'room-container'}>
                        <span>Create Rooms for this Time Slot:</span>
                        <div>
                            <button className={'add-room-button'}>
                                <img src={add} alt={'addRoomIcon'}/>
                            </button>
                        </div>
                    </div>
                    <div className={'footer'}>
                        <button className={'add-slot-button'}>
                            <span className={'add-slot-text'}>Add Slot</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
SlotModal.propTypes = {
  onHide: PropTypes.string
};
export default SlotModal;
