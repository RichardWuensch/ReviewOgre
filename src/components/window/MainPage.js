import React from 'react';
import './MainPage.css';
import './setup_window.css';
import './slotsWindow.css';
import './checkboxstyling.css';
import ParticipantsWindow from './participants_window';
import SlotModal from '../modals/addSlotRoomModal';
import logo from '../../assets/media/favicon_ogre.png';
import download from '../../assets/media/download.svg';
import file from '../../assets/media/file-earmark.svg';
import add from '../../assets/media/plus-circle.svg';
import start from '../../assets/media/play-circle.svg';
import Test from '../../algorithm/test/Test';
import StoreConfiguration from '../../api/StoreConfiguration';
import LoadConfiguration from '../../api/LoadConfiguration';
import SmallTestDataUpdated from '../../algorithm/test/SmallTestDataUpdated';
import ImportParticipants from '../../api/ImportParticipants';
import Configuration from '../../api/model/Configuration';
import PropTypes from 'prop-types';

function MainPage (props) {
  const [modalShowSlot, setModalShowSlot] = React.useState(false);

  return (
        <div className={'main-page'}>
            <div className={'title-box'}>
                <img src={logo} alt={'icon'} height={50} width={50}/>
                <span className={'title-text'}>ReviewOgre Reloaded</span>
            </div>
            <h2 className={'title-subheadline'}>Sort your review peers in groups for better Technical Reviews!</h2>
            <span className={'title-subheadline'} style={{ fontSize: 12 }}>Visit the <a href="url">HowToGuide</a> to learn more about this platform</span>
            <div className={'button-group'}>
                <button className={'button-container-green'} onClick={() => document.getElementById('student-input').click()}>
                    <img src={download} alt={'icon1'} height={16} width={16}/>
                    <span className={'button-text'}>Import Configuration</span>
                </button>
                <input type="file" id="student-input" style={{ display: 'none' }} onChange={importStudentList} accept='text/csv'/>
                <button className={'button-container-green'} onClick={() => document.getElementById('file-input').click()}>
                    <img src={download} alt={'icon2'} height={16} width={16}/>
                    <span className={'button-text'}>Load Configuration</span>
                </button>
                <input type="file" id="file-input" style={{ display: 'none' }} onChange={importConfiguration} accept='application/json'/>
                <button className={'button-container-white'} onClick={saveConfiguration}>
                    <img src={file} alt={'icon3'} height={16} width={16}/>
                    <span className={'button-text'}>Save Configuration</span>
                </button>
            </div>
            <div className={'participant-slots-container'}>
                <ParticipantsWindow listAllParticipants={props.listAllParticipants}/>
                {/* replace with component */}
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
                </div>
                {/* end */}
            </div>
            <div className={'setup-start-container'}>
                {/* replace with component */}
                <div className={'setupWindow'}>
                    <h2 className={'title-subheadline'}>Setup</h2>
                    <div className={'setupContainer'}></div>
                </div>
                {/* end */}
                    <SlotModal
                        show={modalShowSlot}
                        onHide={() => setModalShowSlot(false)}/>
                <button className={'button-start'} onClick={runAlgorithm}>
                    <img src={start} alt={'startCalculationsIcon'} height={20} width={20} />
                    <span className={'button-start-text'}>Start Calculations</span>
                </button>
            </div>
        </div>
  );
}

let configuration = new Configuration();

function saveConfiguration () {
  new StoreConfiguration(configuration).runFileSave();
}

async function importConfiguration (event) {
  configuration = await new LoadConfiguration().runConfigurationImport(event);
}

async function importStudentList (event) {
  const participants = await new ImportParticipants().runStudentImport(event);
  configuration.setParticipants(participants);
}

function runAlgorithm () {
  if (configuration.getParticipants().length === 0 ||
    configuration.getRoomSlots().length === 0) {
    console.log('Running algorithm with test configuration');
    new Test().run(new SmallTestDataUpdated());
  } else {
    new Test().run(configuration);
  }
}

MainPage.propTypes = {
  listAllParticipants: PropTypes.arrayOf(
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.number
  )
};

export default MainPage;
