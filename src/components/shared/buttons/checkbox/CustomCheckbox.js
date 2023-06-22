import React, { useEffect, useState } from 'react';
import './CustomCheckbox.css';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function CustomCheckbox ({ onCheckboxClick, isChecked }) {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onCheckboxClick(newChecked);
  };

  return (
        <Form>
            <Form.Check
                type="checkbox"
                className="custom-checkbox"
                onClick={handleCheckboxChange}
                checked={checked}
            />
        </Form>
  );
}

CustomCheckbox.propTypes = {
  onCheckboxClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired
};

export default CustomCheckbox;
