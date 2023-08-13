import React from 'react';

const TotalSection = (props) => {
  return (
    <div className='total-section'>
            <div className='container'>
              <div>
                <h4>Total Amount: {isNaN(props.formattedTotalAmount) ? 'Plz Enter Values...' : props.formattedTotalAmount}  <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
              </div>
              <div>
                <h4>Discount: ({props.discountRate}%): {isNaN(props.formatteddiscountAmount) ? 'Plz Enter Values...' : props.formatteddiscountAmount} <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
              </div>
              <hr />
              <div>
                <h4>Grand Total: {isNaN(props.formattedGrandTotal) ? 'Plz Enter Values...' : props.formattedGrandTotal}  <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
              </div>
              <hr />
            </div>
          </div>
  );
};

export default TotalSection;
