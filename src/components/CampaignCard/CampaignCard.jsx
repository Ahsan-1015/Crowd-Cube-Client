import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import 'animate.css';
import './CampaignCard.css'; // External CSS for custom styling

const CampaignCard = ({ campaign }) => {
  const { _id, title, image, deadline, type } = campaign || {};

  return (
    <div
      data-aos="fade-up"
      className="animate__animated animate__fadeIn animate__delay-1s p-4 rounded-xl border border-yellow-600"
    >
      <div
        key={_id}
        className="campaign-card-container card lg:h-[450px] shadow-lg transform transition-transform duration-300 relative overflow-hidden rounded-lg"
      >
        {/* Image Section */}
        <div className="relative h-80">
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
        <div className="card-body p-6">
          <h2 className="card-title  text-2xl font-semibold text-yellow-600 dark:text-white mb-2">
            {title}
          </h2>
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm font-medium px-3  py-2 rounded 
    ${type === 'startup' ? 'bg-green-200 text-green-800' : ''} 
    ${type === 'business' ? 'bg-teal-200 text-teal-800' : ''} 
    ${type === 'Personal Issue' ? 'bg-blue-200 text-blue-800' : ''} 
    ${type === 'creative ideas' ? 'bg-yellow-200 text-yellow-800' : ''} 
    ${!type || type === 'General' ? 'bg-gray-200 text-gray-800' : ''}`}
            >
              {type || 'General'}
            </span>

            <span className="text-gray-500 dark:text-gray-300 text-lg font-semibold border p-1 rounded-lg">
              Deadline: {deadline}
            </span>
          </div>
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
  }),
};

export default CampaignCard;
