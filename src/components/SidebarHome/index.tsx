import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import SidebarItem from './SidebarItem';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSidebar } from '@/redux/reducers/sidebarMain';
import { SIDEBARLIST } from '@/constants/sidebarhome';

const SidebarHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isShow } = useSelector((state: RootState) => state.sidebarMain);
  const [activeMenu, setActiveMenu] = useState('games');



  useEffect(() => {
    if (router.pathname === '/') {
      setActiveMenu('home');
    } else if (router.pathname.startsWith('/job')) {
      setActiveMenu('job');
    } else if (router.pathname.startsWith('/company')) {
      setActiveMenu('company');
    } else if (router.pathname.startsWith('/about-us')) {
      setActiveMenu('about-us');
    } else if (router.pathname.startsWith('/contact')) {
      setActiveMenu('contact');
    }
  }, [router.pathname]);

  const handleSetShowSidebar = () => {
    dispatch(setShowSidebar(false));
  };

  return (
    <>
      <div onClick={handleSetShowSidebar} className={`sidebar-mask ${isShow && 'isShow'}`}></div>
      <div className={`sidebarhome ${isShow && 'isShow'}`}>
        <ul className="sidebarhome-menu ">
          {SIDEBARLIST.map((item, index) => (
            <SidebarItem key={index}  activeItem={activeMenu} item={item} index={index} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default SidebarHome;
