import React, { useState, useEffect } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './CustomButton.css';
import PropTypes from 'prop-types';

function CustomButton ({ toolTip, onButtonClick, backgroundColor, children, disabled = false }) {
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {toolTip}
        </Tooltip>
  );

  return (
        <div className='button-with-overlay'>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={renderTooltip}
                delay={500}
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
  disabled: PropTypes.bool
};

export default CustomButton;