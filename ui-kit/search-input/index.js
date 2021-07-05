import React from 'react';
import SearchIcon from '../../assets/icons/search-icon';

/**
 * Method to render search input component
 */
export default function SearchInput({ onChange, classStyles, value, onEnter }) {
  const handleKeyUpEvent = (e) => {
    if (e.keyCode === 13) onEnter();
  };
  return (
    <div className={classStyles}>
      <SearchIcon />
      <input
        className='h-5 w-full p-6  border-none outline-none text-sm'
        value={value}
        placeholder='Search for any job, title, keywords or company'
        onChange={onChange}
        onKeyUp={handleKeyUpEvent}
      />
    </div>
  );
}
