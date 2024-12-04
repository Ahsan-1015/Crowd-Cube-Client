import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import Footer from '../Footer/Footer';

const MainLayout = () => {
  return (
    <div
      className="font-fontSora bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200"
      style={{
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/light-wool.png"), linear-gradient(to bottom, #e0f7fa, #ffffff)',
        backgroundSize: 'cover',
      }}
    >
      <Navbar></Navbar>
      <div className="w-11/12 2xl:w-10/12 mx-auto max-w-[2500px] mt-6 pb-9">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
