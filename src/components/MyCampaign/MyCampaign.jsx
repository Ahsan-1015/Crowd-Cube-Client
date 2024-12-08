import { useState, useEffect, useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';

const MyCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null); // For the campaign being updated
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal control
  const [loading, setLoading] = useState(true);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `https://crowd-cube-server-ruby.vercel.app/myCampaigns?userEmail=${user.email}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [user]);

  // Open modal for updating a campaign
  const handleUpdate = campaign => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  // Handle delete action
  const handleDelete = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://crowd-cube-server-ruby.vercel.app/campaigns/${id}`,
            { method: 'DELETE' }
          );

          if (response.ok) {
            setCampaigns(campaigns.filter(campaign => campaign._id !== id));
            Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');
            setIsModalOpen(false); // Close the modal if delete happens from there
          } else {
            throw new Error('Failed to delete campaign');
          }
        } catch (error) {
          console.error('Error deleting campaign:', error);
          Swal.fire('Error!', 'Failed to delete the campaign.', 'error');
        }
      }
    });
  };

  // Handle form submission for updating
  const handleFormSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedCampaign = {
      title: formData.get('title'),
      type: formData.get('type'),
      minDonation: formData.get('minDonation'),
      deadline: formData.get('deadline'),
      image: formData.get('image'), // Here, 'url' is the new image URL
      description: formData.get('description'),
    };

    try {
      const response = await fetch(
        `https://crowd-cube-server-ruby.vercel.app/campaigns/${selectedCampaign._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedCampaign),
        }
      );

      if (response.ok) {
        const updatedCampaigns = campaigns.map(c =>
          c._id === selectedCampaign._id ? { ...c, ...updatedCampaign } : c
        );
        setCampaigns(updatedCampaigns);
        Swal.fire('Success!', 'Campaign updated successfully!', 'success');
        setIsModalOpen(false);
      } else {
        throw new Error('Failed to update campaign');
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
      Swal.fire('Error!', 'Failed to update the campaign.', 'error');
    }
  };

  return (
    <div className="mx-auto  rounded">
      <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-center">
        My Campaigns
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading campaigns...</p>
      ) : campaigns.length > 0 ? (
        <div className="space-y-6 md:p-4 md:border border-yellow-600 rounded-xl">
          {campaigns.map(campaign => (
            <div
              key={campaign._id}
              className="flex p-4 md:p-0 border border-yellow-600 lg:h-80 flex-col md:flex-row items-center bg-gray-100 dark:bg-gradient-to-r from-gray-700 via-gray-800  to-blue-200 rounded-lg shadow-lg dark:text-white overflow-hidden gap-6"
              data-aos="fade-up"
            >
              {/* Left: Image */}
              <div className="flex-shrink-0 flex-1 w-full md:w-1/">
                <img
                  src={campaign.image || 'https://via.placeholder.com/150'}
                  alt={campaign.title}
                  className="w-full h-48 md:h-full object-cover rounded-lg"
                />
              </div>

              {/* Right: Information & Actions */}
              <div className="flex-1 text-lg dark:text-white">
                <h3 className="text-xl font-semibold mb-2 ">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 mb-1 dark:text-white">
                  <strong>Type:</strong> {campaign.type || 'N/A'}
                </p>
                <p className="text-gray-600 mb-1 dark:text-white">
                  <strong>Min Donation:</strong> ${campaign.minDonation}
                </p>
                <p className="text-gray-600 mb-4 dark:text-white">
                  <strong>Deadline:</strong> {campaign.deadline}
                </p>
                <div className="flex space-x-3">
                  <button
                    className="btn btn-primary text-lg font-semibold"
                    onClick={() => handleUpdate(campaign)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error text-lg font-semibold"
                    onClick={() => handleDelete(campaign._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No campaigns found.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="dark:bg-yellow-600 bg-white  rounded-lg p-6 shadow-xl w-[400px]">
            <h3 className="text-2xl font-bold mb-4">Update Campaign</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedCampaign.title}
                  required
                  className="input input-bordered w-full"
                />
              </label>
              <label>
                Type:
                <select
                  name="type"
                  defaultValue={selectedCampaign.type}
                  required
                  className="input input-bordered w-full"
                >
                  <option value="personal issue">Personal Issue</option>
                  <option value="startup">Startup</option>
                  <option value="business">Business</option>
                  <option value="creative ideas">Creative Ideas</option>
                </select>
              </label>
              <label>
                Min Donation:
                <input
                  type="text"
                  name="minDonation"
                  defaultValue={selectedCampaign.minDonation}
                  required
                  className="input input-bordered w-full"
                />
              </label>
              <label>
                Deadline:
                <input
                  type="date"
                  name="deadline"
                  defaultValue={selectedCampaign.deadline}
                  required
                  className="input input-bordered w-full"
                />
              </label>
              <label>
                Image URL:
                <input
                  type="url"
                  name="image"
                  defaultValue={selectedCampaign?.image || ''} // Set empty string as fallback if no URL exists
                  className="input input-bordered w-full"
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  defaultValue={selectedCampaign.description}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </label>
              <div className="flex space-x-3 mt-4">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCampaign;
