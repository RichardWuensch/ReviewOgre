import React, { useEffect, useState } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import personUp from '../../../assets/media/person-fill-up.svg';
import personDown from '../../../assets/media/person-fill-down.svg'
import reviewerUp from '../../../assets/media/reviewer-role-up.svg';
import oneRole from '../../../assets/media/1-circle-fill.svg';
import './ParticipantFairnessIncicator.css';

function ParticipantFairnessIndicator ({ participant, ...props }) {
  const [fairnessIndicatorChildren, setFairnessIncicatorChildren] = useState([]);

  useEffect(() => {
    const children = [];

    if (participant.getFairness()?.totalCountHigherThanAvg) {
      children.push(getIconWithTooltip(personUp, 'Person up', 'Takes part in more Reviews than average'));
    }

    if (participant.getFairness()?.totalCountLowerThanAvg) {
      children.push(getIconWithTooltip(personDown, 'Person down', 'Takes part in less Reviews than average'));
    }
    
    if (participant.getFairness()?.reviewerCountHigherThanAvg) {
      children.push(getIconWithTooltip(reviewerUp, 'Reviewer up', 'Is Reviewer in more Reviews than average'));
    }

    if (participant.getFairness()?.onlyOneRole) {
      let tooltipText = 'Only has 1 role';
      if (participant.getAuthorCount() > 0) {
        tooltipText = 'Only has Author role';
      }

      if (participant.getNotaryCount() > 0) {
        tooltipText = 'Only has Notary role';
      }

      if (participant.getModeratorCount() > 0) {
        tooltipText = 'Only has Moderator role';
      }

      if (participant.getReviewerCount() > 0) {
         tooltipText = 'Only has Reviewer role';
      }
      children.push(getIconWithTooltip(oneRole, 'One Role', tooltipText));
    }

    setFairnessIncicatorChildren(children);
  }, [participant.getFairness()]);

  function getIconWithTooltip (icon, alt, tooltipText) {
    return (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="top"
        overlay={(<Tooltip>{tooltipText}</Tooltip>)}
        delay={500}>
        <img
          {...props}
          src={icon}
          alt={alt}
          height={23}
          width={23}/>
        </OverlayTrigger>
    )
  }

    return (
      <div className='participant-fairness-container'>
        {...fairnessIndicatorChildren}
      </div>
    );
}

export default ParticipantFairnessIndicator;
