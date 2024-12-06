import { useState, useEffect, useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';

const MyCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the logged-in user's email
  const { user } = useContext(authContext);
  console.log(user.email);

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">My Campaigns</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading campaigns...</p>
      ) : campaigns.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Campaign Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Type
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Min Donation
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Deadline
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {campaign.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {campaign.type || 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${campaign.minDonation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {campaign.deadline}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No campaigns found.</p>
      )}
    </div>
  );
};

export default MyCampaign;
