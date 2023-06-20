import edit from '../../../../assets/media/pencil-square.svg';
import deleteButton from '../../../../assets/media/trash.svg';
import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DeleteModal from '../../../modals/deleteModal/DeleteModal';
import ParticipantModal from '../../../modals/participantModals/addEditModal/ParticipantModal';
import '../ParticipantWindow.css';
import { useParticipantsDispatch } from '../../context/ParticipantsContext';
import './Participant.css';

function Participant ({ participant }) {
  const [showModalEditParticipant, setShowModalEditParticipant] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);

  const dispatch = useParticipantsDispatch();

  const updateParticipant = (participant) => {
    /* eslint-disable object-shorthand */
    dispatch({
      type: 'changed',
      updatedParticipant: participant
    });
    /* eslint-enable object-shorthand */
  };

  const removeParticipant = (participant) => {
    /* eslint-disable object-shorthand */
    participant.forEach(p => {
      dispatch({
        type: 'deleted',
        itemToDelete: p
      });
    });
    /* eslint-enable object-shorthand */
  };

  const [showTooltip, setShowTooltip] = useState([false, false, false]);
  const [popoverText, setPopoverText] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const handleMouseEnter = (buttonId) => {
    const newShowTooltips = [false, false, false];
    newShowTooltips[buttonId] = true;
    setShowTooltip(newShowTooltips);
  };
  const handleMouseLeave = (buttonId) => {
    const newShowTooltips = [false, false, false];
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

  const participantContent = (
            <>
                <td className={'column-firstName'}>{participant.getFirstName()}</td>
                <td className={'column-lastName'}>{participant.getLastName()}</td>
                <td className={'column-email'} onMouseMove={handleMouseMove}>
                    <OverlayTrigger
                      key='0'
                      placement="top"
                      overlay={<Tooltip id="tooltip-0">{popoverText}</Tooltip>}
                      show={showTooltip[0]}
                      target={mousePosition}
                    >
                        <button className={'button-email'}
                          onMouseEnter={() => { setPopoverText('Email-Address'); handleMouseEnter(0); }}
                          onMouseLeave={() => handleMouseLeave(0)}>
                            {participant.getEmail()}
                          </button>
                    </OverlayTrigger>
                </td>
                <td className={'column-group'} style={{ justifySelf: 'center' }} >{participant.getGroup()}</td>
                <td className={'column-topic'}>{participant.getTopic()}</td>
                <td className={'column-languageLevel'}>{participant.getLanguageLevel()}</td>
                <td className={'column-options'}>
                    <div className={'column-options-buttons'} onMouseMove={handleMouseMove}>
                        <OverlayTrigger
                          key='1'
                          placement="top"
                          overlay={<Tooltip id="tooltip-1">{popoverText}</Tooltip>}
                          show={showTooltip[1]}
                          target={mousePosition}
                        >
                            <button className={'button-options-edit'} onClick={() => {
                              setShowModalEditParticipant(true);
                            }}
                              onMouseEnter={() => { setPopoverText('Edit Participant'); handleMouseEnter(1); }}
                              onMouseLeave={() => handleMouseLeave(1)}>
                              <img src={edit} alt={'icon'}/>
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          key='2'
                          placement="top"
                          overlay={<Tooltip id="tooltip-2">{popoverText}</Tooltip>}
                          show={showTooltip[2]}
                          target={mousePosition}
                        >
                            <button className={'button-options-delete'} onClick={() => {
                              setShowModalDelete(true);
                            }}
                              onMouseEnter={() => { setPopoverText('Delete Participant'); handleMouseEnter(2); }}
                              onMouseLeave={() => handleMouseLeave(2)}>
                              <img src={deleteButton} alt={'icon'}/>
                            </button>
                        </OverlayTrigger>
                    </div>
                </td>
            </>
  );

  return (
      <>
            {participantContent}
            <DeleteModal
                show={showModalDelete}
                onHide={() => setShowModalDelete(false)}
                titleObject={'Participant'}
                textobject={'the selected Participant ?\n\nName: \'' + participant.getFirstName() + ' ' + participant.getLastName() + '\'\nEmail: \'' + participant.getEmail() + '\''}
                onDeleteClick={(participant) => removeParticipant(participant)}
                deleteobject={[participant]}
                onClose={() => setShowModalDelete(false)}/>
            <ParticipantModal
                onSaveClick={(tempParticipant) => updateParticipant(tempParticipant)}
                participant={participant}
                show={showModalEditParticipant}
                onHide={() => setShowModalEditParticipant(false)}
                onClose={() => setShowModalEditParticipant(false)}
                newParticipant={false}/>
        </>

  );
}

export default Participant;
