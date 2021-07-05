import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBarSection from './side-bar-section';
import { fetchFilters } from '../../store/thunk';
import { getFilters } from '../../store/selectors';

/**
 * Method to render filters as sidebars
 */
export default function SideBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
  }, [dispatch]);

  const filters = useSelector((state) => getFilters(state));

  return (
    <section className='hidden flex flex-1 flex-col gap-4 md:block'>
      {Object.keys(filters).map((filter) => (
        <SideBarSection
          key={filter}
          heading={filter}
          filterValues={filters[filter]}
        />
      ))}
    </section>
  );
}
