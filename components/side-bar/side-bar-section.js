import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../store/thunk';
import Modal from '../../ui-kit/modal';
import { getAppliedFilters } from '../../store/selectors';
import { updateAppliedFiltersAction } from '../../store/actions';
import { SHOW_MORE_TEXT } from '../../text-strings';

/**
 * Method to render filter section
 * @param {string} heading - heading of the filter.
 * @param {Array} filterValues = array containing filter values.
 */
export default function SideBarSection({ heading, filterValues }) {
  const appliedFilters = useSelector((state) => getAppliedFilters(state));
  const [openModal, setOpenModal] = useState(false);
  const LIMIT = 10;
  const dispatch = useDispatch();
  const elementLength = filterValues.length;

  const handleMoreClick = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleClose = useCallback((e) => {
    if (e.target.id === 'modal') {
      setOpenModal(false);
    }
  }, []);

  const handleFilterClick = useCallback(
    (e) => {
      dispatch(
        updateAppliedFiltersAction({ key: heading, value: e.target.id })
      );
      dispatch(fetchJobs());
    },
    [dispatch]
  );

  return (
    <div className='px-4 py-4 mb-4 rounded-sm shadow bg-primary'>
      <h2 className='text-left'>
        {heading.split('_').join(' ').toUpperCase()}
      </h2>
      <ul className='py-2'>
        {filterValues.slice(0, LIMIT).map((value) => {
          return (
            <li className='flex items-center gap-3' key={value.key}>
              <input
                type='checkbox'
                id={value.key}
                name={value.key}
                checked={
                  appliedFilters && appliedFilters[heading]?.includes(value.key)
                }
                onClick={handleFilterClick}
              />
              <label htmlFor={value.key}>
                {value.key} <span className='text-gray'>{value.doc_count}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {LIMIT < elementLength && (
        <div onClick={handleMoreClick}>{SHOW_MORE_TEXT}</div>
      )}
      {openModal && (
        <Modal heading={heading} handleClose={handleClose}>
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
        </Modal>
      )}
    </div>
  );
}
