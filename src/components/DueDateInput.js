import React from 'react';

const DueDateInput = () => {
  return (
    <div className="mb-3">
      <label className="form-label" style={{ display: 'flex', gap: '2px' }}>
        <strong>Due-Date:</strong> <input type='date' style={{ border: 'none' }} className='form-control' />
      </label>
    </div>
  );
};

export default DueDateInput;
