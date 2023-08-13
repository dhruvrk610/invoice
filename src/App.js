import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import './App.css';
import TitleInput from './components/TitleInput';
import DateInput from './components/DateInput';
import InvoiceNumber from './components/InvoiceNumber';
import DueDateInput from './components/DueDateInput';
import BillTo from './components/BillTo';
import BillFrom from './components/BillFrom';
import ItemTable from './components/ItemTable';
import TotalSection from './components/TotalSection';
import NotesSection from './components/NotesSection';
// ... import other components

const App = () => {
  

  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1.
    const year = today.getFullYear();
    return <b>{day}-{month}-{year}</b>;
  };

  const currentDate = getCurrentDate();
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const titleRef = useRef(null);
  const [titleValue, setTitleValue] = useState('INVOICE')
  const [currency, setCurrency] = useState('₹');
  const [noteText, setNoteText] = useState('Thank You !!!');
  const [applyIGST, setApplyIGST] = useState(false);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState('normalInvoice');
  


  const handleApplyIGSTChange = (event) => {
    setApplyIGST(event.target.checked);
    const updatedItems = items.map((item) => ({
      ...item,
      igst: event.target.checked ? '' : '0', // Reset IGST value or set to '0'
      total: calculateTotalWithTaxes(item.quantity, item.price, item.sgst, item.cgst, event.target.checked ? item.igst : '0', event.target.checked),
    }));
    setItems(updatedItems);
  };
  


  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleInvoiceTypeChange = (newInvoiceType) => {
    setSelectedInvoiceType(newInvoiceType);
    setApplyIGST(false); // Reset IGST checkbox when switching invoice types
    setItems([{ itemName: '', quantity: '', price: '', total: '', sgst: '', cgst: '', igst: '' }]);
  };

  useEffect(() => {
    // Calculate the width of the input field based on its content
    if (titleRef.current) {
      const inputWidth = titleRef.current.scrollWidth;

      // Set the minimum and maximum width for the input field
      const minWidth = 100; // Set your desired minimum width in pixels
      const maxWidth = 400; // Set your desired maximum width in pixels
      const finalWidth = Math.min(Math.max(minWidth, inputWidth), maxWidth);

      titleRef.current.style.width = `${finalWidth}px`;
    }
  }, [titleValue]);

  const [items, setItems] = useState([
    { itemName: '', quantity: 1, price: '', total: '', sgst: '', cgst: '', igst: '' },
  ]);

  const handleAddItem = () => {
    setItems([...items, { itemName: '', quantity: '', price: '', total: '', sgst: '', cgst: '', igst: '' }]);
  };

  const calculateTotalWithTaxes = (quantity, price, sgst, cgst, igst, applyIGST) => {
    if (applyIGST) {
      return (quantity * price * (1 + igst / 100)).toFixed(2);
    } else {
      return (
        quantity * price +
        (quantity * price * sgst / 100) +
        (quantity * price * cgst / 100)
      ).toFixed(2);
    }
  };
  
  // ------------------------------------------------------------------------

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
  
    
    
    if (name === 'quantity' || name === 'price' || name === 'sgst' || name === 'cgst' || name === 'igst') {
      const quantity = name === 'quantity' ? parseFloat(value) : parseFloat(newItems[index].quantity);
      const price = name === 'price' ? parseFloat(value) : parseFloat(newItems[index].price);
      let sgst = parseFloat(newItems[index].sgst);
      let cgst = parseFloat(newItems[index].cgst);
      let igst = parseFloat(newItems[index].igst);
  
      let total;
      if (selectedInvoiceType === 'gstInvoice') {
        if (name === 'sgst') {
          sgst = parseFloat(value);
        }
        if (name === 'cgst') {
          cgst = parseFloat(value);
        }
        if (name === 'igst') {
          igst = parseFloat(value);
        }
        total = calculateTotalWithTaxes(quantity, price, sgst, cgst, igst, applyIGST);
      } else {
        sgst = 0; // Reset sgst to zero for Normal Invoice
        cgst = 0; // Reset cgst to zero for Normal Invoice
        igst = 0;
        total = (quantity * price).toFixed(2); // Calculate total without taxes for Normal Invoice
      }
  
      newItems[index] = { ...newItems[index], [name]: value, sgst, cgst,igst, total };
    } else {
      newItems[index] = { ...newItems[index], [name]: value };
    }
  
    setItems(newItems);
  };
  
  
  
  
