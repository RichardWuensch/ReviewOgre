import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './CustomIconButton.css';
import PropTypes from 'prop-types';

function CustomIconButton ({ toolTip, onButtonClick, children }) {
  const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {toolTip}
        </Tooltip>
  );

  return (
        <>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={renderTooltip}
                delay={500}

            >
                <button className={'icon-button'}
                        onClick={onButtonClick}>
                    {children}
                </button>
            </OverlayTrigger>

        </>
  );
}
CustomIconButton.propTypes = {
  toolTip: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default CustomIconButton;
