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
