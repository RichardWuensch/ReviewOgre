import React from 'react';
import './MainPage.css';
import './participants_window.css';
import './setup_window.css';
import './slotsWindow.css';
import SlotModal from '../modals/addSlotRoomModal';
import ParticipantModal from '../modals/addParticipantModal';
import logo from '../../assets/media/favicon_ogre.png';
import download from '../../assets/media/download.svg';
import file from '../../assets/media/file-earmark.svg';
import add from '../../assets/media/plus-circle.svg';
import edit from '../../assets/media/pencil-square.svg';
import start from '../../assets/media/play-circle.svg';
// import Algorithm from '../../algorithm/logic/Algorithm';
// import OldTestData from '../../algorithm/test/OldTestData';
// import SmallTestData from '../../algorithm/test/SmallTestData';
import Test from '../../algorithm/test/Test';

function MainPage () {
  const [modalShowSlot, setModalShowSlot] = React.useState(false);
  const [modalShowParticipant, setModalShowParticipant] = React.useState(false);
  return (
        <div className={'main-page'}>
            <div className={'title-box'}>
                <img src={logo} alt={'icon'} height={50} width={50}/>
                <span className={'title-text'}>ReviewOgre Reloaded</span>
            </div>
            <h2 className={'title-subheadline'}>Sort your review peers in groups for better Technical Reviews!</h2>
            <span className={'title-subheadline'} style={{ fontSize: 10 }}>Visit the <a href="url">HowToGuide</a> to learn more about this platform</span>
            <div className={'button-group'}>
                <button className={'button-container-green'}>
                    <img src={download} alt={'icon1'} height={12} width={12}/>
                    <span className={'button-text'}>Import Configuration</span>
                </button>
                <button className={'button-container-green'}>
                    <img src={download} alt={'icon2'} height={12} width={12}/>
                    <span className={'button-text'}>Load Configuration</span>
                </button>
                <button className={'button-container-white'}>
                    <img src={file} alt={'icon3'} height={12} width={12}/>
                    <span className={'button-text'}>Save Configuration</span>
                </button>
            </div>
            <div className={'participant-slots-container'}>
                {/* replace with component */}
                <div className={'participantWindow'}>
                    <span className={'title-subheadline'} style={{ fontSize: 10 }}>Participants</span>
                    <div className={'participant-button-container'}>
                        <button className={'button-container-green-participants'} onClick={() => setModalShowParticipant(true)}>
                            <img src={add} alt={'addParticipantIcon'} height={12} width={12}/>
                            <span className={'button-text'}>Add Participant</span>
                        </button>
                        <button className={'button-container-green-participants'}>
                            <img src={edit} alt={'editListIcon'} height={12} width={12}/>
                            <span className={'button-text'}>Edit List</span>
                        </button>
                    </div>
                    <div className={'list-description'}>
                        <span>First Name</span>
                        <span>Last Name</span>
                        <span>Email Address</span>
                        <span>Group</span>
                        <span>Options</span>
                    </div>
                    <div className={'participant-list-container'}>
                    </div>
                </div>
                {/* end */}
                {/* replace with component */}
                <div className={'slotsWindow'}>
                    <span className={'title-subheadline'} style={{ fontSize: 10 }}>Slots</span>
                    <div className={'slots-button-container'}>
                        <button className={'button-container-green-slots'} onClick={() => setModalShowSlot(true)}>
                            <img src={add} alt={'addSlotIcon'} height={12} width={12}/>
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
                    <span className={'title-subheadline'} style={{ fontSize: 10 }}>Setup</span>
                    <div className={'setupContainer'}></div>
                </div>
                {/* end */}
                    <SlotModal
                        show={modalShowSlot}
                        onHide={() => setModalShowSlot(false)}/>
                    <ParticipantModal
                        show={modalShowParticipant}
                        onHide={() => setModalShowParticipant(false)}/>
                <button className={'button-start'} onClick={runAlgorithm}>
                    <img src={start} alt={'startCalculationsIcon'} height={20} width={20} />
                    <span className={'button-start-text'}>Start Calculations</span>
                </button>
            </div>
        </div>
  );
}
function runAlgorithm () {
  new Test().run();
}

export default MainPage;
