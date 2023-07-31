import './ResultCalculationPage.css';
import { Col, Container, Row } from 'react-bootstrap';
import ReviewWindow from './reviewWindow/ReviewWindow';
import React, { useState } from 'react';
import ExportOptions from './exportOptions/ExportOptions';
import CustomButton from '../shared/buttons/button/CustomButton';
import { useRoomSlots } from '../shared/context/RoomSlotContext';

function ResultCalculationPage () {
  const roomSlots = useRoomSlots();
  const [showExportOptions, setShowExportOptions] = useState(false);

  const hasReviewResults = () => {
    return [...roomSlots.flatMap((roomSlot) => roomSlot.getRooms())]
      .filter((room) => room.getReview() !== null)
      .length;
  };

  return (
      <div className="review-page">
          {hasReviewResults()
            ? <Container>
                  <Row>
                      <Col style={{ maxWidth: '200px' }}>
                          <CustomButton
                              backgroundColor={'#B0D7AF'}
                              onButtonClick={() => setShowExportOptions(true)}
                              toolTip={'Click to show export options, e.g. export results, room plan, RevAger Lite files, ...'}>
                              Show Export Options
                          </CustomButton>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                          <ReviewWindow />
                      </Col>
                  </Row>
              </Container>
            : <Container className="d-flex justify-content-center align-items-center">
                <h3>No Reviews calculated yet</h3>
              </Container>}

          <ExportOptions
            show={showExportOptions}
            onHide={() => setShowExportOptions(false)}
          />
      </div>
  );
}
export default ResultCalculationPage;
