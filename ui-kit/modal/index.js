import React from 'react';

/**
 * Method to render Modal.
 */
export default function Modal(props) {
  const { handleClose, heading } = props;
  return (
    <div
      id='modal'
      className='fixed flex items-center justify-center z-20 inset-0 w-full h-full bg-modalColor'
      onClick={handleClose}
    >
      <div className='flex flex-col p-6 rounded-sm bg-primary'>
        <div className='flex justify-between'>
          <p>{heading.split('_').join(' ').toUpperCase()}</p>
          <p id='modal' className='cursor-pointer' onClick={handleClose}>
            X
          </p>
        </div>
        <hr className='w-full h-px m-4 bg-secondary text-secondary' />
        {props.children}
      </div>
    </div>
  );
}
