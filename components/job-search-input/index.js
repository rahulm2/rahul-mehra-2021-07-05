import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchValueAction } from '../../store/actions';
import { getSearchValue } from '../../store/selectors';
import { fetchJobs } from '../../store/thunk';
import SearchInput from '../../ui-kit/search-input';

/**
 * Method to render job search component
 */
export default function JobSearchInput() {
  const dispatch = useDispatch();
  const value = useSelector((state) => getSearchValue(state));

  const handleOnChange = useCallback((e) => {
    dispatch(updateSearchValueAction(e.target.value));
  }, []);

  const handleOnEnterEvent = () => {
    dispatch(fetchJobs());
  };

  return (
    <SearchInput
      onChange={handleOnChange}
      onEnter={handleOnEnterEvent}
      classStyles='flex items-center px-6 my-0.5 md:px-4 rounded-sm shadow  bg-primary focus-within:ring-2'
      value={value}
    />
  );
}
