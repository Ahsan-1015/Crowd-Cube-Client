import { useContext, useState, useEffect } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2'; // Import SweetAlert for success/error handling
import 'animate.css'; // Import Animate.css for animations

import logo from '/logo.png';

const Login = () => {
  const { handleGoogleLogin, handleLogin, currentUser } =
    useContext(authContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    const emailValue = e.target.email.value;
    const password = e.target.password.value;

    setEmail(emailValue); // Save email in state
    handleLogin(emailValue, password)
      .then(() => {
        // Get displayName or fallback to 'User'
        const userName = currentUser?.displayName || 'Dear';

        // Show a SweetAlert for successful login with animations
        Swal.fire({
          title: 'Welcome Back!',
          text: `Hello, ${userName}!`,
          icon: 'success',
          showConfirmButton: false, // No "OK" button
          timer: 2000, // The alert will auto-close after 2 seconds
          timerProgressBar: true, // Adds a progress bar
          showClass: {
            popup: `animate__animated animate__fadeInUp animate__faster`, // Entry animation
          },
          hideClass: {
            popup: `animate__animated animate__fadeOutDown animate__faster`, // Exit animation
          },
        }).then(() => {
          navigate('/');
        });
      })
      .catch(err => {
        setError(err.message);
        // Display SweetAlert error if login fails
        Swal.fire({
          title: 'Login Failed',
          text: 'The email or password is incorrect. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const googleLoginHandler = () => {
    handleGoogleLogin().then(() => {
      // Get displayName or fallback to 'User'
      const userName = currentUser?.displayName || 'Dear';

      // Show a SweetAlert for successful Google login with animations
      Swal.fire({
        title: 'Welcome Back!',
        text: `Hello, ${userName}!`,
        icon: 'success',
        showConfirmButton: false, // No "OK" button
        timer: 2000, // The alert will auto-close after 2 seconds
        timerProgressBar: true, // Adds a progress bar
        showClass: {
          popup: `animate__animated animate__fadeInUp animate__faster`, // Entry animation
        },
        hideClass: {
          popup: `animate__animated animate__fadeOutDown animate__faster`, // Exit animation
        },
      }).then(() => {
        navigate(location.state?.from || '/');
      });
    });
  };

  return (
    <div className="flex justify-center items-center py-8 md:py-20 ">
      <div className="animate__animated animate__zoomIn rounded-lg p-8 w-full max-w-sm bg-gradient-to-r from-teal-100 to-yellow-100 shadow-xl shadow-orange-300 hover:shadow-2xl hover:shadow-emerald-600 hover:ease-in-out duration-300 ">
        <img
          className="w-40 h-32 mx-auto flex justify-center"
          src={logo}
          alt=""
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-md font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email} // Bind input to state
              onChange={e => setEmail(e.target.value)} // Update email in state
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-md font-semibold text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
            <div
              className="absolute inset-y-0 right-5 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500 w-5 h-5 mt-6" />
              ) : (
                <FaEye className="text-gray-500 w-5 h-5 mt-6" />
              )}
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error.split('/')[1]?.slice(0, 18)}
            </p>
          )}
          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <Link
              to="/forgot-password"
              state={{ email }} // Pass email as state
              className="hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="animate__animated btn btn-primary w-full bg-gray-700 hover:bg-black text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
        <div
          onClick={googleLoginHandler}
          className="mt-6 cursor-pointer animate__animated animate__fadeInUp"
        >
          <div className="flex gap-2 bg-red-500 hover:bg-red-600 w-full items-center justify-center py-2 text-white font-semibold rounded-lg transition duration-300">
            <FaGoogle className="text-2xl font-extrabold" />
            <button>Log In with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
