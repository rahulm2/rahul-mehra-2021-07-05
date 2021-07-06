import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import JobSearchInput from '../job-search-input';
import SideBar from '../side-bar';
import JobList from '../job-list';
import { updatePositionAction } from '../../store/actions';

export default function Main() {
  const dispatch = useDispatch();
  const getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  useEffect(() => {
    getPosition()
      .then((position) => {
        dispatch(
          updatePositionAction({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude
          })
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }, [dispatch]);
  return (
    <main className='flex flex-col md:gap-4 md:m-4'>
      <JobSearchInput />
      <div className='flex flex-col md:flex-row md:gap-4 '>
        <SideBar />
        <JobList />
      </div>
    </main>
  );
}
