import React from 'react';

export default function FooterSection({
  classStyles,
  heading,
  paragraphArray
}) {
  return (
    <div className={classStyles}>
      <h2>{heading}</h2>
      {paragraphArray.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </div>
  );
}
