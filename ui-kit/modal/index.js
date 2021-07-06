import React from 'react';

/**
 * Method to render Modal.
 */
export default function Modal({
  heading,
  filterValues,
  handleFilterClick,
  handleClose,
  appliedFilters
}) {
  return (
    <div
      id='modal'
      className='fixed flex items-center justify-center z-20 inset-0 w-full h-full bg-modalColor'
      onClick={handleClose}
    >
      <div className='flex flex-col p-6 rounded-sm bg-primary'>
        <div className='flex justify-between'>
          <p>{heading.split('_').join(' ').toUpperCase()}</p>
          <p id='modal' onClick={handleClose}>
            X
          </p>
        </div>
        <hr className='w-full h-px m-4 bg-secondary text-secondary' />
        <ul className='grid grid-cols-4 gap-3 '>
          {filterValues.map((value) => {
            return (
              <li className='flex items-center gap-3' key={value.key}>
                <input
                  type='checkbox'
                  id={value.key}
                  name={value.key}
                  checked={appliedFilters[heading]?.includes(value.key)}
                  onClick={handleFilterClick}
                />
                <label htmlFor={value.key}>
                  {value.key}{' '}
                  <span className='text-gray'>{value.doc_count}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
