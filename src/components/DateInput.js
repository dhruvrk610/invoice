import React from 'react';

const DateInput = ({ currentDate }) => {
  return (
    <div className="mb-3">
      <label className="form-label">
        <strong>Current Date: <u>{currentDate}</u></strong>
      </label>
    </div>
  );
};

export default DateInput;
