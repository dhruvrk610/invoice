import React from 'react';

const TotalSection = (props) => {
  return (
    <div className='total-section'>
      <div className='container'>
        <div>
          <h4>Total Amount: {props.formattedTotalAmount} <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
        </div>
        {props.applyIGST && (
          <div>
            <h4>IGST (18%): {props.formattedGstAmount} <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
          </div>)}
        {!(props.applyIGST) && (
          <>
            <div>
              <h4>CGST (9%): {props.formattedCgstAmount} <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
            </div>
            <div>
              <h4>SGST (9%): {props.formattedSgstAmount} <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
            </div>
          </>
        )}
        <div>
          <h4>Total GST (18%): {props.formattedGstAmount} <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
        </div>
        <div>
          <h4>Discount ({props.discountRate}%): {props.formatteddiscountAmount} <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
        </div>
        <hr />
        <div>
          <h4>Grand Total: {props.formattedGrandTotal} <span dangerouslySetInnerHTML={{ __html: props.currency }} /></h4>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default TotalSection;
