import { useLoaderData } from 'react-router-dom';

import CampaignCard from '../CampaignCard/CampaignCard';

const Campaign = () => {
  const campaigns = useLoaderData();

  return (
    <div className="mt-11">
      <h2 className="text-3xl font-bold text-center animate__animated animate__fadeIn animate__delay-1s">
        All Campaigns _
      </h2>
      <div className="grid gap-6 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7 ">
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign}></CampaignCard>
        ))}
      </div>
    </div>
  );
};

export default Campaign;
