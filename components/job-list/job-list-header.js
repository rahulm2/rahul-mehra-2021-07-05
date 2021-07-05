import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSortersAction } from '../../store/actions';
import { getSorters } from '../../store/selectors';
import { fetchJobs } from '../../store/thunk';
import { SORT_BY_TEXT } from '../../text-strings';

/**
 * Method to render job list sorters and count
 * @param {object} jobs - object containing jobs postings
 */
export default function JobHeader({ jobsCount }) {
  const dispatch = useDispatch();
  const sorters = useSelector((state) => getSorters(state));

  const handleSortClick = useCallback((e) => {
    dispatch(updateSortersAction(e.target.id));
    dispatch(fetchJobs());
  }, []);

  return (
    <div className='flex justify-between mb-4'>
      <span>
        <b>{jobsCount}</b>
        {' job postings'}
      </span>
      <ul className='hidden md:flex md:gap-2'>
        <li className='text-gray'>{SORT_BY_TEXT}</li>
        {Object.keys(sorters)
          .reverse()
          .map((sortItem) => (
            <li
              id={sortItem}
              key={sortItem}
              onClick={handleSortClick}
              className='cursor-pointer'
            >
              {sortItem}
            </li>
          ))}
      </ul>
    </div>
  );
}
