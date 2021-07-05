import React, { useState, useCallback } from 'react';
import Hamburger from '../../assets/icons/hamburger';
import {
  APP_TITLE_TEXT,
  CREATE_JOB_BTN_TEXT,
  LOGOUT_BTN_TEXT
} from '../../text-strings';
import NavLink from './nav-link';
import { navLinks } from '../../constants/nav-link-constants';

export default function Header() {
  const [toggle, setToggle] = useState(false);

  const handleOnClick = useCallback(() => {
    setToggle((toggle) => !toggle);
  }, []);

  return (
    <header>
      <div className='flex flex-1 w-full lg:m-0 lg:pl-2'>
        <Hamburger onClick={handleOnClick} />
        <h1 className='w-full p-4 text-accent text-center font-semibold cursor-pointer lg:py-2 lg:px-0 lg:text-left'>
          {APP_TITLE_TEXT}
        </h1>
      </div>
      <div
        className={`${
          toggle ? 'absolute top-20 shadow' : 'hidden'
        }  flex-2 pl-2 w-full bg-primary z-10 lg:flex lg:flex lg:relative lg:top-0 lg:shadow-none`}
      >
        <nav className='flex flex-col flex-1 lg:flex-row'>
          {navLinks.map((link, idx) => (
            <NavLink key={idx} link={link} />
          ))}
        </nav>
        <nav className='flex flex-col flex-1 justify-end items-start w-full mb-4 lg:items-center lg:flex-row lg:mb-0'>
          <a className='flex items-start w-max px-2 py-2 text-accent border-2 border-blue-500 rounded-3xl cursor-pointer lg:px-6 lg:items-center lg:justify-center'>
            {CREATE_JOB_BTN_TEXT}
          </a>
          <a className='flex items-start w-max px-2 py-2 cursor-pointer lg:px-6 lg:items-center lg:justify-center'>
            {LOGOUT_BTN_TEXT}
          </a>
        </nav>
      </div>
    </header>
  );
}