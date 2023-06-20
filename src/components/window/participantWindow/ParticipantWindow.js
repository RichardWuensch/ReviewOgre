import { useParticipants, useParticipantsDispatch } from '../context/ParticipantsContext';
import Participant from './participant/Participant';
import add from '../../../assets/media/plus-circle.svg';
import edit from '../../../assets/media/pencil-square.svg';
import deleteButton from '../../../assets/media/trash.svg';
import exit from '../../../assets/media/x-circle.svg';
import React, { useState, useEffect } from 'react';
import './ParticipantWindow.css';
import ParticipantModal from '../../modals/participantModals/addEditModal/ParticipantModal';
import EditMultipleParticipantsModal from '../../modals/participantModals/editMultipleModal/EditMultipleParticipantsModal';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { Button, Container, Image, Table } from 'react-bootstrap';
import download from '../../../assets/media/download.svg';
import ImportParticipants from '../../../api/ImportParticipants';
import { Button, Container, Image, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

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

  async function importStudentList (event) {
    // deleteParticipantListFromContext(participants);
    const importParticipants = new ImportParticipants();
    const participantList = await importParticipants.runStudentImport(event);
    addParticipantListToContext(participantList);
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

  const [showTooltip, setShowTooltip] = useState([false, false, false, false, false]);
  const [popoverText, setPopoverText] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const handleMouseEnter = (buttonId) => {
    const newShowTooltips = [false, false, false, false, false];
    newShowTooltips[buttonId] = true;
    setShowTooltip(newShowTooltips);
  };
  const handleMouseLeave = (buttonId) => {
    const newShowTooltips = [false, false, false, false, false];
    setShowTooltip(newShowTooltips);
  };
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  function leaveEditMode () {
    setIsEditModeActive(false);
    setSelectedParticipants([]);
    setAllParticipantsSelected(false);
  }

  return (
      <Container fluid className={'participantsWindow p-0'} onMouseMove={handleMouseMove}>
          <h2 className={'title-subheadline'} style={{ marginBottom: 0 }}>Participants</h2>
          <div className={'participant-button-container'}>
              {!isEditModeActive
                ? (
                    <div className={'button-container-participants'}>
                      <OverlayTrigger
                        key='0'
                        placement="top"
                        overlay={<Tooltip id="tooltip-0">{popoverText}</Tooltip>}
                        show={showTooltip[0]}
                        target={mousePosition}
                      >
                          <Button variant={'light'} className="button-container-green" onClick={() => setShowModalParticipant(true)}
                            onMouseEnter={() => { setPopoverText('Add Participant'); handleMouseEnter(0); }}
                            onMouseLeave={() => handleMouseLeave(0)}>
                              <Image src={add} className={'button-image'} alt="addParticipant" height={16} width={16} />
                              <span className="button-text">Add Participant</span>
                          </Button>
                      </OverlayTrigger>
                    </div>
                  )
                : (
                      <div className={'button-container-participants'}>
                          <OverlayTrigger
                            key='1'
                            placement="top"
                            overlay={<Tooltip id="tooltip-1">{popoverText}</Tooltip>}
                            show={showTooltip[1]}
                            target={mousePosition}
                          >
                              <Button
                                  variant={'light'}
                                  className="button-container-green"
                                  disabled={ selectedParticipants.length === 0 }
                                  style={{ background: '#B0D7AF' }}
                                  onClick={() => setShowModalEditMultipleParticipants(true)}
                                    onMouseEnter={() => { setPopoverText('Edit Selected'); handleMouseEnter(1); }}
                                    onMouseLeave={() => handleMouseLeave(1)}>
                                    <Image src={edit} className={'button-image'} alt="editList" height={16} width={16} />
                                    <span className="button-text">Edit Selected</span>
                              </Button>
                          </OverlayTrigger>
                      </div>
                  )}
              {isEditModeActive
                ? (
                  <div className={'button-container-participants'}>
                      <OverlayTrigger
                        key='2'
                        placement="top"
                        overlay={<Tooltip id="tooltip-2">{popoverText}</Tooltip>}
                        show={showTooltip[2]}
                        target={mousePosition}
                      >
                          <Button variant={'light'} className="button-container-green" onClick={() => leaveEditMode()}
                            onMouseEnter={() => { setPopoverText('Cancel'); handleMouseEnter(2); }}
                            onMouseLeave={() => handleMouseLeave(2)}>
                              <Image src={exit} className={'button-image'} alt="exitEdit" height={16} width={16} />
                              <span className="button-text" >Cancel</span>
                          </Button>
                      </OverlayTrigger>
                      <Button variant={'light'} className="button-container-green" onClick={() => leaveEditMode()}>
                          <Image src={exit} className={'button-image'} alt="exitEdit" height={16} width={16} />
                          <span className="button-text" >Cancel</span>
                      </Button>
                  </div>)
                : (
                  <div className={'button-container-participants'}>
                      <Button variant={'light'} className="button-container-green" onClick={() => document.getElementById('student-input').click()}>
                          <Image src={download} className={'button-image'} alt="icon1" height={16} width={16} />
                          <span className="button-text">Import Participants</span>
                      </Button>
                      <input type="file" id="student-input" style={{ display: 'none' }} onChange={importStudentList}
                      accept='text/csv'/>
                  </div>
                  )

              }
              {!isEditModeActive
                ? (
                      <div className={'button-container-participants'}>
                          <OverlayTrigger
                            key='3'
                            placement="top"
                            overlay={<Tooltip id="tooltip-3">{popoverText}</Tooltip>}
                            show={showTooltip[3]}
                            target={mousePosition}
                          >
                              <Button variant={'light'} className="button-container-green" onClick={() => setIsEditModeActive(true)}
                                onMouseEnter={() => { setPopoverText('Edit List'); handleMouseEnter(3); }}
                                onMouseLeave={() => handleMouseLeave(3)}>
                                  <Image src={edit} className={'button-image'} alt="editParticipants" height={16} width={16} />
                                  <span className="button-text" >Edit List</span>
                              </Button>
                          </OverlayTrigger>
                      </div>
                  )
                : (
                  <div className={'button-container-participants'}>
                    <OverlayTrigger
                      key='4'
                      placement="top"
                      overlay={<Tooltip id="tooltip-4">{popoverText}</Tooltip>}
                      show={showTooltip[4]}
                      target={mousePosition}
                    >
                        <Button variant={'light'} className="button-container-green" disabled={ selectedParticipants.length === 0 } onClick={() => setShowModalDeleteParticipant(true)} style={ { background: '#C40233' } }
                          onMouseEnter={() => { setPopoverText('Delete Selected'); handleMouseEnter(4); }}
                          onMouseLeave={() => handleMouseLeave(4)}>
                            <Image src={deleteButton} className={'button-image'} alt="delete" height={16} width={16} />
                            <span className="button-text" style={{ color: '#F5F5F5' }}>Delete Selected</span>
                        </Button>
                    </OverlayTrigger>
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
