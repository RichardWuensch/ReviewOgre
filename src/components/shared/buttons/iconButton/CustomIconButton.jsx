import React from 'react';
import {Image, OverlayTrigger, Tooltip} from 'react-bootstrap';
import './CustomIconButton.css';
import PropTypes from 'prop-types';
import {HashLink} from "react-router-hash-link";
import edit from "../../../../media/pencil-square.svg";
import deleteButton from "../../../../media/trash.svg";

function CustomIconButton ({ toolTip, onButtonClick, place, children, as: Component = 'button', routeSection = null }) {
  const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <div>{toolTip}</div>
            {routeSection !== null ? <HashLink to={`/docs#${routeSection}`}>Learn more</HashLink> : null}
        </Tooltip>
  );

  return (
        <>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement={place ? place : "top"}
                overlay={renderTooltip}
                delay={{show: 500, hide: 900}}

            >
                <Component className={'icon-button'}
                           onClick={onButtonClick ? onButtonClick : null}>
                  {children}
                </Component>
            </OverlayTrigger>

        </>
  );
}
CustomIconButton.propTypes = {
  toolTip: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
  routeSection: PropTypes.string,
  place: PropTypes.string
};

export default CustomIconButton;
