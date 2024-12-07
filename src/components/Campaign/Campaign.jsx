import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CampaignCard from '../CampaignCard/CampaignCard';

const Campaign = () => {
  const initialCampaigns = useLoaderData();
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = async () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    try {
      const response = await fetch(
        `http://localhost:8000/campaigns?sort=${newSortOrder}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch sorted campaigns');
      }
      const sortedCampaigns = await response.json();

      // Ensure minDonation is treated as a number for sorting
      const sortedWithNumbers = sortedCampaigns.map(campaign => ({
        ...campaign,
        minDonation: parseFloat(campaign.minDonation), // Convert minDonation to a number
      }));

      // Sort campaigns based on minDonation
      sortedWithNumbers.sort((a, b) => {
        return sortOrder === 'asc'
          ? a.minDonation - b.minDonation
          : b.minDonation - a.minDonation;
      });

      console.log('Sorted campaigns:', sortedWithNumbers); // Debugging
      setCampaigns(sortedWithNumbers);
      setSortOrder(newSortOrder);
    } catch (error) {
      console.error('Failed to fetch sorted campaigns:', error);
    }
  };

  return (
    <div className="mt-11">
      <h2 className="text-3xl font-bold text-center">All Campaigns</h2>
      <div className="text-center mt-6">
        <button
          onClick={handleSort}
          className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Sort by Minimum Donation (
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>
      <div className="grid gap-6 mt-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {campaigns && campaigns.length > 0 ? (
          campaigns.map(campaign => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))
        ) : (
          <p className="text-center text-gray-500">No campaigns found.</p>
        )}
      </div>
    </div>
  );
};

export default Campaign;
