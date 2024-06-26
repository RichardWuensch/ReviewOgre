/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CustomSwitch.css';

function CustomSwitch ({ isChecked, onSwitchClick, children }) {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleSwitchChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onSwitchClick(newChecked);
  };
  return (
        <div className={'setupItems'} style={{ paddingBottom: '20px' }}>
            <label className={'switch'}>
                <input
                    type="checkbox"
                    aria-label={'Groups speak the same language'}
                    onChange={handleSwitchChange}
                    checked={checked}
                />
                <span className={'slider round'}></span>
            </label>
            {children}
        </div>
  );
}
CustomSwitch.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onSwitchClick: PropTypes.func.isRequired
};

export default CustomSwitch;
