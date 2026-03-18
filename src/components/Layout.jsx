import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col pt-[72px] relative z-10 w-full overflow-hidden">
      <Navbar />
      <main key={location.pathname} className="flex-1 flex flex-col page-enter w-full max-w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
