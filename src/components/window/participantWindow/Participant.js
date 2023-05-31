import edit from '../../../assets/media/pencil-square.svg';
import deleteButton from '../../../assets/media/trash.svg';
import React from 'react';
import DeleteModal from '../../modals/deleteModal/deleteModal';
import ParticipantModal from '../../modals/participantModals/addEditModal/ParticipantModal';
import './ParticipantWindow.css';
import { useParticipantsDispatch } from '../context/ParticipantsContext';

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

  const participantContent = (
            <>
                <td className={'column-firstName'}>{participant.getFirstName()}</td>
                <td className={'column-lastName'}>{participant.getLastName()}</td>
                <td className={'column-email'}>
                    <button className={'button-email'}>{participant.getEmail()}</button>
                </td>
                <td className={'column-group'}>{participant.getGroup()}</td>
                <td className={'column-topic'}>{participant.getTopic()}</td>
                <td className={'column-languageLevel'}>{participant.getLanguageLevel()}</td>
                <td className={'column-options'}>
                    <div className={'column-options-buttons'}>
                        <button className={'button-options-edit'} onClick={() => {
                          setShowModalEditParticipant(true);
                        }}><img src={edit} alt={'icon'}/>
                        </button>
                        <button className={'button-options-delete'} onClick={() => {
                          setShowModalDelete(true);
                        }}><img src={deleteButton} alt={'icon'}/>
                        </button>
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
                textObject={'this participant'}
                deleteobject={[participant]}
                onClose={() => setShowModalDelete(false)}/>
            <ParticipantModal
                onSaveClick={(tempParticipant) => updateParticipant(tempParticipant)}
                participant={participant}
                show={showModalEditParticipant}
                onHide={() => setShowModalEditParticipant(false)}
                onClose={() => setShowModalEditParticipant(false)}/>
        </>

  );
}

export default Participant;