// -----------------------------------------------------------------------------

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  
// --------------------------------------------------------------------------
const calculateTotal = ()=>{
  if(selectedInvoiceType === 'normalInvoice'){
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  else {
    return items.reduce((total, item) => total + parseFloat(item.total), 0);
  }
}
  
// ----------------------------------------------------------------------------
  const [discountRate, setDiscountRate] = useState(0);

  const handleDiscountRateChange = (event) => {
    const rate = parseFloat(event.target.value);
    setDiscountRate(rate);
  };

  const totalAmount = calculateTotal();

  const discountAmount = (totalAmount * discountRate) / 100;

  const grandTotal = totalAmount - discountAmount;



  const formattedTotalAmount = totalAmount.toFixed(2).toLocaleString();
  const formatteddiscountAmount = discountAmount.toFixed(2).toLocaleString();
  const formattedGrandTotal = grandTotal.toFixed(2).toLocaleString();

// -----------------------------------------------------------------------------

  const handleDownload = () => {


    // Check if all required fields for the dynamic items are filled
    const allItemsFieldsFilled = items.every(
      (item) =>
        item.itemName.trim() !== '' &&
        item.quantity !== '' &&
        item.price !== '' &&
        item.total !== ''
    );

    // Check if all required fields for the billTo section are filled
    const billToInputs = document.querySelectorAll('.billTo input[required]');
    const billToFieldsFilled = Array.from(billToInputs).every((input) => input.value.trim() !== '');

    // Check if all required fields for the billFrom section are filled
    const billFromInputs = document.querySelectorAll('.billFrom input[required]');
    const billFromFieldsFilled = Array.from(billFromInputs).every((input) => input.value.trim() !== '');

    if (!allItemsFieldsFilled || !billToFieldsFilled || !billFromFieldsFilled) {
      alert('Please fill in all the required fields before downloading the invoice.');
      return;
    }

    if (selectedInvoiceType === 'gstInvoice') {
      const requiredTaxFieldsFilled = items.every(item => {
        if (applyIGST) {
          return item.igst !== '';
        } else {
          return item.sgst !== '' && item.cgst !== '';
        }
      });
  
      if (!requiredTaxFieldsFilled) {
        alert('Please fill in all the required tax fields before downloading the invoice.');
        return;
      }
    }

    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1.
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const opt = {
      margin: 0,
      filename: `invoice#${invoiceNumber}_(${formattedDate}).pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', precision: '2' },
    };

    // Select the container element with the class 'invoice-generator'
    const container = document.querySelector('.left-content');

    // Clone the container element to remove the buttons and other components
    const printableContainer = container.cloneNode(true);

    // Remove buttons from the cloned container
    const buttons = printableContainer.querySelectorAll('button');
    buttons.forEach((button) => button.remove());

    const componentsToRemove = printableContainer.querySelectorAll('.notes');
    componentsToRemove.forEach((component) => component.remove());

    // Add the 'printable' class to the cloned container element
    printableContainer.classList.add('printable');

    // Remove the "Remove" column from the table in the cloned container
    const table = printableContainer.querySelector('table');
    const removeColumnIndex = 4; // Adjust this index based on the column position in your table
    const tableRows = table.querySelectorAll('tr');
    tableRows.forEach((row) => {
      row.deleteCell(removeColumnIndex);
    });


    html2pdf()
      .from(printableContainer)
      .set(opt)
      .save();

    // After successful download, reset the input fields to their initial values
    setTitleValue('INVOICE');
    setCurrency('₹');
    setDiscountRate(0);

    const initialItems = [{ itemName: '', quantity: 1, price: '', total: '' }];
    setItems(initialItems);

    const itemDescriptionInputs = document.querySelectorAll('.table-responsive input[name="descreption"]');
    itemDescriptionInputs.forEach((input) => (input.value = ''));

    // Clear billTo input fields
    const billToInputsClear = document.querySelectorAll('.billTo input[required]');
    billToInputsClear.forEach((input) => (input.value = ''));

    // Clear billFrom input fields
    const billFromInputsClear = document.querySelectorAll('.billFrom input[required]');
    billFromInputsClear.forEach((input) => (input.value = ''));

    setInvoiceNumber((prevInvoiceNumber) => prevInvoiceNumber + 1);
    // Additional code to generate and download the invoice


  };




 

  return (
    <>
      <div className='main-container'>
        <div className='left-content'>
          <TitleInput titleValue={titleValue} setTitleValue={setTitleValue} />

          <div className='header container' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <DateInput currentDate={currentDate} />
              <DueDateInput />
            </div>
            <InvoiceNumber invoiceNumber={invoiceNumber} />
          </div>

          <hr />
          <div className='bill-details'>
            <div className='container'>
              <BillTo />
            </div>
            <div className='container'>
              <BillFrom />
            </div>
          </div>
          <hr />
          <ItemTable items={items} handleChange={handleChange} handleRemoveItem={handleRemoveItem} currency={currency} handleAddItem={handleAddItem} selectedInvoiceType={selectedInvoiceType}
          applyIGST={applyIGST} calculateTotalWithTaxes={calculateTotalWithTaxes} 
          />

          <TotalSection
            formattedTotalAmount={formattedTotalAmount}
            formatteddiscountAmount={formatteddiscountAmount}
            formattedGrandTotal={formattedGrandTotal}
            currency={currency}
            discountRate={discountRate}
          />
          <NotesSection noteText={noteText} setNoteText={setNoteText} />
        </div>
        <div className='right-content container'>
          <div className='container my-1'>
            <button className='btn btn-primary' style={{ width: '100%' }} onClick={handleDownload} >Download Invoice</button>
          </div>

          <div className='container my-3'>
            <label htmlFor=""><h4>Choose Currency:</h4></label>
            <select name="" id="" className="" value={currency} onChange={handleCurrencyChange}>
              <option value="₹">&#8377; Rupees</option>
              <option value="$">&#36; Dollar</option>
              <option value="€">&#8364; Euro</option>
              <option value="£">&#163; Pound</option>
              <option value="¥">&#165; Yen</option>
              <option value="฿">&#8383; Bitcoin</option>
              <option value="元">&#20803; Yuan</option>
            </select>
          </div>
          <div className="mb-3 my-3 container ">
            <label className="form-label"><h4>Discount Rate:</h4></label>
            <input
              type="number"
              className="form-control"
              name="example-text-input"
              id="discountRate"
              placeholder="0.00 %"
              value={discountRate}
              onChange={handleDiscountRateChange}
            />
          </div>
          <div className="mb-3 container">
            <div className="input-group mb-2">
              <span className="input-group-text">
                <input className="form-check-input m-0" type="checkbox" checked={applyIGST} onChange={handleApplyIGSTChange} disabled={selectedInvoiceType === 'normalInvoice'} />
              </span>
              <input type="text" className="form-control" value="IGST applied" autoComplete="off" style={{ fontWeight: 'bold' }} />
            </div>
          </div>
          <div className='container'>
            <br />
            <h3>Invoice Type:</h3>

            <div className="form-check my-3">
              <input className="form-check-input" type="radio" name="flexRadioDefault"
                id="gstInvoice"
                checked={selectedInvoiceType === 'gstInvoice'} // Check if it's the selected type
                onChange={() => handleInvoiceTypeChange('gstInvoice')} />
              <label className="form-check-label" htmlFor="gstInvoice">
                <h4>GST Invoice</h4>
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault"
                id="normalInvoice"
                checked={selectedInvoiceType === 'normalInvoice'} // Check if 
                onChange={() => handleInvoiceTypeChange('normalInvoice')}
                />
              <label className="form-check-label" htmlFor="normalInvoice">
                <h4>Normal Invoice</h4>
              </label>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default App;
