import React from 'react';
import './slots_window.css';
import SlotModal from '../modals/addSlotRoomModal';
import add from '../../assets/media/plus-circle.svg';
import PropTypes from 'prop-types';

function SlotsWindow (props) {
  const [modalShowSlot, setModalShowSlot] = React.useState(false);

  return (
      <div className={'slotsWindow'}>
          <h2 className={'title-subheadline'}>Slots</h2>
          <div className={'slots-button-container'}>
              <button className={'button-container-green-slots'} onClick={() => setModalShowSlot(true)}>
                  <img src={add} alt={'addSlotIcon'} height={16} width={16}/>
                  <span className={'button-text'}>Add Slot</span>
              </button>
          </div>
          <div className={'slots-list-container'}>
          </div>
          <div className={'setup-start-container'}>
            <SlotModal
                show={modalShowSlot}
                onHide={() => setModalShowSlot(false)}/>
        </div>
      </div>
  );
}

SlotsWindow.propTypes = {
  listAllSlots: PropTypes.arrayOf(
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.number
  )
};

export default SlotsWindow;
