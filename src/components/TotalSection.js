import React from 'react';

const TotalSection = ({ formattedTotalAmount, formattedGstAmount, formattedCgstAmount, formattedSgstAmount, formatteddiscountAmount, formattedGrandTotal, currency, discountRate }) => {
  return (
    <div className='total-section'>
            <div className='container'>
              <div>
                <h4>Total Amount: {formattedTotalAmount} <span dangerouslySetInnerHTML={{ __html: currency }} /></h4>
              </div>
              <div>
                <h4>CGST (9%): {formattedCgstAmount} <span dangerouslySetInnerHTML={{ __html: currency }} /></h4>
              </div>
              <div>
                <h4>SGST (9%): {formattedSgstAmount} <span dangerouslySetInnerHTML={{ __html: currency }} /></h4>
              </div>
              <div>
                <h4>Total GST (18%): {formattedGstAmount} <span dangerouslySetInnerHTML={{ __html: currency }} /></h4>
              </div>
              <div>
                <h4>Discount ({discountRate}%): {formatteddiscountAmount} <span dangerouslySetInnerHTML={{ __html: currency }} /></h4>
              </div>
              <hr />
              <div>
                <h4>Grand Total: {formattedGrandTotal} <span dangerouslySetInnerHTML={{ __html: currency }} /></h4>
              </div>
              <hr />
            </div>
          </div>
  );
};

export default TotalSection;
