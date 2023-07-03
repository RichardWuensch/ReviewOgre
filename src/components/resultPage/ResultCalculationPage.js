import './ResultCalculationPage.css';
import { Col, Container, Row } from 'react-bootstrap';
import ReviewWindow from '../modals/successfulCalculationModal/ReviewWindow';
import React, { useState } from 'react';
import ExportOptions from './exportOptions/ExportOptions';
import CustomButton from '../shared/buttons/button/CustomButton';

function ResultCalculationPage () {
  const [showExportOptions, setShowExportOptions] = useState(false);

  return (
      <div className="review-page">
          <Container>
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
          <ExportOptions
            show={showExportOptions}
            onHide={() => setShowExportOptions(false)}
          />
      </div>
  );
}
export default ResultCalculationPage;
