import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ErrorPage = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100 p-10"
      style={{
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/soft-scratches.png"), linear-gradient(to bottom, #e0f7fa, #ffffff)',
        backgroundSize: 'cover',
      }}
    >
      <div className="text-center p-20 hover:shadow-xl shadow-orange-300 hover:shadow-teal-500 bg-white bg-opacity-70 rounded-lg shadow-lg">
        <h1
          className="text-5xl font-bold text-red-500 animate__animated animate__fadeInDown"
          data-aos="fade-down"
        >
          404 - Page Not Found
        </h1>
        <p className="text-lg mt-4 text-gray-700" data-aos="fade-up">
          Sorry, we couldn't find the page{' '}
          <strong className="text-gray-900">{location.pathname}</strong>.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
          data-aos="zoom-in"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
