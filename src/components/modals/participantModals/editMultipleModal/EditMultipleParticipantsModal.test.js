/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import React from 'react';
import { render } from '@testing-library/react';
import EditMultipleParticipantsModal from './EditMultipleParticipantsModal';

describe('EditMultipleParticipantsModal', () => {
  const onCloseMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<EditMultipleParticipantsModal onClose={onCloseMock} participants={[]} />);
  });
});
