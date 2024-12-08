import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BannerSlide from '../BannerSlide/BannerSlide';
import CampaignCard from '../CampaignCard/CampaignCard';
import SponsorshipMarquee from '../SponsorshipMarquee/SponsorshipMarquee';

const Home = () => {
  // Local state to store fetched campaigns
  const [campaignsData, setCampaignsData] = useState([]);

  // Fetch the campaign data when the component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Fetch data from the backend API
        const response = await fetch(
          'https://crowd-cube-server-ruby.vercel.app/campaigns'
        );
        const data = await response.json();

        // Log the data to ensure it's being fetched correctly
        console.log('Fetched campaigns:', data);

        // Filter out campaigns that are still running based on the deadline
        const currentDate = new Date();
        const runningCampaigns = data.filter(
          campaign => new Date(campaign.deadline) > currentDate
        );

        // Set the filtered running campaigns to state
        setCampaignsData(runningCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []); // Empty dependency array to run only once when the component mounts

  // Sort the campaigns to show the latest first (if not already sorted in the backend)
  const sortedCampaigns = campaignsData?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <BannerSlide />
      <div
        data-aos="zoom-in-down"
        className="flex items-center gap-3 animate__animated animate__fadeIn animate__delay-1s"
      >
        <h2
          id="featured-campaigns"
          className="text-center dark:text-white md:text-left text-3xl md:text-4xl font-bold mt-12"
        >
          Running Campaign Section _
        </h2>
        <img
          className="w-10 h-10 lg:w-12 lg:h-12 mt-12 animate-spin"
          src="https://cdn-icons-png.flaticon.com/128/18211/18211174.png"
          alt="icon"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedCampaigns.length > 0 ? (
          sortedCampaigns
            .slice(0, 6) // Show only the first 6 campaigns
            .map(campaign => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))
        ) : (
          <div>No running campaigns available at the moment.</div>
        )}
      </div>

      <button
        data-aos="zoom-in-down"
        className="mx-auto btn bg-yellow-600 hover:bg-yellow-700 ease-in-out duration-300 scale-95 text-xl mt-8 animate__animated animate__fadeIn animate__delay-1s"
      >
        <NavLink to="/campaigns">Show All</NavLink>
      </button>

      <div className="py-11">
        <SponsorshipMarquee></SponsorshipMarquee>
      </div>
    </div>
  );
};

export default Home;
