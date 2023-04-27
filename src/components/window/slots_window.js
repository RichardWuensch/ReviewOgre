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
              <div className={'hierarchy'}>
                  <div className='foldercontainer'>
                      <span className='folder' data-isexpanded='true'>Folder 1</span>
                      <span className='file'>File 11</span>
                      <span className='file'>File 12</span>
                      <span className='file'>File 13</span>
                  </div>

                  <div className='foldercontainer'>
                      <span className='folder' data-isexpanded='true'>Folder 2</span>
                      <span className='file'>File 21</span>
                      <span className='file'>File 22</span>
                      <span className='file'>File 23</span>
                  </div>

                  <div className='foldercontainer'>
                      <span className='folder' data-isexpanded='true'>Folder 3</span>
                      <span className='file'>File 31</span>
                      <span className='file'>File 32</span>
                      <span className='file'>File 33</span>
                  </div>
              </div>
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
