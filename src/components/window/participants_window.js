import React from 'react';
import './participants_window.css';
import AddParticipantModal from '../modals/addParticipantModal';
import EditMultipleParticipantsModal from '../modals/editMultipleParticipantsModal';
import DeleteModal from '../modals/deleteModal';
import exit from '../../assets/media/x-circle.svg';
import edit from '../../assets/media/pencil-square.svg';
import deleteButton from '../../assets/media/trash.svg';
import add from '../../assets/media/plus-circle.svg';
import { ParticipantStore } from '../../data/store/ParticipantStore';

function ParticipantsWindow () {
  const [isEditModeActive, setIsEditModeActive] = React.useState(false);
  const [modalShowParticipant, setModalShowParticipant] = React.useState(false);
  const [modalEditParticipant, setModalEditParticipant] = React.useState(false);
  const [modalShowEditMultipleParticipants, setModalShowEditMultipleParticipants] = React.useState(false);
  const [selectedParticipants, setSelectedParticipants] = React.useState([]);
  const [allParticipantsSelected, setAllParticipantsSelected] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleteTitleObject, setDeleteTitleObject] = React.useState('');
  const [deleteTextObject, setDeleteTextObject] = React.useState('');

  const store = ParticipantStore.getSingleton();

  const listParticipants = store.getAll().map(entry =>
    <tr key={entry.getId()}>
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
        <td className={'column-firstName'}>{entry.getFirstName()}</td>
        <td className={'column-lastName'}>{entry.getLastName()}</td>
        <td className={'column-email'}>
            <button className={'button-email'}>{entry.getEmail()}</button>
        </td>
        <td className={'column-group'}>{entry.getGroup()}</td>
        <td className={'column-topic'}>{entry.getTopic()}</td>
        <td className={'column-languageLevel'}>{entry.getLanguageLevel()}</td>
        <td className={'column-options'}>
            <div className={'column-options-buttons'}>
                <button className={'button-options-edit'} onClick={() => {
                  setModalEditParticipant(true);
                }}><img src={edit} alt={'icon'}/>
                </button>
                <button className={'button-options-delete'} onClick={() => {
                  setDeleteTitleObject('Participant');
                  setDeleteTextObject('this Participant');
                  setModalDelete(true);
                }}><img src={deleteButton} alt={'icon'}/>
                </button>
            </div>
            <AddParticipantModal
                show={modalEditParticipant}
                onHide={() => setModalEditParticipant(false)}
                onSave={handleSaveEditAddParticipant}
                firstname={entry.getFirstName()}
                lastname={entry.getLastName()}
                email={entry.getEmail()}
                group={entry.getGroup()}
                topic={entry.getTopic()}
                languagelevel={entry.getLanguageLevel()}
                newparticipant={false}
                id={entry.getId()}
            />
        </td>
    </tr>
  );

  function leaveEditMode () {
    setIsEditModeActive(false);
    setSelectedParticipants([]);
    setAllParticipantsSelected(false);
    setDeleteTitleObject('');
    setDeleteTextObject('');
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
  function handleDelete () {
    console.log('Delete successful');
  }
  function handleSaveEditAddParticipant () {
    console.log('Add/Edit Participant successful');
  }

  return (
      <div className={'participantsWindow'}>
          <h2 className={'title-subheadline'}>Participants</h2>
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
                    setDeleteTitleObject('Participants');
                    setDeleteTextObject('the selected Participants');
                    setModalDelete(true);
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
                    firstname={''}
                    lastname={''}
                    email={''}
                    group={0}
                    topic={''}
                    languagelevel={'C2'}
                    newparticipant={true}
                />
                <EditMultipleParticipantsModal
                    show={modalShowEditMultipleParticipants}
                    onHide={() => setModalShowEditMultipleParticipants(false)}
                    onSave={handleSaveEditMultipleParticipants}
                    list={selectedParticipants}/>
                <DeleteModal
                    show={modalDelete}
                    onHide={() => setModalDelete(false)}
                    onSave={handleDelete}
                    titleObject={deleteTitleObject}
                    textObject={deleteTextObject}/>
            </div>
      </div>
  );
}

export default ParticipantsWindow;
