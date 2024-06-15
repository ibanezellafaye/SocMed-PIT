import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ logout }) {
  return (
    <div className='flex flex-row bg-white h-screen w-screen overflow-hidden'>
      <Sidebar />
      <div className='flex-1'>
        <Header logout={logout} />
        <div className='p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
