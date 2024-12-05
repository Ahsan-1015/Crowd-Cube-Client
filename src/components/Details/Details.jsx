import { useContext, useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Details = () => {
  const campaign = useLoaderData();
  const { title, description, image, deadline, minDonation, type } = campaign;

  const { user, loading } = useContext(authContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    minDonation: minDonation || '',
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

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

    const donationData = {
      campaignId: campaign._id,
      userEmail: form.email,
      username: form.name,
      minDonation: form.minDonation,
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
        setForm({ ...form, minDonation: '' });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong, please try again.',
        });
      }
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
      <div className="grid xl:grid-cols-2 gap-6 items-center border border-gray-300 w-full">
        <div
          className="relative md:h-[700px] xl:h-[700px] rounded-lg overflow-hidden shadow-lg"
          data-aos="fade-right"
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative flex flex-col items-center justify-center h-full text-center text-white p-6 space-y-4 backdrop-blur-sm">
            <h1 className="text-4xl font-bold text-yellow-500">{title}</h1>
            <p className="text-lg">{description}</p>
            <span className="badge badge-secondary text-lg">{type}</span>
            <div className="mt-4 p-3 bg-blue-600 text-white rounded-lg shadow-md">
              <p className="text-xl font-bold">Minimum Donation:</p>
              <p className="text-2xl">${minDonation}</p>
            </div>
            <p className="mt-4 text-sm">
              <strong>Deadline:</strong> {deadline}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleDonate}
          className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg"
          data-aos="fade-left"
        >
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
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
