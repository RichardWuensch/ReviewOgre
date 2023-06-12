import './ReviewCard.css';
import React, { useState } from 'react';
import { Accordion, Card, Image, useAccordionButton, Table } from 'react-bootstrap';
import chevronDown from '../../../assets/media/chevron-down.svg';
import chevronUp from '../../../assets/media/chevron-up.svg';
import Participant from '../../../data/model/Participant';

function ReviewCard (props) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const openAccordion = useAccordionButton(props.eventKey, () => {});
  const expandAndToggle = () => {
    openAccordion(undefined);
    setIsAccordionOpen(prevOpen => prevOpen !== true);
  };

  function getReviewGroupName () {
    // return props.singleReview.getGroupName();
    return 'Test ReviewGroupName';
  }
  function getReviewTime () {
    // return props.singleReview.getAuthor().getActiveSlots[0].getStartTime() + ' - ' + props.singleReview.getAuthor().getActiveSlots[0].getEndTime();
    return 'Test ReviewTime';
  }
  function getReviewRoom () {
    // return props.singleReview.?;
    // Woher bekomme ich den Raum eines Reviews?
    return 'Test ReviewRoom';
  }

  const reviewContent = (
        <>
            <Card>
                <Card.Header className={'list-item'}>
                    <div className={'reviews-infos'}>
                        <button
                            type="button"
                            onClick={expandAndToggle}
                            className={'expand-structure-button'}
                        >
                            <span className={'review-text'} style={{ paddingLeft: 5 }}>
                                {getReviewGroupName()}
                            </span>
                            <span className={'review-text'} style={{ paddingLeft: 5 }}>
                                {getReviewTime()}
                            </span>
                            <span className={'review-text'} style={{ paddingLeft: 5 }}>
                                {getReviewRoom()}
                            </span>
                            <div className={'chevron'}>
                                {isAccordionOpen
                                  ? (
                                        <Image src={chevronUp} alt={'chevronUp'} />
                                    )
                                  : (
                                        <Image src={chevronDown} alt={'chevronDown'} />
                                    )}
                            </div>
                        </button>
                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey={props.eventKey}>
                    <Card.Body>
                        <div className={'list-description'}>
                            <div className={'participant-list-container overflow-auto'}>
                                <Table responsive borderless className={'overflow-auto participant-table'}>
                                    <thead>
                                        <tr>
                                            <th className={'column-firstName'} style={{ fontSize: '1.5em' }}>First Name</th>
                                            <th className={'column-lastName'} style={{ fontSize: '1.5em' }}>Last Name</th>
                                            <th className={'column-email-header'} style={{ fontSize: '1.5em' }}>Email Address</th>
                                            <th className={'column-group'} style={{ fontSize: '1.5em' }}>Group</th>
                                            <th className={'column-topic'} style={{ fontSize: '1.5em' }}>Topic</th>
                                            <th className={'column-languageLevel'} style={{ fontSize: '1.5em' }}>German Skill Level</th>
                                            <th className={'column-options'} style={{ fontSize: '1.5em' }}>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.singleReview.getPossibleParticipants()?.map((participant) => (
                                            <tr key={participant.getId()}>
                                                <Participant participant={participant} />
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </>
  );

  return (
        <>
            {reviewContent}
        </>

  );
}
export default ReviewCard;
