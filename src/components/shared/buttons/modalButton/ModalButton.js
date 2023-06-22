import './ModalButton.css';
import React from 'react';
import Button from 'react-bootstrap/button';
import PropTypes from 'prop-types';

function ModalButton ({ onButtonClick, backgroundColor, children }) {
  return (
        <Button
            style={{ backgroundColor }}
            variant="light"
            className="save-button"
            onClick={onButtonClick}
        >
            {children}
        </Button>
  );
}
ModalButton.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired
};
export default ModalButton;
