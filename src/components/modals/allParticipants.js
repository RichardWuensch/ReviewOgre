import React from 'react';
import './allParticipants.css';
import PropTypes from 'prop-types';

function allParticipants (props) {
  const listParticipants = props.listAllParticipants.map(entry =>
    <li className={'list-element'} key={entry.id}>
      <td className={'column-firstName'}>{entry.firstName}</td>
      <td className={'column-lastName'}>{entry.lastName}</td>
      <td className={'column-email'}>{entry.email}</td>
      <td className={'column-group'}>{entry.group}</td>
      <td className={'column-topic'}>{entry.topic}</td>
      <td className={'column-languageLevel'}>{entry.languageLevel}</td>
    </li>
  );

  return (
    <div className={'all-participants'}>
      {listParticipants}
    </div>
  );
}

allParticipants.propTypes = {
  listAllParticipants: PropTypes.arrayOf(
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.number
  )
};

export default allParticipants;
