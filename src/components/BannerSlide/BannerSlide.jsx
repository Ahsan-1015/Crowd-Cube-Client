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
        'https://i.ibb.co.com/wWFkmL6/DALL-E-2024-11-21-20-32-00-A-visually-appealing-banner-image-for-a-winter-clothes-donation-drive-fea.webp',
      title: 'Winter Clothing  Drive',
      description:
        'Join our mission to provide winter clothing to those in need. With your donation, we can bring warmth to many and make this winter a little more bearable for those struggling.',
      content:
        'Your contribution will help families stay warm during the harsh winter months. Whether it’s jackets, sweaters, or blankets, every donation counts. ',
    },
    {
      image:
        'https://i.ibb.co.com/FnNsJpd/DALL-E-2024-11-21-20-34-55-A-visually-engaging-banner-image-for-a-winter-clothing-donation-campaign.webp',
      title: 'MAKE A DIFFERENCE',
      description:
        "Your donation helps provide warmth to those suffering from the cold. Every item counts in making someone's day better.",
      content:
        "Make a difference by donating clothing to help provide warmth to those in need. Every item counts in brightening someone's day and making the winter more bearable.",
    },
    {
      image:
        'https://i.ibb.co.com/vzk3mhh/DALL-E-2024-11-21-20-22-59-A-visually-striking-and-warm-themed-banner-featuring-winter-clothing-dona.webp',
      title: 'GIVE WITH A PURPOSE',
      description:
        'Help us spread kindness and generosity. Your donation provides much-needed support to individuals and families.',
      content:
        'Give with purpose and support individuals and families in need with your generous donation of winter clothing. Your contribution provides much-needed support to those struggling in the cold.',
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
        onSlideChange={swiper => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
        modules={[EffectFade, Navigation, Pagination, Autoplay]} // Add Autoplay module
        className="mySwiper"
      >
        {/* Dynamic Slides */}
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative cursor-pointer rounded-2xl overflow-hidden">
              <img
                className="rounded-2xl h-[550px] w-full object-cover backdrop-blur-md bg-black/10 z-10 "
                src={slide.image}
                alt={`Slide ${index + 1}`}
              />
              <div
                data-aos="fade-right"
                className="absolute w-11/12 lg:w-1/2 top-10  lg:top-16 xl:top-36 left-5 lg:left-12  text-white z-10 backdrop-blur-sm bg-black/30 p-6 rounded-lg"
              >
                <h1 className="text-3xl lg:text-5xl font-extrabold">
                  {slide.title}
                </h1>
                <p className="mt-4 text-sm lg:text-lg text-gray-300">
                  {slide.description}
                </p>
                <p className="mt-4 text-sm lg:text-lg text-gray-300">
                  {slide.content}
                </p>
                <a href="#featured-campaigns">
                  <button className=" mt-3 rounded-lg px-4 py-3 border-2 bg-blue-300 border-blue-300 hover:border-black transition duration-300 hover:scale-90 text-sm lg:text-lg text-gray-700 hover:text-black font-semibold hover:bg-blue-200">
                    Donate Now
                  </button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Profile images overlay - Positioned at bottom-right using flexbox */}
      <div
        className="absolute flex space-x-3 bottom-20 right-16 md:right-20 z-20 animate__pulse"
        style={{ transform: 'translateY(50%)' }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => handleOverlayClick(slide.image, index)} // Change background and slide on overlay click
            className={`cursor-pointer rounded-3xl border-t-8 border-l-8 border-b-4 ${
              activeIndex === index ? 'border-teal-400' : 'border-transparent'
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
