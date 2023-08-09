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

   const handleCurrencyChange = (event) => {
      setCurrency(event.target.value);
   };


   const gstRate = 18;
   const cgstRate = 9;
   const sgstRate = 9;

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
      { itemName: '', quantity: 1, price: '', total: '' },
   ]);

   const handleAddItem = () => {
      setItems([...items, { itemName: '', quantity: '', price: '', total: '' }]);
   };

   const handleChange = (index, event) => {
      const { name, value } = event.target;
      const newItems = [...items];

      // If the changed field is quantity or price, calculate the total
      if (name === 'quantity' || name === 'price') {
         const quantity = name === 'quantity' ? parseFloat(value) : parseFloat(newItems[index].quantity);
         const price = name === 'price' ? parseFloat(value) : parseFloat(newItems[index].price);
         const total = (quantity * price).toFixed(2);

         newItems[index] = { ...newItems[index], [name]: value, total };
      } else {
         newItems[index] = { ...newItems[index], [name]: value };
      }

      setItems(newItems);
   };

   const handleRemoveItem = (index) => {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
   };

   const calculateTotal = () => {
      return items.reduce((total, item) => total + item.quantity * item.price, 0);
   };

   const [discountRate, setDiscountRate] = useState(0);

   const handleDiscountRateChange = (event) => {
      const rate = parseFloat(event.target.value);
      setDiscountRate(rate);
   };

   const totalAmount = calculateTotal();
   const gstAmount = (totalAmount * gstRate) / 100;
   const cgstAmount = (totalAmount * cgstRate) / 100;
   const sgstAmount = (totalAmount * sgstRate) / 100;
   const discountAmount = (totalAmount * discountRate) / 100;
   const grandTotal = totalAmount + gstAmount + cgstAmount + sgstAmount - discountAmount;

   const formattedTotalAmount = totalAmount.toFixed(2).toLocaleString();
   const formattedGstAmount = gstAmount.toFixed(2).toLocaleString();
   const formattedCgstAmount = cgstAmount.toFixed(2).toLocaleString();
   const formatteddiscountAmount = discountAmount.toFixed(2).toLocaleString();
   const formattedSgstAmount = sgstAmount.toFixed(2).toLocaleString();
   const formattedGrandTotal = grandTotal.toFixed(2).toLocaleString();

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
               <ItemTable items={items} handleChange={handleChange} handleRemoveItem={handleRemoveItem} currency={currency} handleAddItem={handleAddItem} />
               <TotalSection
                  formattedTotalAmount={formattedTotalAmount}
                  formattedGstAmount={formattedGstAmount}
                  formattedCgstAmount={formattedCgstAmount}
                  formattedSgstAmount={formattedSgstAmount}
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

            </div>
         </div>
      </>
   );
};

export default App;
