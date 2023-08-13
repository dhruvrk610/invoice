import React from 'react';

const ItemTable = ({ items, handleChange, handleRemoveItem, currency, handleAddItem,selectedInvoiceType,applyIGST,calculateTotalWithTaxes }) => {
    return (
        <div className='table-responsive container'>
            <table className="my-1">
              <thead>
                <tr>
                  <th><strong>Item</strong></th>
                  <th><strong>Quantity</strong></th>
                  <th><strong>Price</strong></th>
                  {selectedInvoiceType === 'gstInvoice' && !applyIGST && (
                    <>
                      <th><strong>SGST(in %)</strong></th>
                      <th><strong>CGST(in %)</strong></th>
                    </>
                  )}
                  {applyIGST && (
                    <th><strong>IGST(in %)</strong></th>
                  )}
                  <th><strong>Total</strong></th>
                  <th><strong>Actions</strong></th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        required
                        className='form-control'
                        style={{ border: 'none' }}
                        placeholder='Item name'
                        type='text'
                        name='itemName'
                        value={item.itemName}
                        onChange={(e) => handleChange(index, e)}
                      />

                      <input
                        className='form-control my-2 desc'
                        placeholder={selectedInvoiceType === 'normalInvoice' ? 'Item description' : 'HSN CODE'}
                        type='text'
                        style={{ border: 'none' }}
                        name='descreption'
                        id='descreption'
                        value={item.itemDiscription}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        required
                        className='form-control'
                        placeholder='1'
                        type='number'
                        style={{ border: 'none' }}
                        name='quantity'
                        value={item.quantity}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        required
                        className='form-control'
                        placeholder={`0.00 ${currency}`}
                        type='number'
                        style={{ border: 'none' }}
                        name='price'
                        value={item.price}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </td>
                    {selectedInvoiceType === 'gstInvoice' && !applyIGST && (
                      <>
                        <td>
                          <input
                            required
                            className='form-control'
                            placeholder={`0.00 %`}
                            type='number'
                            style={{ border: 'none' }}
                            id='sgstRateValue'
                            name='sgst'
                            value={item.sgst}
                            onChange={(e) => handleChange(index, e)}
                          />
                          <input
                            readOnly
                            className='form-control my-2'
                            placeholder={`0.00 ${currency}`}
                            type='number'
                            style={{ border: 'none' }}

                            id='sgstInRupee'
                            value={(item.price * (item.sgst / 100)).toFixed(2)}
                          />
                        </td>
                        <td>
                          <input
                            required
                            className='form-control'
                            placeholder={`0.00 %`}
                            type='number'
                            style={{ border: 'none' }}
                            name='cgst'
                            value={item.cgst}
                            onChange={(e) => handleChange(index, e)}
                          />
                          <input
                            readOnly
                            className='form-control my-2'
                            placeholder={`0.00 ${currency}`}
                            type='number'
                            style={{ border: 'none' }}

                            id='cgstInRupee'
                            value={(item.price * (item.cgst / 100)).toFixed(2)}

                          />
                        </td>
                      </>
                    )}
                    {applyIGST && (
                      <td>
                        <input
                          required
                          className='form-control'
                          placeholder={`0.00 %`}
                          type='number'
                          style={{ border: 'none' }}
                          id='sgstRateValue'
                          name='igst'
                          value={item.igst}
                          onChange={(e) => handleChange(index, e)}
                        />
                        <input
                          readOnly
                          className='form-control my-2'
                          placeholder={`0.00 ${currency}`}
                          type='number'
                          style={{ border: 'none' }}

                          id='igstInRupee'
                          value={(item.price * (item.igst / 100)).toFixed(2)}
                        />
                      </td>

                    )}
                    <td>
                      <input
                        readOnly
                        className='form-control'
                        placeholder={`0.00 ${currency}`}
                        type='number'
                        style={{ border: 'none' }}
                        name='total'
                        value={
                          selectedInvoiceType === 'gstInvoice'
                            ? calculateTotalWithTaxes(item.quantity, item.price, item.sgst, item.cgst, item.igst, applyIGST)
                            : item.total
                        }
                        onChange={(e) => handleChange(index, e)}
                      />
                    </td>
                    <td style={{textAlign:'center'}}>
                      <button className="btn btn-danger btn-icon" aria-label="Button" onClick={() => handleRemoveItem(index)} >

                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M4 7l16 0"></path>
                          <path d="M10 11l0 6"></path>
                          <path d="M14 11l0 6"></path>
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                        </svg>
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type='button' className='btn btn-primary my-2' onClick={handleAddItem}>Add Item</button>
          </div>
    );
};

export default ItemTable;
