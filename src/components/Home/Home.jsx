// import { NavLink, useLoaderData } from 'react-router-dom';

// import BannerSlide from '../BannerSlide/BannerSlide';
// import CampaignCard from '../CampaignCard/CampaignCard';
// import HowItWorks from '../HowItWorks/HowItWorks';
// import About from '../About/About';
// import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
  // const campaigns = useLoaderData();

  // const { campaignsData } = campaigns;

  return (
    <div className="">
      {/* <BannerSlide></BannerSlide> */}
      <div
        data-aos="zoom-in-down"
        className="flex items-center  gap-3 animate__animated animate__fadeIn animate__delay-1s"
      >
        <h2
          id="featured-campaigns"
          className="text-center md:text-left text-3xl md:text-4xl font-bold mt-12 "
        >
          Featured Campaigns _
        </h2>
        <img
          className=" w-10 h-10 lg:w-12 lg:h-12 mt-12 animate-spin  "
          src="https://cdn-icons-png.flaticon.com/128/18211/18211174.png"
          alt="icon"
        />
      </div>

      {/* <div className="mt-8 grid gap-6 lg:gap-12 grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
        {campaignsData.slice(0, 6).map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign}></CampaignCard>
        ))}
      </div> */}
      <button
        data-aos="zoom-in-down"
        className="mx-auto  btn bg-teal-600 hover:bg-teal-700 ease-in-out duration-300 scale-95 text-xl mt-8 animate__animated animate__fadeIn animate__delay-1s "
      >
        {/* <NavLink to="/campaigns">See more</NavLink> */}
      </button>

      {/* <HowItWorks></HowItWorks> */}

      {/* <About></About> */}
      {/* <Testimonials></Testimonials> */}
    </div>
  );
};

export default Home;
