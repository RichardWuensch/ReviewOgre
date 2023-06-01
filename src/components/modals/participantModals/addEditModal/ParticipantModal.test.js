import React from 'react';
import { render } from '@testing-library/react';
import ParticipantModal from './ParticipantModal';

describe('ParticipantModal', () => {
  const onCloseMock = jest.fn();
  const onSaveClickMock = jest.fn();

  const defaultProps = {
    onClose: onCloseMock,
    onSaveClick: onSaveClickMock
  };

  it('renders correctly', () => {
    render(<ParticipantModal {...defaultProps} />);

    // TODO: write tests
  });
});
