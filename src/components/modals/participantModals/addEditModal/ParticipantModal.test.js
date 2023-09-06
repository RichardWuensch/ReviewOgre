/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import React from 'react';
import { render } from '@testing-library/react';
import ParticipantModal from './ParticipantModal';

describe('ParticipantModal', () => {
  const onCloseMock = jest.fn();
  const onSaveClickMock = jest.fn();

  const defaultProps = {
    newParticipant: true,
    onClose: onCloseMock,
    onSaveClick: onSaveClickMock
  };

  it('renders correctly', () => {
    render(<ParticipantModal {...defaultProps} />);

    // TODO: write tests
  });
});
