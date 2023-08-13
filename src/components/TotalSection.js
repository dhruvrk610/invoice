import React from 'react';

const TotalSection = (props) => {
  return (
    <div className='total-section'>
            <div className='container'>
              <div>
                <h4>Total Amount: {isNaN(props.formattedTotalAmount) ? '0.00' : props.formattedTotalAmount}  <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
              </div>
              <div>
                <h4>Discount: ({props.discountRate}%): {isNaN(props.formatteddiscountAmount) ? '0.00' : props.formatteddiscountAmount} <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
              </div>
              <hr />
              <div>
                <h4>Grand Total: {isNaN(props.formattedGrandTotal) ? '0.00' : props.formattedGrandTotal}  <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
              </div>
              <hr />
            </div>
          </div>
  );
};

export default TotalSection;
