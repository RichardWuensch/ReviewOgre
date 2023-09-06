/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import Modal from 'react-bootstrap/Modal';
import { Form, Image } from 'react-bootstrap';
import './ParticipantModal.css';
import exit from '../../../../media/x-circle.svg';
import PropTypes from 'prop-types';
import Participant from '../../../../data/models/Participant';
import ModalButton from '../../../shared/buttons/modalButton/ModalButton';
import * as formik from 'formik';
import * as yup from 'yup';

function ParticipantModal ({ participant, onClose, onSaveClick, newParticipant, ...props }) {
  const { Formik } = formik;

  const schema = yup.object().shape({
    id: yup.number(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    group: yup.string().required(),
    topic: yup.string(),
    languageLevel: yup.string().required()
  });

  const saveClick = (formData) => {
    const participantTemp = new Participant(undefined, formData.id, formData.firstName, formData.lastName,
      formData.email, formData.group, formData.topic, formData.languageLevel);
    onSaveClick(participantTemp);
    onClose();
  };

  return (
        <Modal
            onExit={onClose}
            size="sm"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'modal'}
        >
            <Modal.Header>
                <Modal.Title>{newParticipant ? 'Add new Participant' : 'Edit Participant'}</Modal.Title>
                <Image src={exit} onClick={onClose} alt={'exit'} className={'modal-header-icon'} />
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={(formData) => saveClick(formData)}
                    initialValues={{
                      id: participant?.getId() ?? undefined,
                      firstName: participant?.getFirstName() ?? '',
                      lastName: participant?.getLastName() ?? '',
                      email: participant?.getEmail() ?? '',
                      group: participant?.getGroup() ?? '',
                      topic: participant?.getTopic() ?? '',
                      languageLevel: participant?.getLanguageLevel() ?? 'Native Speaker'
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form style={{ padding: 10 }}>
                        <Form.Group controlId="validationFormik02">
                            <Form.Label>First name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                placeholder={'First Name'}
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                                isValid={touched.firstName && !errors.firstName}/>
                            <Form.Control.Feedback type="invalid">First Name is a required field</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationFormik03">
                            <Form.Label>Last name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder={'Last Name'}
                                value={values.lastName}
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                                isValid={touched.lastName && !errors.lastName}/>
                            <Form.Control.Feedback type="invalid">Last Name is a required field</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationFormik04">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder={'Email'}
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                isValid={touched.email && !errors.email}/>
                            <Form.Control.Feedback type="invalid">Email is a required field</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationFormik05">
                            <Form.Label>Group:</Form.Label>
                            <Form.Control
                                type="text"
                                name="group"
                                placeholder={'Group'}
                                value={values.group}
                                onChange={handleChange}
                                isInvalid={!!errors.group}
                                isValid={touched.group && !errors.group}/>
                            <Form.Control.Feedback type="invalid">Group is a required field</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationFormik06">
                            <Form.Label>Topic:</Form.Label>
                            <Form.Control
                                type="text"
                                name="topic"
                                placeholder={'Topic'}
                                value={values.topic}
                                onChange={handleChange}
                                isInvalid={!!errors.topic}
                                isValid={touched.topic && !errors.topic}/>
                        </Form.Group>
                        <Form.Group controlId="validationFormik07">
                            <Form.Label>German Skill Level:</Form.Label>
                            <Form.Select
                                placeholder={'Native Speaker'}
                                name="languageLevel"
                                value={values.languageLevel}
                                onChange={handleChange}
                                isInvalid={!!errors.languageLevel}
                                isValid={touched.languageLevel && !errors.languageLevel}>
                                <option value={'A1'}>A1</option>
                                <option value={'A2'}>A2</option>
                                <option value={'B1'}>B1</option>
                                <option value={'B2'}>B2</option>
                                <option value={'C1'}>C1</option>
                                <option value={'C2'}>C2</option>
                                <option value={'Native Speaker'}>Native Speaker</option>
                            </Form.Select>
                        </Form.Group>
                        <div className={'text-center'}>
                            <ModalButton
                                backgroundColor={'#B0D7AF'}
                                onButtonClick={() => handleSubmit()}
                            > <div className='participant-modal-submit'>{newParticipant ? 'Add Participant' : 'Save Changes'} </div></ModalButton>
                        </div>
                    </Form>)}
                </Formik>
            </Modal.Body>
        </Modal>
  );
}
ParticipantModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  participant: PropTypes.object,
  newParticipant: PropTypes.bool.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

export default ParticipantModal;
