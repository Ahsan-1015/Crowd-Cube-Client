import { useState, useEffect, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

export default function BannerSlide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [size, setSize] = useState({
    width: 80, // default width for small devices
    height: 80, // default height for small devices
  });
  const [bgImage, setBgImage] = useState(
    'https://i.ibb.co.com/wWFkmL6/DALL-E-2024-11-21-20-32-00-A-visually-appealing-banner-image-for-a-winter-clothes-donation-drive-fea.webp' // initial background image
  );

  const swiperRef = useRef(null); // Reference to the swiper instance
  const typewriterRef = useRef(null); // Reference for typewriter

  // Update the size based on screen width
  const updateSize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) {
      // Large device (lg)
      setSize({ width: 100, height: 100 });
    } else if (windowWidth >= 768) {
      // Medium device (md)
      setSize({ width: 90, height: 90 });
    } else {
      // Small device (default)
      setSize({ width: 80, height: 80 });
    }
  };

  // Add event listener to detect window resizing
  useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize(); // Call on initial render

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: 'ease-in-out', // Animation easing
      offset: 50, // Trigger animations 50px before elements appear
      once: true, // Animation occurs only once
    });
  }, []);

  const slides = [
    {
      image:
        'https://i.ibb.co.com/wBCqJMd/DALL-E-2024-12-08-21-02-14-A-realistic-image-of-a-young-entrepreneur-launching-their-startup-The-sce.webp',
      title: 'Launch Your Dream Startup',
      description:
        'Start your journey today with innovative ideas and solutions that drive success.',
      content:
        "Empower your startup with the right tools and resources to grow. It's time to turn your vision into reality and make your mark in the industry.",
    },
    {
      image:
        'https://i.ibb.co.com/2nbwy7J/DALL-E-2024-12-08-21-26-00-A-visually-stunning-and-creative-banner-image-designed-to-showcase-innova.webp',
      title: 'Unleash Your Creative Potential',
      description:
        'Transform your ideas into reality with innovation and imagination.',
      content:
        "Explore new ways to express your creativity. Whether it's art, design, or technology, we help bring your ideas to life.",
    },
    {
      image:
        'https://i.ibb.co.com/Jts89p6/DALL-E-2024-12-08-21-17-28-A-professional-and-modern-banner-image-for-a-business-focused-theme-The-d.webp',
      title: 'Business Growth & Success',
      description:
        'Grow your business with cutting-edge solutions and expert advice.',
      content:
        'Maximize your potential by learning the latest business strategies and tools that drive growth. Start scaling your business with us.',
    },
  ];

  // Handle click on overlay image to change background and slide
  const handleOverlayClick = (image, index) => {
    setBgImage(image); // Update background image when clicked
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index); // Update the active slide
    }
  };

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef} // Reference to the swiper instance
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        autoplay={{
          delay: 3000, // Automatically change slide every 3 seconds
          disableOnInteraction: false, // Keep autoplay running even if the user interacts with the slider
        }}
        pagination={{
          clickable: true,
        }}
        onSlideChange={swiper => {
          setActiveIndex(swiper.activeIndex); // Update active index on slide change
          if (typewriterRef.current) {
            typewriterRef.current.stop(); // Stop typewriter animation
            typewriterRef.current.start(); // Restart the animation
          }
        }} // Reset typewriter effect on slide change
        modules={[EffectFade, Navigation, Pagination, Autoplay]} // Add Autoplay module
        className="mySwiper"
      >
        {/* Dynamic Slides */}
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative cursor-pointer rounded-2xl overflow-hidden">
              <img
                className="rounded-2xl h-[550px] w-full object-cover backdrop-blur-md bg-black/10 z-10"
                src={slide.image}
                alt={`Slide ${index + 1}`}
              />
              <div
                data-aos="fade-right"
                className="absolute w-11/12 lg:w-1/2 top-10 lg:top-16 xl:top-36 left-5 lg:left-12 text-yellow-500 z-10 backdrop-blur-sm bg-black/30 p-6 rounded-lg"
              >
                <h1 className="text-3xl lg:text-5xl font-extrabold">
                  <Typewriter
                    ref={typewriterRef} // Add ref for controlling typewriter
                    cursor
                    cursorBlinking
                    delaySpeed={1000}
                    deleteSpeed={25}
                    loop={50}
                    typeSpeed={50} // Adjust type speed to match with slider change timing
                    words={[slide.title]} // Make the title dynamic
                  />
                </h1>
                <p className="mt-4 text-sm lg:text-lg text-gray-300">
                  {slide.description}
                </p>
                <p className="mt-4 text-sm lg:text-lg text-gray-300">
                  {slide.content}
                </p>
                <a href="#featured-campaigns">
                  <button className="mt-3 rounded-lg px-4 py-3 border-2 bg-yellow-300 border-yellow-300 hover:border-black transition duration-300 hover:scale-90 text-sm lg:text-lg text-black font-bold hover:bg-yellow-200">
                    Donate Now
                  </button>
                </a>
                <NavLink to={'/addCampaign'}>
                  <button className="ml-4 mt-3 rounded-lg px-4 py-3 border-2 border-yellow-300 hover:border-black transition duration-300 hover:scale-90 text-sm lg:text-lg text-white hover:text-black font-bold hover:bg-yellow-200">
                    Add Campaign
                  </button>
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Profile images overlay - Positioned at bottom-right using flexbox */}
      <div
        className="absolute flex space-x-3 bottom-20 right-16 md:right-20 z-20 animate__pulse backdrop-blur-sm p-4 rounded-xl border-yellow-500 border-2 -mr-4 "
        style={{ transform: 'translateY(50%)' }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => handleOverlayClick(slide.image, index)} // Change background and slide on overlay click
            className={`cursor-pointer rounded-3xl border-t-8 border-l-8 border-b-4 ${
              activeIndex === index ? 'border-yellow-400' : 'border-transparent'
            }`}
            style={{
              transition: 'all 0.3s ease',
              width: `${size.width}px`, // Dynamic width based on screen size
              height: `${size.height}px`, // Dynamic height based on screen size
            }}
          >
            <img
              className="w-full h-full rounded-3xl object-cover"
              src={slide.image}
              alt={`Profile ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Background image change */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 rounded-2xl"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
