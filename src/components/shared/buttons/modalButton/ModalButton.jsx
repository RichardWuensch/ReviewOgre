/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import './ModalButton.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ModalButton ({ onButtonClick, backgroundColor, width, children }) {
  return (
        <Button
            style={{ backgroundColor, border: 'none', marginTop: '10px', width: width ?? 'auto' }}
            variant="light"
            className="save-button"
            onClick={onButtonClick}>
            {children}
        </Button>
  );
}
ModalButton.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired
};
export default ModalButton;
