import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import auth from '../../firebase/firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import logo from '/logo.png';
const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || ''); // Get email from state
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      setMessage('');
      setError('');
      await sendPasswordResetEmail(auth, email);
      setMessage('Reset link sent to your email');

      // Redirect to Gmail after showing success message
      setTimeout(() => {
        window.open('https://mail.google.com', '_blank'); // Open Gmail in a new tab
        navigate('/login'); // Redirect back to the login page
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center p-10">
      <div className="rounded-lg p-10 w-full max-w-sm bg-gradient-to-r from-teal-100 to-yellow-100 shadow-xl shadow-orange-300 hover:shadow-2xl hover:shadow-emerald-600 hover:ease-in-out duration-300 ">
        <img
          className="w-40 h-32 mx-auto flex justify-center"
          src={logo}
          alt=""
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-md font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email} // Display email from state
              onChange={e => setEmail(e.target.value)} // Update email in state
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-primary w-full bg-gray-700 hover:bg-black text-lg text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
