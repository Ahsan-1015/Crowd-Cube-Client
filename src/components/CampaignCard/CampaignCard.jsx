import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import 'animate.css';
import './CampaignCard.css'; // External CSS for custom styling
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CampaignCard = ({ campaign }) => {
  const { _id, title, image, deadline, type, minDonation } = campaign || {};

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Calculate status based on the deadline
  const currentDate = new Date();
  const isRunning =
    deadline && new Date(deadline) > currentDate ? 'Running' : 'Deadline Over';

  return (
    <div
      data-aos="fade-up"
      className="animate__animated animate__fadeIn animate__delay-1s p-4 rounded-xl border border-yellow-600"
    >
      <div
        key={_id}
        className="campaign-card-container card lg:h-[500px] shadow-lg transform transition-transform duration-300 relative overflow-hidden rounded-lg"
      >
        {/* Status Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-white text-sm font-bold z-10 ${
            isRunning === 'Running'
              ? 'bg-green-500 animate-bounce'
              : 'bg-red-500'
          }`}
        >
          {isRunning}
        </div>

        {/* Image Section */}
        <div className="relative h-[300px]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="h-full w-full bg-gray-300 flex items-center justify-center text-xl text-gray-700 rounded-t-lg">
              No Image Available
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-2 lg:card lg:p-7">
          <h2 className="card-title text-xl lg:text-2xl font-semibold text-yellow-600 dark:text-white mb-2">
            {title}
          </h2>
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm font-medium px-3 py-2 rounded 
    ${type === 'startup' ? 'bg-green-200 text-green-800' : ''} 
    ${type === 'business' ? 'bg-teal-200 text-teal-800' : ''} 
    ${type === 'personal issue' ? 'bg-blue-200 text-blue-800' : ''} 
    ${type === 'creative ideas' ? 'bg-yellow-200 text-yellow-800' : ''} 
    ${!type || type === 'General' ? 'bg-gray-200 text-gray-800' : ''}`}
            >
              {type || 'General'}
            </span>

            <span className="text-gray-500 dark:text-gray-300 text-lg md:text-base font-semibold border p-1 rounded-lg">
              Deadline: {deadline}
            </span>
          </div>
          <h1 className="text-lg text-gray-600 dark:text-white">
            <strong>Min Donation: </strong>
            {minDonation}
          </h1>
        </div>

        {/* Hover Overlay */}
        <div className="hover-overlay flex items-center justify-center">
          <NavLink to={`/campaigns/${_id}`}>
            <button className="hover-btn bg-yellow-500 z-20 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-600">
              See more
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

CampaignCard.propTypes = {
  campaign: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    deadline: PropTypes.string,
    minDonation: PropTypes.number,
  }),
};

export default CampaignCard;
