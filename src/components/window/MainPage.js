import React from 'react';
import './MainPage.css';
import './participants_window.css';
import './setup_window.css';
import './slotsWindow.css';
import SlotModal from '../modals/addSlotRoomModal';
import ParticipantModal from '../modals/addParticipantModal';
import ParticipantDeleteModal from '../modals/deleteParticipantModal';
import logo from '../../assets/media/favicon_ogre.png';
import deleteButton from '../../assets/media/trash.svg';
import download from '../../assets/media/download.svg';
import file from '../../assets/media/file-earmark.svg';
import add from '../../assets/media/plus-circle.svg';
import edit from '../../assets/media/pencil-square.svg';
import start from '../../assets/media/play-circle.svg';
import Test from '../../algorithm/test/Test';
import StoreConfiguration from '../../api/StoreConfiguration';
import PropTypes from 'prop-types';

function MainPage (props) {
  const [modalShowSlot, setModalShowSlot] = React.useState(false);
  const [modalShowParticipant, setModalShowParticipant] = React.useState(false);
  const [propsShowParticipant, setPropsShowParticipant] = React.useState([]);
  const [modalDeleteParticipant, setModalDeleteParticipant] = React.useState(false);

  function handleShowParticipant (modalSet, propsSet) {
    setModalShowParticipant(modalSet);
    setPropsShowParticipant(propsSet);
  }

  const listParticipants = props.listAllParticipants.map(entry =>
    <tr key={entry.id}>
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
                <button className={'button-options-edit'} onClick={() =>
                  handleShowParticipant(true, [entry.firstName,
                    entry.lastName,
                    entry.email,
                    entry.group,
                    entry.topic,
                    entry.languageLevel])
                }>
                    <img src={edit} alt={'icon'}/>
                </button>
                <button className={'button-options-delete'} onClick={() => setModalDeleteParticipant(true)}>
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
                <button className={'button-container-white'} onClick={saveConfiguration}>
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
                        <table className={'participant-table'}>
                            <tr>
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
                        onHide={() => setModalShowParticipant(false)}
                        props={propsShowParticipant}/>
                    <ParticipantDeleteModal
                        show={modalDeleteParticipant}
                        onHide={() => setModalDeleteParticipant(false)}/>
                <button className={'button-start'} onClick={runAlgorithm}>
                    <img src={start} alt={'startCalculationsIcon'} height={20} width={20} />
                    <span className={'button-start-text'}>Start Calculations</span>
                </button>
            </div>
        </div>
  );
}

function saveConfiguration () {
  const testConfiguration = new Test().getTestConfiguration();
  new StoreConfiguration(testConfiguration).runFileSave();
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
