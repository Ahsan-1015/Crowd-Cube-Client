import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import '../MainLayouts/MainLayouts.css';

import Footer from '../Footer/Footer';

const MainLayout = () => {
  return (
    <div className="font-fontSora dark:bg_img ">
      <Navbar></Navbar>
      <div className="w-11/12 2xl:w-10/12 mx-auto min-h-[calc(100vh-482px)] max-w-[2500px] mt-6 pb-9">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
