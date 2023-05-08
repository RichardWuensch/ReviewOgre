import React from 'react';
import './MainPage.css';
import './setup_window.css';
import './checkboxstyling.css';
import ParticipantsWindow from './participants_window';
import SlotsWindow from './slots_window';
import logo from '../../assets/media/favicon_ogre.png';
import download from '../../assets/media/download.svg';
import file from '../../assets/media/file-earmark.svg';
import start from '../../assets/media/play-circle.svg';
import Test from '../../algorithm/test/Test';
import StoreConfiguration from '../../api/StoreConfiguration';
import LoadConfiguration from '../../api/LoadConfiguration';
import ImportParticipants from '../../api/ImportParticipants';
import { ParticipantStore } from '../../data/store/ParticipantStore';
import FailedCalculationModal from '../modals/failedCalculationModal';
// import Mail from '../../api/mail/Mail';

function MainPage () {
  const [modalFailedCalculations, setModalFailedCalculations] = React.useState(false);
  const participantstore = ParticipantStore.getSingleton();

  function runAlgorithm () {
    if (new Test().run()) {
      // successful run
    } else {
      setModalFailedCalculations(true);
    }

    // new Mail().generateMailsForModerators();
  }

  return (
        <div className={'main-page'}>
            <div className={'title-box'}>
                <img src={logo} alt={'icon'} height={50} width={50}/>
                <span className={'title-text'}>ReviewOgre Reloaded</span>
            </div>
            <h2 className={'title-subheadline'} style={{ fontWeight: 100, fontSize: '2.5em' }}>Sort your review peers in groups for better Technical Reviews!</h2>
            <span className={'title-subheadline'} style={{ fontWeight: 100 }}>Visit the <a href="url">HowToGuide</a> to learn more about this platform</span>
            <div className={'button-group'}>
                <button className={'button-container-green'}
                        onClick={() => document.getElementById('student-input').click()}>
                    <img src={download} alt={'icon1'} height={16} width={16}/>
                    <span className={'button-text'}>Import Configuration</span>
                </button>
                <input type="file" id="student-input" style={{ display: 'none' }} onChange={importStudentList}
                       accept='text/csv'/>
                <button className={'button-container-green'}
                        onClick={() => document.getElementById('file-input').click()}>
                    <img src={download} alt={'icon2'} height={16} width={16}/>
                    <span className={'button-text'}>Load Configuration</span>
                </button>
                <input type="file" id="file-input" style={{ display: 'none' }} onChange={importConfiguration}
                       accept='application/json'/>
                <button className={'button-container-white'} onClick={saveConfiguration}>
                    <img src={file} alt={'icon3'} height={16} width={16}/>
                    <span className={'button-text'}>Save Configuration</span>
                </button>
            </div>
            <div className={'participant-slots-container'}>
                <ParticipantsWindow participantstore={participantstore}/>
                {/* replace with component */}
                <div className={'slots-setup-container'}>
                    <SlotsWindow/>
                    <div className={'setupWindow'}>
                        <h2 className={'title-subheadline'}>Run Configuration</h2>
                        <div className={'setupContainer'}>
                            <div className={'radio-container'}>
                                <div className={'setupItems'}>
                                    <label className={'switch'}>
                                        <input type="checkbox" onClick={handleNotaryIsAuthorChange}/>
                                        <span className={'slider round'}></span>
                                    </label>
                                    <span style={{ paddingLeft: 10 }}>Notary is Author</span>
                                </div>
                                <div className={'setupItems'}>
                                    <label className={'switch'}>
                                        <input type="checkbox" onClick={handleModeratorNotReviewerChange}/>
                                        <span className={'slider round'}></span>
                                    </label>
                                    <span style={{ paddingLeft: 10 }}>International Groups</span>
                                </div>
                                <div className={'setupItems'} style={{ paddingBottom: '0' }}>
                                    <label className={'switch'}>
                                        <input type="checkbox" onClick={handleABReviewChange}/>
                                        <span className={'slider round'}></span>
                                    </label>
                                    <span style={{ paddingLeft: 10 }}>A/B Review</span>
                                </div>
                            </div>
                            <div className={'start-button-container'}>
                                <button className={'button-start'} onClick={runAlgorithm}>
                                    <img src={start} alt={'startCalculationsIcon'} height={20} width={20}/>
                                    <span className={'button-start-text'}>Start Calculations</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <FailedCalculationModal
                    show={modalFailedCalculations}
                    onHide={() => setModalFailedCalculations(false)}/>

                {/* end */}
            </div>
        </div>
  );
}
function handleNotaryIsAuthorChange () {
  console.log('Notary is Author');
}

function handleModeratorNotReviewerChange () {
  console.log('Moderator not Reviewer');
}

function handleABReviewChange () {
  console.log('A/B Review');
}

function saveConfiguration () {
  new StoreConfiguration().runFileSave();
}

async function importConfiguration (event) {
  await new LoadConfiguration().runConfigurationImport(event);
}

async function importStudentList (event) {
  await new ImportParticipants().runStudentImport(event);
}

// there is no button on the main page for that functionality
// this should happen on the 'success page' later
// function saveRoomPlan () {
//   new SaveRoomPlan().runSave();
// }

export default MainPage;
