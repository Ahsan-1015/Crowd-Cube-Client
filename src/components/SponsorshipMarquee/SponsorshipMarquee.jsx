import { useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SponsorshipMarquee = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const sponsors = [
    {
      id: 1,
      name: 'Content Platforms',
      logo: 'https://i.ibb.co/mqCxv8h/youtube-removebg-preview.png',
      website: 'https://www.youtube.com',
    },
    {
      id: 2,
      name: 'Financial Institutions',
      logo: 'https://i.ibb.co/sq9R5Qx/download-removebg-preview-1.png',
      website: 'https://www.chase.com',
    },
    {
      id: 3,
      name: 'Financial Institutions',
      logo: 'https://i.ibb.co/2dHXFFC/paypal-removebg-preview.png',
      website: 'https://www.paypal.com',
    },
    {
      id: 4,
      name: 'Marketplace Platforms',
      logo: 'https://i.ibb.co/ZW0RHWz/amazon-removebg-preview.png',
      website: 'https://www.amazon.com',
    },
    {
      id: 5,
      name: 'Learning Platforms',
      logo: 'https://i.ibb.co/ZWn3FVB/download-removebg-preview.png',
      website: 'https://www.udemy.com',
    },
    {
      id: 6,
      name: 'Creative Projects',
      logo: 'https://i.ibb.co.com/1bVXMJL/download-removebg-preview-2.png',
      website: 'https://www.kickstarter.com/',
    },
    {
      id: 7,
      name: 'Tech Giants',
      logo: 'https://i.ibb.co.com/r795zhJ/download-removebg-preview-3.png',
      website: 'https://ads.google.com/intl/en/home/',
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-teal-800 to-green-700 py-10 px-4 rounded-xl shadow-md "
      data-aos="fade-left"
    >
      <h2 className="text-center text-white text-4xl font-bold  animate__animated animate__fadeInDown mb-5">
        Our Sponsors __
      </h2>
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true} // Pause marquee when hovered
        className="space-x-20 h-60"
      >
        {sponsors.map(sponsor => (
          <a
            key={sponsor.id}
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110 space-y-2 space-x-24"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="w-36 h-36 object-contain border-2  border-yellow-600 rounded-lg ml-24"
            />
            <p className="text-white text-lg">{sponsor.name}</p>
          </a>
        ))}
      </Marquee>
    </div>
  );
};

export default SponsorshipMarquee;
