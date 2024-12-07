import { useContext, useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Details/Details.css';

const Details = () => {
  const campaign = useLoaderData();
  const { title, description, image, deadline, minDonation, type } = campaign;

  const { user, loading } = useContext(authContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    minDonation: '',
    description: '', // Initialize the description field
  });

  const [isCampaignExpired, setIsCampaignExpired] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Check if the campaign is expired
    const currentDate = new Date();
    const campaignDeadline = new Date(deadline);

    if (currentDate > campaignDeadline) {
      setIsCampaignExpired(true);
    }
  }, [deadline]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDonate = async e => {
    e.preventDefault();

    if (!user) {
      Swal.fire('Please login first!');
      navigate('/login');
      return;
    }

    // Validate the donation amount
    if (parseFloat(form.minDonation) < parseFloat(minDonation)) {
      Swal.fire({
        icon: 'error',
        title: 'Donation Too Low',
        text: `Please donate at least $${minDonation} or more.`,
      });
      return;
    }

    const donationData = {
      campaignId: campaign._id,
      userEmail: form.email,
      username: form.name,
      minDonation: form.minDonation,
      description: form.description, // Add description to the donation data
    };

    try {
      const res = await fetch('http://localhost:8000/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Thank you for your donation!',
          text: 'Your donation has been submitted successfully.',
        });
        setForm({ ...form, minDonation: '', description: '' }); // Reset the form fields
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong, please try again.',
        });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to process your donation. Please try again later.',
      });
    }
  };

  if (!loading && !user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex justify-center items-center py-10">
      <div className="grid xl:grid-cols-2 gap-6 items-center border border-yellow-300 p-3 rounded-lg w-full">
        <div
          className="relative md:h-[600px] xl:h-[600px] rounded-lg overflow-hidden shadow-lg"
          data-aos="fade-right"
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative flex flex-col items-center justify-center h-full text-center text-white p-6 space-y-4 backdrop-blur-sm">
            <h1 className="text-4xl font-bold text-yellow-500">{title}</h1>
            <p className="text-lg font-base">{description}</p>
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
            <div className="mt-4 p-3 bg-blue-600 min_bg text-white rounded-lg shadow-lg">
              <p className="text-xl font-bold ">Minimum Donation:</p>
              <p className="text-2xl font-semibold text-green-400">
                ${minDonation}
              </p>
            </div>
            <p className="mt-4 text-md">
              <strong>Deadline:</strong> {deadline}
            </p>
            {isCampaignExpired && (
              <p className="mt-2 text-red-500 font-semibold bg-white p-3 rounded-lg">
                This campaign has ended. Donations are no longer accepted.
              </p>
            )}
          </div>
        </div>

        {/* Donation Form */}

        <form
          onSubmit={handleDonate}
          className={`flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg ${
            isCampaignExpired ? 'pointer-events-none opacity-50' : ''
          }`}
          data-aos="fade-left"
        >
          <h1 className="text-2xl font-bold text-center">Donate Form __</h1>
          <div className="form-group">
            <label className="text-lg font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label className="text-lg font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label className="text-lg font-semibold">Donation Amount</label>
            <input
              type="number"
              name="minDonation"
              value={form.minDonation}
              onChange={handleInputChange}
              required
              className="input input-bordered w-full"
              disabled={isCampaignExpired}
            />
          </div>
          <div className="form-group">
            <label className="text-lg font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full"
              placeholder="Optional: Add a message with your donation"
              disabled={isCampaignExpired}
            ></textarea>
          </div>
          <button
            type="submit"
            className={`btn w-full ${
              !isCampaignExpired ? 'donate_bg' : ''
            } text-white text-lg`}
            disabled={isCampaignExpired}
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
