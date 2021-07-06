import React, { useMemo } from 'react';
import JobDescription from './job-description';
import { JOB_DETAILS_BTN_TEXT, SAVE_JOB_BTN_TEXT } from '../../text-strings';

/**
 * Method to render job details
 * @param {object} job - object containing job details and description.
 */
export default function JobDetails({ job }) {
  const jobHours = useMemo(
    () => job.hours.reduce((a, b) => a + b),
    [job.hours]
  );
  return (
    <div className='flex flex-col items-start pb-2 md:flex-row md:items-center'>
      <div className='flex flex-col flex-2'>
        <JobDescription
          heading='Department'
          detail={job.department.join(',')}
        />
        <JobDescription
          heading='Hours/Shifts'
          detail={jobHours + ' / ' + job.job_type}
        />
        <JobDescription heading='Summary' detail={job.description} />
      </div>
      <div className='flex justify-center items-end gap-2 flex-1 flex-row py-2 md:flex-col'>
        <button className='bg-accent text-primary'>
          {JOB_DETAILS_BTN_TEXT}
        </button>
        <button className='border-accent  bg-primary text-accent'>
          {SAVE_JOB_BTN_TEXT}
        </button>
      </div>
    </div>
  );
}
