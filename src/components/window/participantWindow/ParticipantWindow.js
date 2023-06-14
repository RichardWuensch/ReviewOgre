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
import { Button, Container, Image, Table } from 'react-bootstrap';

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

  function leaveEditMode () {
    setIsEditModeActive(false);
    setSelectedParticipants([]);
    setAllParticipantsSelected(false);
  }

  return (
      <Container fluid className={'participantsWindow p-0'}>
          <h2 className={'title-subheadline'} style={{ marginBottom: 0 }}>Participants</h2>
          <div className={'participant-button-container'}>
              {!isEditModeActive
                ? (
                    <div className={'button-container-participants'}>
                      <Button variant={'light'} className="button-container-green" onClick={() => setShowModalParticipant(true)}>
                          <Image src={add} className={'button-image'} alt="addParticipant" height={16} width={16} />
                          <span className="button-text">Add Participant</span>
                      </Button>
                    </div>
                  )
                : (
                      <div className={'button-container-participants'}>
                          <Button
                              variant={'light'}
                              className="button-container-green"
                              disabled={ selectedParticipants.length === 0 }
                              style={{ background: '#B0D7AF' }}
                              onClick={() => setShowModalEditMultipleParticipants(true)}>
                                <Image src={edit} className={'button-image'} alt="editList" height={16} width={16} />
                                <span className="button-text">Edit Selected</span>
                          </Button>
                      </div>
                  )}
              {isEditModeActive && (
                  <div className={'button-container-participants'}>
                      <Button variant={'light'} className="button-container-green" onClick={() => leaveEditMode()}>
                          <Image src={exit} className={'button-image'} alt="exitEdit" height={16} width={16} />
                          <span className="button-text" >Cancel</span>
                      </Button>
                  </div>
              )

              }
              {!isEditModeActive
                ? (
                      <div className={'button-container-participants'}>
                          <Button variant={'light'} className="button-container-green" onClick={() => setIsEditModeActive(true)}>
                              <Image src={edit} className={'button-image'} alt="editParticipants" height={16} width={16} />
                              <span className="button-text" >Edit List</span>
                          </Button>
                      </div>
                  )
                : (
                  <div className={'button-container-participants'}>
                    <Button variant={'light'} className="button-container-green" disabled={ selectedParticipants.length === 0 } onClick={() => setShowModalDeleteParticipant(true)} style={ { background: '#C40233' } }>
                        <Image src={deleteButton} className={'button-image'} alt="delete" height={16} width={16} />
                        <span className="button-text" style={{ color: '#F5F5F5' }}>Delete Selected</span>
                    </Button>
                  </div>
                  )}
          </div>
          <div className={'list-description'}>
              <div className={'participant-list-container'}>
              <Table responsive borderless className={'participant-table'}>
                  <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: 'white' }}>
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
                      <th className={'column-firstName'} style={{ fontSize: '1.5em' }}>First Name</th>
                      <th className={'column-lastName'} style={{ fontSize: '1.5em' }}>Last Name</th>
                      <th className={'column-email-header'} style={{ fontSize: '1.5em' }}>Email Address</th>
                      <th className={'column-team'} style={{ fontSize: '1.5em' }}>Team</th>
                      <th className={'column-topic'} style={{ fontSize: '1.5em' }}>Topic</th>
                      <th className={'column-languageLevel'} style={{ fontSize: '1.5em' }}>German Skill Level</th>
                      <th className={'column-options'} style={{ fontSize: '1.5em' }}></th>
                  </tr>
                  </thead>
                <tbody>

                {participants.map((participant) => (
                    <tr key={participant.getId()} style={{ borderBottom: '1px solid black' }}>
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
            </Table>
                  </div>
          </div>
          <ParticipantModal
              onSaveClick={(tempParticipant) => addParticipant(tempParticipant)}
              show={showModalParticipant}
              onClose={() => setShowModalParticipant(false)}
              onHide={() => setShowModalParticipant(false)}
              newParticipant={true}/>
          <EditMultipleParticipantsModal
              show={showModalEditMultipleParticipants}
              onHide={() => setShowModalEditMultipleParticipants(false)}
              onClose={() => setShowModalEditMultipleParticipants(false)}
              participants = { selectedParticipants }/>
          <DeleteModal
              show={showModalDeleteParticipant}
              onHide={() => setShowModalDeleteParticipant(false)}
              titleObject={'Participants'}
              textobject={'the selected participants ?'}
              onDeleteClick={(participant) => removeParticipants(participant)}
              deleteobject={ selectedParticipants }
              onClose={() => { setShowModalDeleteParticipant(false); }}/>
      </Container>
  );
}

export default ParticipantList;
