import edit from '../../../../assets/media/pencil-square.svg';
import deleteButton from '../../../../assets/media/trash.svg';
import React from 'react';
import { Image } from 'react-bootstrap';
import DeleteModal from '../../../modals/deleteModal/DeleteModal';
import ParticipantModal from '../../../modals/participantModals/addEditModal/ParticipantModal';
import { useParticipantsDispatch } from '../../../shared/context/ParticipantsContext';
import './Participant.css';
import CustomIconButton from '../../../shared/buttons/iconButton/CustomIconButton';
import PropTypes from 'prop-types';

function Participant ({ participant, changePossible }) {
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

  const participantContent = (
            <>
                <td className={'column-firstName'}>{participant.getFirstName()}</td>
                <td className={'column-lastName'}>{participant.getLastName()}</td>
                <td className={'column-email'}>{participant.getEmail()}</td>
                <td className={'column-group'} style={{ justifySelf: 'center' }} >{participant.getGroup()}</td>
                <td className={'column-topic'}>{participant.getTopic()}</td>
                <td className={'column-languageLevel'}>{participant.getLanguageLevel()}</td>
                {changePossible
                  ? (
                        <td className={'column-options'}>
                            <div>
                                <CustomIconButton
                                    onButtonClick={() => setShowModalEditParticipant(true)}
                                    toolTip={'Edit this participant'}>
                                    <Image src={edit} alt={'icon'}/>
                                </CustomIconButton>
                                <CustomIconButton
                                    onButtonClick={() => setShowModalDelete(true)}
                                    toolTip={'Delete this participant'}>
                                    <Image src={deleteButton} alt={'icon'}/>
                                </CustomIconButton>
                            </div>
                        </td>
                    )
                  : (
                        <td className={'column-options'}></td>
                    )}
            </>
  );

  return (
      <>
            {participantContent}
            <DeleteModal
                show={showModalDelete}
                onHide={() => setShowModalDelete(false)}
                titleObject={'Participant'}
                textObject={'the selected Participant ?\n\nName: \'' + participant.getFirstName() + ' ' + participant.getLastName() + '\'\nEmail: \'' + participant.getEmail() + '\''}
                onDeleteClick={(participant) => removeParticipant(participant)}
                deleteObject={[participant]}
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
Participant.prototypes = {
  changePossible: PropTypes.object,
  participant: PropTypes.object.isRequired
};

export default Participant;
