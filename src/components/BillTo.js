import React from 'react';

const BillTo = () => {
  return (
    <div className='mb-3 billTo'>
      <label className='form-label'><strong>Bill to:</strong></label>
      <input required type='text' style={{ border: 'none' }} className='form-control my-1' name='example-text-input' placeholder='Who is this invoice to?' />
      <input required type='email' style={{ border: 'none' }} className='form-control my-1' name='example-text-input' placeholder='Email Address' />
      <input required type='text' style={{ border: 'none' }} className='form-control' name='example-text-input' placeholder='Billing Address' />
    </div>
  );
};

export default BillTo;
