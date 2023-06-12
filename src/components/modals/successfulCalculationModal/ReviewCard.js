import './ReviewCard.css';
import React, { useState } from 'react';
import { Accordion, Card, Image, useAccordionButton, Table } from 'react-bootstrap';
import chevronDown from '../../../assets/media/chevron-down.svg';
import chevronUp from '../../../assets/media/chevron-up.svg';

function ReviewCard (props) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const openAccordion = useAccordionButton(props.eventKey, () => {});
  const expandAndToggle = () => {
    openAccordion(undefined);
    setIsAccordionOpen(prevOpen => prevOpen !== true);
  };

  function getReviewGroupName () {
    return props.room.getReview()?.getGroupName();
  }
  function getReviewRoom () {
    return props.room.getName();
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
                            <div className={'review-header'}>
                                <span className={'review-text'} style={{ paddingLeft: 5 }}>
                                    {getReviewGroupName()}
                                </span>
                                <span className={'review-text'} style={{ paddingLeft: 5 }}>
                                    {props.reviewTime}
                                </span>
                                <span className={'review-text'} style={{ paddingLeft: 5 }}>
                                    {getReviewRoom()}
                                </span>
                            </div>
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
                            <div className={'reviews-list-container overflow-auto'}>
                                <Table responsive borderless className={'overflow-auto reviews-table'}>
                                    <thead>
                                        <tr>
                                            <th className={'column-firstName'}>First Name</th>
                                            <th className={'column-lastName'}>Last Name</th>
                                            <th className={'column-email-header'}>Email Address</th>
                                            <th className={'column-role'}>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className={'column-firstName'}>{props.room.getReview()?.getAuthor()?.getFirstName()}</th>
                                            <th className={'column-lastName'}>{props.room.getReview()?.getAuthor()?.getLastName()}</th>
                                            <th className={'column-email-header'}>{props.room.getReview()?.getAuthor()?.getEmail()}</th>
                                            <th className={'column-role'}>Author</th>
                                        </tr>
                                        <tr>
                                            <th className={'column-firstName'}>{props.room.getReview()?.getModerator()?.getFirstName()}</th>
                                            <th className={'column-lastName'}>{props.room.getReview()?.getModerator()?.getLastName()}</th>
                                            <th className={'column-email-header'}>{props.room.getReview()?.getModerator()?.getEmail()}</th>
                                            <th className={'column-role'}>Moderator</th>
                                        </tr>
                                        <tr>
                                            <th className={'column-firstName'}>{props.room.getReview()?.getNotary()?.getFirstName()}</th>
                                            <th className={'column-lastName'}>{props.room.getReview()?.getNotary()?.getLastName()}</th>
                                            <th className={'column-email-header'}>{props.room.getReview()?.getNotary()?.getEmail()}</th>
                                            <th className={'column-role'}>Notary</th>
                                        </tr>
                                        {props.room.getReview()?.getReviewer().map((reviewer) => (
                                            <tr key={reviewer.getId()}>
                                                <th className={'column-firstName'}>{reviewer.getFirstName()}</th>
                                                <th className={'column-lastName'}>{reviewer.getLastName()}</th>
                                                <th className={'column-email-header'}>{reviewer.getEmail()}</th>
                                                <th className={'column-role'}>Reviewer</th>
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
