/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import React, { useEffect, useState } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import personUp from '../../../media/person-fill-up.svg';
import personDown from '../../../media/person-fill-down.svg'
import reviewerUp from '../../../media/reviewer-role-up.svg';
import oneRole from '../../../media/1-circle-fill.svg';
import './ParticipantFairnessIncicator.css';

function ParticipantFairnessIndicator ({ participant, avgCounts, ...props }) {
  const [fairnessIndicatorChildren, setFairnessIndicatorChildren] = useState([]);

  useEffect(() => {
    const children = [];
    let tooltipText = '';

    if (participant.getFairness()?.totalCountHigherThanAvg) {
      tooltipText = `Takes part in ${participant.getTotalCount()} Review${participant.getTotalCount() === 1 ? '' : 's'} while the average is ${avgCounts.totalCount}`;
      children.push(getIconWithTooltip(personUp, 'Person up', tooltipText));
    }

    if (participant.getFairness()?.totalCountLowerThanAvg) {
      tooltipText = `Takes part in ${participant.getTotalCount()} Review${participant.getTotalCount() === 1 ? '' : 's'} while the average is ${avgCounts.totalCount}`;
      children.push(getIconWithTooltip(personDown, 'Person down', tooltipText));
    }
    
    if (participant.getFairness()?.reviewerCountHigherThanAvg) {
      tooltipText = `Is Reviewer in ${participant.getReviewerCount()} Review${participant.getReviewerCount() === 1 ? '' : 's'} while the average is ${avgCounts.reviewerCount}`;
      children.push(getIconWithTooltip(reviewerUp, 'Reviewer up', tooltipText));
    }

    if (participant.getFairness()?.onlyOneRole) {
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

    setFairnessIndicatorChildren(children);
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
