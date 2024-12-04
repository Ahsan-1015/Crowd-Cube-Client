import { useLoaderData } from 'react-router-dom';

// Import your CampaignCard component
import CampaignCard from '../CampaignCard/CampaignCard';

const Campaign = () => {
  // Fetch campaigns using loader
  const campaigns = useLoaderData();

  console.log(campaigns);

  return (
    <div className="mt-11">
      <h2 className="text-3xl font-bold text-center animate__animated animate__fadeIn animate__delay-1s">
        All Campaigns _
      </h2>
      <div className="grid gap-6 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7">
        {/* Map through the campaigns and render a CampaignCard for each */}
        {campaigns.map(campaign => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default Campaign;
