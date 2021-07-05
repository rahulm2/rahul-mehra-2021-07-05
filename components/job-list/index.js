import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePositionAction } from '../../store/actions';
import { getJobs } from '../../store/selectors';
import { fetchJobs } from '../../store/thunk';
import Hospital from './hospital';
import JobHeader from './job-list-header';
import { getJobCountReducer } from '../../utils';

/**
 * Method to render job listings present in the app.
 */
export default function JobList() {
  const jobs = useSelector((state) => getJobs(state));
  const dispatch = useDispatch();
  const getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  const jobsCount = useMemo(() => jobs?.reduce(getJobCountReducer, 0), [jobs]);

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

    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className='flex-4 p-6 rounded-sm shadow bg-primary'>
      <JobHeader jobsCount={jobsCount} />
      {jobs && jobs.map((job) => <Hospital key={job.name} hospital={job} />)}
    </div>
  );
}
