import { useParticipants, useParticipantsDispatch } from '../context/ParticipantsContext';
import Participant from './participant/Participant';
import add from '../../../assets/media/plus-circle.svg';
import edit from '../../../assets/media/pencil-square.svg';
import deleteButton from '../../../assets/media/trash.svg';
import exit from '../../../assets/media/x-circle.svg';
import React from 'react';
import './ParticipantWindow.css';
import ParticipantModal from '../../modals/participantModals/addEditModal/ParticipantModal';
import EditMultipleParticipantsModal from '../../modals/participantModals/editMultipleModal/EditMultipleParticipantsModal';
import DeleteModal from '../../modals/deleteModal/DeleteModal';

function ParticipantList () {
  const [isEditModeActive, setIsEditModeActive] = React.useState(false);
  const [showModalParticipant, setShowModalParticipant] = React.useState(false);
  const [showModalEditMultipleParticipants, setShowModalEditMultipleParticipants] = React.useState(false);
  const [selectedParticipants, setSelectedParticipants] = React.useState([]);
  const [allParticipantsSelected, setAllParticipantsSelected] = React.useState(true);
  const [showModalDeleteParticipant, setShowModalDeleteParticipant] = React.useState(false);

  const participants = useParticipants();
  const participantsDispatch = useParticipantsDispatch();

  const addParticipant = (participant) => {
    /* eslint-disable object-shorthand */
    participantsDispatch({
      type: 'added',
      newParticipant: participant
    });
    /* eslint-enable object-shorthand */
  };

  const removeParticipants = (participants) => {
    /* eslint-disable object-shorthand */
    participants.forEach(p => {
      participantsDispatch({
        type: 'deleted',
        itemToDelete: p
      });
    });
    /* eslint-enable object-shorthand */
  };

  return (
      <div className={'participantsWindow'}>
          <h2 className={'title-subheadline'}>Participants</h2>
          <div className={'participant-button-container'}>
              {!isEditModeActive
                ? (
                      <button className={'button-container-green-participants'} onClick={() => {
                        setShowModalParticipant(true);
                      }}>
                          <img src={add} alt={'addParticipantIcon'} height={16} width={16}/>
                          <span className={'button-text'}>Add Participant</span>
                      </button>
                  )
                : (
                      <button className={'button-container-green-participants'} onClick={() => setShowModalEditMultipleParticipants(true)}>
                          <img src={edit} alt={'editListIcon'} height={16} width={16}/>
                          <span className={'button-text'}>Edit Selected</span>
                      </button>
                  )}
              {isEditModeActive && (
                  <button className={'button-container-green-participants'} onClick={() => {
                    console.log('Selected participants' + selectedParticipants);
                    setShowModalDeleteParticipant(true);
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
              <div className={'participant-list-container'}>
              <table className={'participant-table'}>
                  <thead>
                  <tr>
                      {isEditModeActive && (
                          <th>
                              <label className={'checkboxContainer'}>
                                  <input type="checkbox" onClick={() => {
                                    setAllParticipantsSelected(prev => !prev);
                                    setSelectedParticipants(allParticipantsSelected === true ? participants : []);
                                  }}/>
                                  <span className={'checkmark'}></span>
                              </label>
                          </th>
                      )}
                      <th className={'column-firstName'} style={{ width: '12%', fontSize: '1.5em' }}>First Name</th>
                      <th className={'column-lastName'} style={{ width: '12%', fontSize: '1.5em' }}>Last Name</th>
                      <th className={'column-email-header'} style={{ width: '20%', fontSize: '1.5em' }}>Email Address</th>
                      <th className={'column-group'} style={{ width: '10%', fontSize: '1.5em' }}>Group</th>
                      <th className={'column-topic'} style={{ width: '10%', fontSize: '1.5em' }}>Topic</th>
                      <th className={'column-languageLevel'} style={{ width: '18%', fontSize: '1.5em' }}>German Skill Level</th>
                      <th className={'column-options'} style={{ width: '12%', fontSize: '1.5em' }}>Options</th>
                  </tr>
                  </thead>
                <tbody>

                {participants.map((participant) => (
                    <tr key={participant.getId()}>
                        {isEditModeActive && (
                            <td>
                                <label className={'checkboxContainer'}>
                                    <input
                                        type="checkbox"
                                        checked={selectedParticipants.includes(participant)}
                                        onChange={event => {
                                          const isChecked = event.target.checked;
                                          setSelectedParticipants(prevSelectedParticipants => {
                                            if (isChecked) {
                                              return [...prevSelectedParticipants, participant];
                                            } else {
                                              return prevSelectedParticipants.filter(p => p !== participant);
                                            }
                                          });
                                        }}
                                    />
                                    <span className={'checkmark'}></span>
                                </label>
                            </td>
                        )}
                        <Participant participant={participant} />
                    </tr>
                ))}
                </tbody>
            </table>
                  </div>
          </div>
          <ParticipantModal
              onSaveClick={(tempParticipant) => { addParticipant(tempParticipant); }}
              show={showModalParticipant}
              onClose={() => setShowModalParticipant(false)}
              onHide={() => setShowModalParticipant(false)}
              newParticipant={true}/>
          <EditMultipleParticipantsModal
              show={showModalEditMultipleParticipants}
              onHide={() => setShowModalEditMultipleParticipants(false)}
              onSave={() => { console.log(''); }}
              onClose={() => setShowModalEditMultipleParticipants(false)}
              participants = { selectedParticipants }/>
          <DeleteModal
              show={showModalDeleteParticipant}
              onHide={() => setShowModalDeleteParticipant(false)}
              titleObject={'Participants'}
              textObject={'the selected participants'}
              onDeleteClick={(participant) => removeParticipants(participant)}
              deleteobject={ selectedParticipants }
              onClose={() => { setShowModalDeleteParticipant(false); }}/>
      </div>
  );

  function leaveEditMode () {
    setIsEditModeActive(false);
    setSelectedParticipants([]);
    setAllParticipantsSelected(false);
  }
}

export default ParticipantList;
