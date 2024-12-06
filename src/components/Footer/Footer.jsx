import { NavLink } from 'react-router-dom';
import '../Footer/Footer.css';
import logo from '/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-image text-white py-12">
      {/* Top Section */}
      <div className=" md:w-11/12 2xl:w-10/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-between">
        {/* About Us */}
        <div>
          <NavLink to={'/'}>
            {' '}
            <img
              src={logo}
              alt="Logo"
              className="mb-4 h-28  mx-auto md:mx-0 cursor-pointer"
            />
          </NavLink>
          <p className="text-gray-400 mb-4">
            Crowdfunding the future—join us in building tomorrow’s successes by
            supporting innovative projects.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <NavLink to="/" className="hover:text-yellow-400">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/campaigns" className="hover:text-yellow-400">
                Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink to="/addCampaign" className="hover:text-yellow-400">
                Add New Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink to="/myCampaign" className="hover:text-yellow-400">
                My Campaign
              </NavLink>
            </li>
            <li>
              <NavLink to="/myDonations" className="hover:text-yellow-400">
                My Donation
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Contact Us</h2>
          <p className="text-gray-400">Email: support@crowdcube.com</p>
          <p className="text-gray-400">Phone: +880-123-456789</p>
          <p className="text-gray-400">Address: London, UK</p>
        </div>

        {/* Subscribe */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter for the latest campaigns and updates.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-8 flex-grow rounded-l-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
            />
            <button className="p-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-r-md">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border border-yellow-500" />

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Crowdcube. All Rights Reserved.</p>
        <p>
          <NavLink
            to="/privacy-policy"
            className="hover:text-yellow-400 underline"
          >
            Privacy Policy
          </NavLink>{' '}
          |{' '}
          <NavLink
            to="/terms-conditions"
            className="hover:text-yellow-400 underline"
          >
            Terms & Conditions
          </NavLink>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
