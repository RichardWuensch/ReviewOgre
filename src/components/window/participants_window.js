import React from 'react';
import './participants_window.css';
import AddParticipantModal from '../modals/addParticipantModal';
import EditMultipleParticipantsModal from '../modals/editMultipleParticipantsModal';
import DeleteParticipantModal from '../modals/deleteParticipantModal';
import exit from '../../assets/media/x-circle.svg';
import edit from '../../assets/media/pencil-square.svg';
import deleteButton from '../../assets/media/trash.svg';
import add from '../../assets/media/plus-circle.svg';
import PropTypes from 'prop-types';

function ParticipantsWindow (props) {
  const [isEditModeActive, setIsEditModeActive] = React.useState(false);
  const [modalShowParticipant, setModalShowParticipant] = React.useState(false);
  const [modalDeleteParticipant, setModalDeleteParticipant] = React.useState(false);
  const [modalShowEditMultipleParticipants, setModalShowEditMultipleParticipants] = React.useState(false);
  const [selectedParticipants, setSelectedParticipants] = React.useState([]);
  const [selectedParticipant, setSelectedParticipant] = React.useState([]);
  const [allParticipantsSelected, setAllParticipantsSelected] = React.useState(false);
  const [deleteMultipleParticipants, setDeleteMultipleParticipants] = React.useState(false);

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
                <button className={'button-options-edit'} onClick={() => {
                  setSelectedParticipant([entry.firstName, entry.lastName, entry.email, entry.group, entry.topic, entry.languageLevel]);
                  setModalShowParticipant(true);
                }}>
                    <img src={edit} alt={'icon'}/>
                </button>
                <button className={'button-options-delete'} onClick={() => {
                  setDeleteMultipleParticipants(false);
                  setModalDeleteParticipant(true);
                }}>
                    <img src={deleteButton} alt={'icon'}/>
                </button>
            </div>
        </td>
    </tr>
  );

  function leaveEditMode () {
    setIsEditModeActive(false);
    setSelectedParticipants([]);
    setAllParticipantsSelected(false);
    setDeleteMultipleParticipants();
    setSelectedParticipant('');
  }
  function handleSaveEditMultipleParticipants (group, languageLevel, topic) {
    /* update Participants(uncomment when Store is finished)
    const updatedParticipants = [...items];
    selectedParticipants.forEach((selectedParticipant) => {
        const editIndex = updatedParticipants.findIndex((item) => item === selectedParticipant);
        updatedParticipants[editIndex] = { ...updatedParticipants[editIndex], group, languageLevel, topic };
    });
    '''update STore here with updatedParticipants
    setSelectedParticipants([]);
    setModalShowEditMultipleParticipants(false);

       */
    console.log('Edit to' + group + languageLevel, topic);
  }
  function handleDeleteParticipant () {
    console.log('Delete successful');
  }
  function handleSaveEditAddParticipant () {
    console.log('Add/Edit Participant successful');
  }

  return (
      <div className={'participantsWindow'}>
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
                      <button className={'button-container-green-participants'} onClick={() => setModalShowEditMultipleParticipants(true)}>
                          <img src={edit} alt={'editListIcon'} height={16} width={16}/>
                          <span className={'button-text'}>Edit Selected</span>
                      </button>
                  )}
              {isEditModeActive && (
                  <button className={'button-container-green-participants'} onClick={() => {
                    setDeleteMultipleParticipants(true);
                    setModalDeleteParticipant(true);
                  }} style={ { background: '#C40233' } }>
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
                  <button className={'button-container-green-participants'} onClick={() => leaveEditMode()}>
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
            <div className={'setup-start-container'}>
                <AddParticipantModal
                    show={modalShowParticipant}
                    onHide={() => setModalShowParticipant(false)}
                    onSave={handleSaveEditAddParticipant}
                    list={selectedParticipant}/>
                <EditMultipleParticipantsModal
                    show={modalShowEditMultipleParticipants}
                    onHide={() => setModalShowEditMultipleParticipants(false)}
                    onSave={handleSaveEditMultipleParticipants}
                    list={selectedParticipants}/>
                <DeleteParticipantModal
                    show={modalDeleteParticipant}
                    onHide={() => setModalDeleteParticipant(false)}
                    onSave={handleDeleteParticipant}
                    multiple={deleteMultipleParticipants}/>
            </div>
      </div>
  );
}

ParticipantsWindow.propTypes = {
  listAllParticipants: PropTypes.arrayOf(
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.number
  )
};

export default ParticipantsWindow;
