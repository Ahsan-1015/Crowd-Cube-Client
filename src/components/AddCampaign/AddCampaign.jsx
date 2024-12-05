import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddCampaign = () => {
  const navigate = useNavigate();
  const userData = useLoaderData(); // Assuming this fetches user data
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    type: 'personal issue',
    description: '',
    minDonation: '',
    deadline: '',
    email: userData?.email || '',
    name: userData?.name || '',
  });

  useEffect(() => {
    AOS.init();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Campaign added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/myCampaign'); // Redirect
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add campaign. Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    } catch (error) {
      console.error('Error adding campaign:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <div
      className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg animate__animated animate__fadeIn"
      data-aos="zoom-in"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Add New Campaign
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-600">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Campaign Title */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-600">
            Campaign Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter campaign title"
            required
          />
        </div>

        {/* Campaign Type */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-600">
            Campaign Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="personal issue">Personal Issue</option>
            <option value="startup">Startup</option>
            <option value="business">Business</option>
            <option value="creative ideas">Creative Ideas</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter campaign description"
            required
          />
        </div>

        {/* Minimum Donation */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-600">
            Minimum Donation
          </label>
          <input
            type="number"
            name="minDonation"
            value={formData.minDonation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter minimum donation amount"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-600">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-600">
            User Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* User Name */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-600">
            User Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
