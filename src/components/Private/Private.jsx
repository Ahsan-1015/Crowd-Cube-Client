import { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
// import { loader } from '../../assets/loader.png';

// eslint-disable-next-line react/prop-types
const Private = ({ children }) => {
  const { user, loading } = useContext(authContext);
  console.log('private route user', user);
  const location = useLocation();

  if (loading) {
    // false
    return (
      <div className="flex gap-2 items-center">
        <h1 className="font-bold">LOADING </h1>
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <img src="/src/assets/loader.png" alt="" />
      </div>
    );
  }
  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }
  return children;
};

export default Private;
