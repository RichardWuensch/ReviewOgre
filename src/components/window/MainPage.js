import React from 'react';
import './MainPage.css';
import './participants_window.css';
import './setup_window.css';
import './slotsWindow.css';
import './checkboxstyling.css';
import SlotModal from '../modals/addSlotRoomModal';
import ParticipantModal from '../modals/addParticipantModal';
import logo from '../../assets/media/favicon_ogre.png';
import deleteButton from '../../assets/media/trash.svg';
import download from '../../assets/media/download.svg';
import file from '../../assets/media/file-earmark.svg';
import add from '../../assets/media/plus-circle.svg';
import edit from '../../assets/media/pencil-square.svg';
import start from '../../assets/media/play-circle.svg';
import exit from '../../assets/media/x-circle.svg';
// import Algorithm from '../../algorithm/logic/Algorithm';
// import OldTestData from '../../algorithm/test/OldTestData';
// import SmallTestData from '../../algorithm/test/SmallTestData';
import Test from '../../algorithm/test/Test';
import PropTypes from 'prop-types';

function MainPage (props) {
  const [modalShowSlot, setModalShowSlot] = React.useState(false);
  const [modalShowParticipant, setModalShowParticipant] = React.useState(false);
  const [isEditModeActive, setIsEditModeActive] = React.useState(false);
  const [selectedParticipants, setSelectedParticipants] = React.useState([]);
  const [allParticipantsSelected, setAllParticipantsSelected] = React.useState(false);
  const listParticipants = props.listAllParticipants.map(entry =>
    <tr key={entry.id}>
        {isEditModeActive && (
            <td>
                <label className={'checkboxContainer'}>
                    <input
                        type="checkbox"
                           checked={allParticipantsSelected || selectedParticipants.includes(entry)}
                           onChange={event => {
                             const isChecked = event.target.checked;
                             setSelectedParticipants(prevSelectedParticipants => {
                               if (isChecked) {
                                 return [...prevSelectedParticipants, entry];
                               } else {
                                 return prevSelectedParticipants.filter(p => p !== entry);
                               }
                             });
                           }}
                    />
                        <span className={'checkmark'}></span>
                </label>
            </td>
        )}
        <td className={'column-firstName'}>{entry.firstName}</td>
        <td className={'column-lastName'}>{entry.lastName}</td>
        <td className={'column-email'}>
            <button className={'button-email'}>{entry.email}</button>
        </td>
        <td className={'column-group'}>{entry.group}</td>
        <td className={'column-topic'}>{entry.topic}</td>
        <td className={'column-languageLevel'}>{entry.languageLevel}</td>
        <td className={'column-options'}>
            <div className={'column-options-buttons'}>
                <button className={'button-options-edit'}>
                    <img src={edit} alt={'icon'}/>
                </button>
                <button className={'button-options-delete'}>
                    <img src={deleteButton} alt={'icon'}/>
                </button>
            </div>
        </td>
    </tr>
  );

  return (
        <div className={'main-page'}>
            <div className={'title-box'}>
                <img src={logo} alt={'icon'} height={50} width={50}/>
                <span className={'title-text'}>ReviewOgre Reloaded</span>
            </div>
            <h2 className={'title-subheadline'}>Sort your review peers in groups for better Technical Reviews!</h2>
            <span className={'title-subheadline'} style={{ fontSize: 12 }}>Visit the <a href="url">HowToGuide</a> to learn more about this platform</span>
            <div className={'button-group'}>
                <button className={'button-container-green'}>
                    <img src={download} alt={'icon1'} height={16} width={16}/>
                    <span className={'button-text'}>Import Configuration</span>
                </button>
                <button className={'button-container-green'}>
                    <img src={download} alt={'icon2'} height={16} width={16}/>
                    <span className={'button-text'}>Load Configuration</span>
                </button>
                <button className={'button-container-white'}>
                    <img src={file} alt={'icon3'} height={16} width={16}/>
                    <span className={'button-text'}>Save Configuration</span>
                </button>
            </div>
            <div className={'participant-slots-container'}>
                {/* replace with component */}
                <div className={'participantWindow'}>
                    <h2 className={'title-subheadline'} >Participants</h2>
                    <div className={'participant-button-container'}>
                        {!isEditModeActive
                          ? (
                                <button className={'button-container-green-participants'} onClick={() => setModalShowParticipant(true)}>
                                    <img src={add} alt={'addParticipantIcon'} height={16} width={16}/>
                                    <span className={'button-text'}>Add Participant</span>
                                </button>
                            )
                          : (
                                <button className={'button-container-green-participants'}>
                                    <img src={edit} alt={'editListIcon'} height={16} width={16}/>
                                    <span className={'button-text'}>Edit Selected</span>
                                </button>
                            )}
                        {isEditModeActive && (
                            <button className={'button-container-green-participants'} style={ { background: '#C40233' } }>
                                <img src={deleteButton} alt={'icon'} height={16} width={16}/>
                                <span className={'button-text'} style={{ color: '#F5F5F5' }}>Delete Selected</span>
                            </button>
                        )

                        }
                        {!isEditModeActive
                          ? (
                            <button className={'button-container-green-participants'} onClick={() => setIsEditModeActive(true)}>
                                <img src={edit} alt={'editListIcon'} height={16} width={16}/>
                                <span className={'button-text'}>Edit List</span>
                            </button>
                            )
                          : (
                            <button className={'button-container-green-participants'} onClick={() => setIsEditModeActive(false)}>
                                <img src={exit} alt={'icon'} height={16} width={16}/>
                                <span className={'button-text'}>Cancel</span>
                            </button>
                            )}
                    </div>
                    <div className={'list-description'}>
                        <table className={'participant-table'}>
                            <tr>
                                {isEditModeActive && (
                                    <td>
                                        <label className={'checkboxContainer'}>
                                            <input type="checkbox" onClick={() => setAllParticipantsSelected(prev => !prev)}/>
                                            <span className={'checkmark'}></span>
                                        </label>
                                    </td>
                                )}
                              <td className={'column-firstName'}>First Name</td>
                              <td className={'column-lastName'}>Last Name</td>
                              <td className={'column-email-header'}>Email Address</td>
                              <td className={'column-group'}>Group</td>
                              <td className={'column-topic'}>Topic</td>
                              <td className={'column-languageLevel'}>German Skill Level</td>
                              <td className={'column-options'}>Options</td>
                            </tr>
                        </table>
                    </div>
                    <div className={'participant-list-container'}>
                        <table className={'participant-table'}>
                            {listParticipants}
                        </table>
                    </div>
                </div>
                {/* end */}
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
