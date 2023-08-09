import React from 'react';

const InvoiceNumber = ({ invoiceNumber }) => {
  return (
    <div className='mb-3' style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
      <strong>#invoiceNo:<b>{invoiceNumber}</b></strong>
    </div>
  );
};

export default InvoiceNumber;
