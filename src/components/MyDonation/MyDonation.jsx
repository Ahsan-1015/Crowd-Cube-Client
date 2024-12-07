import { useState, useEffect, useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MyDonation = () => {
  const { user, loading } = useContext(authContext);
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);

  // Initialize AOS for animation
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      Swal.fire('Please login first!');
      navigate('/login');
      return;
    }

    const fetchDonations = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/myDonations?userEmail=${user.email}`
        );
        const data = await res.json();
        if (res.ok) {
          setDonations(data);
        } else {
          Swal.fire(
            'Error',
            data.message || 'Unable to fetch donations',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error',
          'Something went wrong. Please try again later.',
          `${error}`
        );
      }
    };

    fetchDonations();
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to format date and time
  const formatDateAndTime = dateString => {
    const date = new Date(dateString);
    const dateFormatted = date.toLocaleDateString(); // Format as mm/dd/yyyy
    const timeFormatted = date.toLocaleTimeString(); // Format as hh:mm:ss AM/PM
    return { dateFormatted, timeFormatted };
  };

  return (
    <div className="min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center mb-6">My Donations</h1>
      <p className="text-xl font-semibold text-center mb-6">
        Total Donations: {donations.length}
      </p>
      <div className="grid gap-6 grid-cols-1 w-full">
        {donations.length > 0 ? (
          donations.map(donation => {
            const { dateFormatted, timeFormatted } = formatDateAndTime(
              donation.donatedAt
            );
            return (
              <div
                key={donation._id}
                className="card shadow-lg rounded-lg overflow-hidden bg-white animate__animated animate__fadeInUp"
                data-aos="fade-up"
              >
                <div className="card-body flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0">
                  {/* Left Side: Campaign Info */}
                  <div className="flex-shrink-0 w-full md:w-1/2">
                    <img
                      src={donation.campaignData.image}
                      alt={donation.campaignData.title}
                      className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h2 className="card-title text-xl font-semibold text-gray-800 mb-2">
                      {donation.campaignData.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {donation.campaignData.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Type: </strong>
                      {donation.campaignData.type}
                    </p>
                  </div>

                  {/* Right Side: My Donation Info */}
                  <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                      My Donation
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-gray-800">
                          Donation Amount:
                        </span>{' '}
                        ${donation.minDonation}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Donated By:
                        </span>{' '}
                        {donation.username}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Description:
                        </span>{' '}
                        {donation.description || 'N/A'}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Date:
                        </span>{' '}
                        {dateFormatted}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Time:
                        </span>{' '}
                        {timeFormatted}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No donations found.</p>
        )}
      </div>
    </div>
  );
};

export default MyDonation;
