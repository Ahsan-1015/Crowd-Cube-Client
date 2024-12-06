import { useState, useEffect, useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';

const MyCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Get the logged-in user's email
  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `http://localhost:8000/myCampaigns?userEmail=${user.email}`
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

  // Handle Delete Action
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
            `http://localhost:8000/campaigns/${id}`,
            { method: 'DELETE' }
          );

          if (response.ok) {
            setCampaigns(campaigns.filter(campaign => campaign._id !== id));
            Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');
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

  return (
    <div className=" mx-auto  bg-white  rounded">
      <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-center">
        My Campaigns __
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading campaigns...</p>
      ) : campaigns.length > 0 ? (
        <div className="space-y-6 md:p-4 md:border border-yellow-600 rounded-xl">
          {campaigns.map(campaign => (
            <div
              key={campaign._id}
              className="flex p-4 md:p-0  border border-yellow-600 lg:h-80 flex-col md:flex-row items-center bg-gray-100 rounded-lg shadow-lg overflow-hidden gap-6"
              data-aos="fade-up"
            >
              {/* Left: Image */}
              <div className="flex-shrink-0 flex-1  w-full md:w-1/">
                <img
                  src={campaign.image || 'https://via.placeholder.com/150'}
                  alt={campaign.title}
                  className="w-full h-48 md:h-full object-cover rounded-lg"
                />
              </div>

              {/* Right: Information & Actions */}
              <div className="flex-1  text-lg">
                <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                <p className="text-gray-600 mb-1">
                  <strong>Type:</strong> {campaign.type || 'N/A'}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Min Donation:</strong> ${campaign.minDonation}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Deadline:</strong> {campaign.deadline}
                </p>
                <div className="flex  space-x-3">
                  <button
                    className="btn btn-primary text-lg font-semibold"
                    onClick={() =>
                      Swal.fire(
                        'Info',
                        'Update functionality to be implemented.',
                        'info'
                      )
                    }
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
    </div>
  );
};

export default MyCampaign;
