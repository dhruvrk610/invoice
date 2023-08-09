import React from 'react';

const ItemTable = ({ items, handleChange, handleRemoveItem, currency, handleAddItem }) => {
    return (
        <div className='table-responsive container'>
            <table className='my-1'>
                <thead>
                    <tr>
                        <th><strong>Item</strong></th>
                        <th><strong>Quantity</strong></th>
                        <th><strong>Price</strong></th>
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
                                    placeholder='Item Description'
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
                            <td>
                                <input
                                    className='form-control'
                                    placeholder={`0.00 ${currency}`}
                                    type='number'
                                    style={{ border: 'none' }}
                                    name='total'
                                    value={item.total}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </td>
                            <td style={{textAlign:'center'}}> 
                                <button className='btn btn-danger btn-icon' aria-label='Button' onClick={() => handleRemoveItem(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
