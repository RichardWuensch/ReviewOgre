import edit from '../../../../assets/media/pencil-square.svg';
import deleteButton from '../../../../assets/media/trash.svg';
import React from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
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

  const renderTooltip = (props, tooltip) => (
        <Tooltip id="button-tooltip" {...props}>
            {tooltip}
        </Tooltip>
  );

  const participantContent = (
            <>
                <td className={'column-firstName'}>{participant.getFirstName()}</td>
                <td className={'column-lastName'}>{participant.getLastName()}</td>
                <td className={'column-email'}>{participant.getEmail()}</td>
                <td className={'column-group'} style={{ justifySelf: 'center' }} >{participant.getGroup()}</td>
                <td className={'column-topic'}>{participant.getTopic()}</td>
                <td className={'column-languageLevel'}>{participant.getLanguageLevel()}</td>
                <td className={'column-options'}>
                    <div className={'column-options-buttons'}>
                        <OverlayTrigger
                            trigger={['hover', 'focus']}
                            placement="top"
                            overlay={(props) => renderTooltip(props, 'Edit this participant')}
                            delay={200}
                        >
                            <button className={'button-options-edit'}
                                    onClick={() => setShowModalEditParticipant(true)}>
                              <Image src={edit} alt={'icon'}/>
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            trigger={['hover', 'focus']}
                            placement="top"
                            overlay={(props) => renderTooltip(props, 'Delete this participant')}
                            delay={200}
                        >
                            <button
                                className={'button-options-delete'}
                                onClick={() => setShowModalDelete(true)}>
                              <Image src={deleteButton} alt={'icon'}/>
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
