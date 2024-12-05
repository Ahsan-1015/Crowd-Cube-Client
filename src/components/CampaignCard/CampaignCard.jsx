import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import 'animate.css';

const CampaignCard = ({ campaign }) => {
  const {
    _id,
    title,
    image,
    description,
    status,
    contactInfo,
    division,
    minDonation,
  } = campaign || {};

  return (
    <div
      data-aos="fade-up"
      className="animate__animated animate__fadeIn animate__delay-1s"
    >
      <div
        key={_id}
        className="card lg:h-[500px] bg-white shadow-lg hover:shadow-blue-300 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden rounded-lg"
      >
        {/* Image Section */}
        <div className="relative h-48">
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
          {/* Status Badge */}
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow">
            {status}
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-6">
          <h2 className="card-title text-2xl font-semibold text-gray-800 mb-2">
            {title}
          </h2>
          <p
            className="text-sm text-gray-600 mb-4 truncate"
            title={description}
          >
            {description}
          </p>

          {/* Division and Contact */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-blue-600 text-sm font-medium bg-blue-100 px-3 py-1 rounded">
              {division || 'General'}
            </span>
            <span className="text-gray-500 text-sm">
              Contact: {contactInfo}
            </span>
          </div>

          <h1> Min Donation {minDonation}</h1>

          {/* Call to Action */}
          <div className="card-actions flex justify-between items-center">
            <NavLink to={`/details/${_id}`}>
              <button className="w-full py-3 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                View Campaign
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
CampaignCard.propTypes = {
  campaign: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    contactInfo: PropTypes.string,
    division: PropTypes.string,
  }),
};

// Define default props for missing optional values
CampaignCard.defaultProps = {
  campaign: {
    image: '',
    description: 'No description available.',
    contactInfo: 'Not provided',
    division: 'Unknown',
  },
};

export default CampaignCard;
