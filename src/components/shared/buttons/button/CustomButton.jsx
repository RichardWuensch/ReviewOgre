/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import React, { useState, useEffect } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './CustomButton.css';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';

function CustomButton ({ toolTip, onButtonClick, backgroundColor, children, disabled = false, routeSection = null }) {
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <div>{toolTip}</div>
            {routeSection !== null ? <HashLink to={`/docs#${routeSection}`}>Learn more</HashLink> : null}
        </Tooltip>
  );

  return (
        <div className='button-with-overlay' style={{ paddingTop: '5px' }}>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={renderTooltip}
                delay={{show: 500, hide: 900}}

            >
                <Button
                    style={{ backgroundColor }}
                    variant="light"
                    className="custom-button d-flex justify-content-around"
                    onClick={onButtonClick}
                    disabled={isDisabled}
                >
                    {children}
                </Button>
            </OverlayTrigger>
        </div>
  );
}
CustomButton.propTypes = {
  toolTip: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  routeSection: PropTypes.string
};

export default CustomButton;
