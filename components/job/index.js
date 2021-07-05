import React, { useCallback, useState, useMemo } from 'react';
import JobDetails from './job-details';
import { weeksBetween } from '../../utils';

/**
 * Method to render single job posting under a given hospital
 * @param {object} job - object containing job details and description.
 */
export default function Job({ job }) {
  const [toggle, setToggle] = useState(false);
  const handleOnClick = useCallback(() => {
    setToggle((toggle) => !toggle);
  }, []);

  const weeksBetweenMemo = useMemo(
    () => weeksBetween(new Date(), new Date(job.created)),
    [job.created]
  );

  return (
    <div>
      <hr className='w-full h-px bg-secondary text-secondary' />
      <div
        className='flex flex-col justify-between my-3 cursor-pointer md:flex-row md:items-center'
        onClick={handleOnClick}
      >
        <div className='flex flex-col gap-2'>
          <p className='font-bold'>{job.job_title}</p>
          <div className='flex divide-x'>
            <span className='pr-2'>{job.job_type}</span>
            <span className='px-2'>{`$${job.salary_range[0]} - $${job.salary_range[1]} an hour`}</span>
            <span className='px-2'>{job.city}</span>
          </div>
        </div>
        <p className='py-2'>{`${weeksBetweenMemo} weeks ago`}</p>
      </div>
      {toggle && <JobDetails job={job} />}
    </div>
  );
}
