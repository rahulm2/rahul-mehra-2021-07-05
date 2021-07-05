import React from 'react';

/**
 * Method to render job description
 * @param {string} heading - string representing heading.
 * @param {string} details - string representing job detail.
 */
export default function JobDescription({ heading, detail }) {
  return (
    <div className='flex flex-col py-2 text-sm md:flex-row'>
      <p className='flex-1 font-bold'>{heading + ':'}</p>
      <p className='flex-1'>{detail}</p>
    </div>
  );
}
