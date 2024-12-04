import { useEffect, useState } from 'react';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const AddCampaign = ({ user }) => {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    type: 'personal issue',
    description: '',
    minDonation: '',
    deadline: '',
    email: user.email || '',
    name: user.name || '',
  });

  useEffect(() => {
    AOS.init();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/campaigns', formData); // Update with your backend route
      if (response.status === 200) {
        toast.success('Campaign added successfully!');
        setFormData({
          image: '',
          title: '',
          type: 'personal issue',
          description: '',
          minDonation: '',
          deadline: '',
          email: user.email,
          name: user.name,
        });
      }
    } catch (error) {
      toast.error('Failed to add campaign. Please try again!');
      console.error(error);
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded animate__animated animate__fadeIn"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Campaign Title */}
        <div>
          <label className="block text-sm font-medium">Campaign Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter campaign title"
            required
          />
        </div>

        {/* Campaign Type */}
        <div>
          <label className="block text-sm font-medium">Campaign Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="personal issue">Personal Issue</option>
            <option value="startup">Startup</option>
            <option value="business">Business</option>
            <option value="creative ideas">Creative Ideas</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            placeholder="Enter campaign description"
            required
          />
        </div>

        {/* Minimum Donation */}
        <div>
          <label className="block text-sm font-medium">Minimum Donation</label>
          <input
            type="number"
            name="minDonation"
            value={formData.minDonation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter minimum donation amount"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block text-sm font-medium">User Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>

        {/* User Name */}
        <div>
          <label className="block text-sm font-medium">User Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        >
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
