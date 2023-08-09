import React, { useRef, useEffect } from 'react';

const TitleInput = ({ titleValue, setTitleValue }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const inputWidth = titleRef.current.scrollWidth;
      const minWidth = 100;
      const maxWidth = 400;
      const finalWidth = Math.min(Math.max(minWidth, inputWidth), maxWidth);
      titleRef.current.style.width = `${finalWidth}px`;
    }
  }, [titleValue]);

  return (
    <div className="container title my-2">
      <input
        ref={titleRef}
        type="text"
        style={{ border: 'none' }}
        className="form-control titleName"
        name="example-text-input"
        placeholder="Title"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
    </div>
  );
};

export default TitleInput;
