import { useParticipants, useParticipantsDispatch } from '../../shared/context/ParticipantsContext';
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
import ImportParticipants from '../../../api/ImportParticipants';
import { Container, Image, Table } from 'react-bootstrap';
import CustomButton from '../../shared/buttons/button/CustomButton';
import DataImportCheckModal from '../../modals/dataImportCheckModal/DataImportCheckModal';
import CustomCheckbox from '../../shared/buttons/checkbox/CustomCheckbox';
import ErrorModal from '../../modals/errorModal/ErrorModal';

function ParticipantWindow () {
  const [isEditModeActive, setIsEditModeActive] = React.useState(false);
  const [showModalParticipant, setShowModalParticipant] = React.useState(false);
  const [showModalEditMultipleParticipants, setShowModalEditMultipleParticipants] = React.useState(false);
  const [selectedParticipants, setSelectedParticipants] = React.useState([]);
  const [showModalDeleteParticipant, setShowModalDeleteParticipant] = React.useState(false);
  const [showModalDataImportCheck, setShowModalDataImportCheck] = React.useState(false);
  const [participantImportError, setParticipantImportError] = React.useState(null);
  const [importedParticipants, setImportedParticipants] = React.useState([]);

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

  function deleteAllParticipantsFromContext () {
    participantsDispatch({
      type: 'deleteAll'
    });
  }

  async function importStudentListToLocalList (event) {
    const importParticipants = new ImportParticipants();
    importParticipants.runStudentImport(event)
      .then(participantList => {
        console.log(participantList);
        setImportedParticipants(participantList);
        setShowModalDataImportCheck(true);
      })
      .catch(error => {
        setParticipantImportError(error);
      });
  }

  function addParticipantListToContext (list) {
    /* eslint-disable object-shorthand */
    for (const entry of list) {
      participantsDispatch({
        type: 'added',
        newParticipant: entry
      });
    }
    /* eslint-enable object-shorthand */
  }

  function leaveEditMode () {
    setIsEditModeActive(false);
    setSelectedParticipants([]);
  }

  return (
      <Container fluid className={'participantsWindow p-0'}>
          <h2 className={'title-subheadline'} style={{ marginBottom: 0 }}>Participants</h2>
          <div className={'participant-button-container'}>
              {!isEditModeActive
                ? (
                    <div className={'button-container-participants'}>
                        <CustomButton
                            toolTip={'Add Participant manually'}
                            onButtonClick={() => setShowModalParticipant(true)}
                            backgroundColor={'#B0D7AF'}
                        >
                            <Image
                                src={add}
                                className={'button-image'}
                                alt="addParticipant"
                                height={16} width={16} />
                            <span className="button-text"> Add Participant</span>
                        </CustomButton>
                    </div>
                  )
                : (
                      <div className={'button-container-participants'}>
                          <CustomButton
                              toolTip={'Edit Selected'}
                              onButtonClick={() => setShowModalEditMultipleParticipants(true)}
                              backgroundColor={'#B0D7AF'}
                              disabled={ selectedParticipants.length === 0 }
                          >
                              <Image
                                  src={edit}
                                  className={'button-image'}
                                  alt="editList"
                                  height={16}
                                  width={16} />
                              <span className="button-text"> Edit Selected</span>
                          </CustomButton>
                      </div>
                  )}
              {isEditModeActive
                ? (
                  <div className={'button-container-participants'}>
                      <CustomButton
                          toolTip={'Exit the edit mode'}
                          onButtonClick={() => leaveEditMode()}
                          backgroundColor={'#B0D7AF'}
                      >
                          <Image
                              src={exit}
                              className={'button-image'}
                              alt="exitEdit"
                              height={16}
                              width={16} />
                          <span className="button-text" > Exit Edit Mode</span>
                      </CustomButton>
                  </div>)
                : (
                  <div className={'button-container-participants'}>
                      <CustomButton
                          toolTip={'Import Participants from csv file'}
                          onButtonClick={() => document.getElementById('student-input').click()}
                          backgroundColor={'#B0D7AF'}
                      >
                          <span className="button-text"> Import Participants</span>
                      </CustomButton>
                      <input type="file" id="student-input" style={{ display: 'none' }} onChange={() => { importStudentListToLocalList(event); }}
                      accept='text/csv'/>
                  </div>
                  )

              }
              {!isEditModeActive
                ? (
                      <div className={'button-container-participants'}>
                          <CustomButton
                              toolTip={'Edit multiple participants simultaneously'}
                              onButtonClick={() => setIsEditModeActive(true)}
                              backgroundColor={'#B0D7AF'}
                          >
                              <Image
                                  src={edit}
                                  className={'button-image'}
                                  alt="editParticipants"
                                  height={16}
                                  width={16} />
                              <span className="button-text" > Edit List</span>
                          </CustomButton>
                      </div>
                  )
                : (
                  <div className={'button-container-participants'}>
                      <CustomButton
                          toolTip={'Delete Selected'}
                          onButtonClick={() => setShowModalDeleteParticipant(true)}
                          backgroundColor={'#C40233'}
                          disabled={ selectedParticipants.length === 0 }
                      >
                          <Image
                              src={deleteButton}
                              className={'button-image'}
                              alt="delete"
                              height={16}
                              width={16} />
                          <span className="button-text" style={{ color: '#F5F5F5' }}> Delete Selected</span>
                      </CustomButton>
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
                                  <CustomCheckbox
                                      onCheckboxClick={() => {
                                        setSelectedParticipants(() => {
                                          if (selectedParticipants.length === participants.length) {
                                            return [];
                                          } else {
                                            return participants;
                                          }
                                        });
                                      }
                                  }
                                      isChecked={selectedParticipants.length === participants.length} />
                              </th>
                          )}
                          <th className={'column-firstName'} style={{ fontSize: '1.5em' }}>First Name</th>
                          <th className={'column-lastName'} style={{ fontSize: '1.5em' }}>Last Name</th>
                          <th className={'column-email-header'} style={{ fontSize: '1.5em' }}>Email Address</th>
                          <th className={'column-team'} style={{ fontSize: '1.5em' }}>Group</th>
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
                                    <CustomCheckbox
                                        onCheckboxClick={() => {
                                          setSelectedParticipants(() => {
                                            if (!selectedParticipants.includes(participant)) {
                                              return [...selectedParticipants, participant];
                                            } else {
                                              return selectedParticipants.filter(p => p !== participant);
                                            }
                                          });
                                        }
                                        }
                                        isChecked={selectedParticipants.includes(participant)} />
                                </td>
                            )}
                            <Participant
                              participant={participant}
                              changePossible={true}/>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
          </div>
          <DataImportCheckModal
              show={showModalDataImportCheck}
              importedParticipants={importedParticipants}
              onOverwriteData={() => { deleteAllParticipantsFromContext(); addParticipantListToContext(importedParticipants); }}
              onAddData={() => { addParticipantListToContext(importedParticipants); }}
              title={ 'Import Participants' }
              text={ 'participants' }
              onHide={() => setShowModalDataImportCheck(false)}
              onClose={() => setShowModalDataImportCheck(false)}
          />
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
              textType={'the selected participants ? \n\n'}
              textObject={ selectedParticipants.map((participant) => `${participant.getFirstName()} ${participant.getLastName()}`).join('\n')}
              onDeleteClick={(participant) => removeParticipants(participant)}
              deleteObject={ selectedParticipants }
              onClose={() => { setShowModalDeleteParticipant(false); }}/>
          <ErrorModal
            show={participantImportError !== null}
            errorObject={participantImportError}
            modalHeader='Error importing Participant csv'
            onHide={() => setParticipantImportError(null)}/>
      </Container>
  );
}

export default ParticipantWindow;
