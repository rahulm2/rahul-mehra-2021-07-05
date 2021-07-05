import React from 'react';
import JobSearchInput from '../job-search-input';
import SideBar from '../side-bar';
import JobList from '../job-list';

export default function Main() {
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
