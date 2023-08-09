import React from 'react';

const NotesSection = ({ noteText, setNoteText }) => {
  return (
    <div className='mb-3 container leftFooter'>
      <label className='form-label notes'>Notes:</label>
      <input type='text' className='form-control noteText' name='example-text-input' style={{ textAlign: 'center', border: 'none' }} placeholder='Thanks for your business!' value={noteText} onChange={(e) => setNoteText(e.target.value)} />
    </div>
  );
};

export default NotesSection;
