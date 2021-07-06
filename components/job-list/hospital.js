import React, { useState, useCallback } from 'react';
import Job from '../job';

/**
 * Method to render job postings of a given hospital
 * @param {object} hospital - object containing hospital details
 * and job postings.
 */
export default function Hospital({ hospital }) {
  const [toggle, setToggle] = useState(false);
  const handleOnClick = useCallback(() => {
    setToggle((toggle) => !toggle);
  }, []);

  return (
    <div className='flex flex-col py-1'>
      <div
        className='flex items-center gap-4 mb-2 cursor-pointer'
        onClick={handleOnClick}
      >
        <div className='flex items-center justify-center bg-gray text-primary p-1 w-8 rounded-xl'>
          {hospital.name.slice(0, 2).toUpperCase()}
        </div>
        <p>{hospital.total_jobs_in_hospital + ' jobs for ' + hospital.name}</p>
      </div>
      {toggle &&
        hospital.items.map((job) => <Job key={job.job_id} job={job} />)}
    </div>
  );
}
