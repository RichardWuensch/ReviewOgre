import edit from '../../assets/media/pencil-square.svg';
import deleteButton from '../../assets/media/trash.svg';
import React from 'react';
import DeleteModal from '../modals/deleteModal';
import ParticipantModal from '../modals/ParticipantModal';
import './participants_window.css';

function Participant ({ participant }) {
  const [modalEditParticipant, setModalEditParticipant] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleteTitleObject, setDeleteTitleObject] = React.useState('');
  const [deleteTextObject, setDeleteTextObject] = React.useState('');

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
                </td>
            </>
  );

  return (
      <>
            {participantContent}
            <DeleteModal
                show={modalDelete}
                onHide={() => setModalDelete(false)}
                onSave={() => { console.log(''); }}
                titleObject={deleteTitleObject}
                textObject={deleteTextObject}
                deleteobject={undefined}/>
            <ParticipantModal
                firstname={participant.getFirstName()}
                lastname={participant.getLastName()}
                email={participant.getEmail()}
                group={participant.getGroup()}
                topic={participant.getTopic()}
                languagelevel={participant.getLanguageLevel()}
                newparticipant={false}
                id={-1}
                participantstore={null}
                show={modalEditParticipant}
                onClose={() => { console.log(''); }}/>
        </>

  );
}

export default Participant;
