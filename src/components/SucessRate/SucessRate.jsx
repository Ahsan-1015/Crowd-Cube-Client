import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const SuccessRate = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });
  const [ref3, inView3] = useInView({ triggerOnce: true });

  return (
    <section className="py-16 bg-gradient-to-r from-teal-800 to-yellow-700 rounded-xl mt-10">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <h2
          className="text-4xl font-bold text-white mb-6 animate__animated animate__fadeInDown"
          data-aos="fade-up"
        >
          Our Success Rate
        </h2>
        <p
          className="text-lg text-gray-300 mb-12 animate__animated animate__fadeIn"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Crowdcube has been a trusted platform for helping individuals and
          businesses achieve their goals. Here's a look at our achievements:
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stat Card 1 */}
          <div
            ref={ref1}
            className="bg-white dark:bg-gradient-to-l dark:from-gray-900 dark:via-teal-200 dark:to-gray-900 shadow-lg rounded-lg p-8 animate__animated animate__fadeInLeft"
            data-aos="fade-right"
          >
            <h3 className="text-5xl font-bold text-indigo-600 mb-4">
              {inView1 && (
                <CountUp start={0} end={95} duration={2.5} suffix="%" />
              )}
            </h3>
            <p className="text-gray-700 text-xl">Campaign Success Rate</p>
          </div>

          {/* Stat Card 2 */}
          <div
            ref={ref2}
            className="bg-white dark:bg-gradient-to-l dark:from-gray-900 dark:via-teal-200 dark:to-gray-900 shadow-lg rounded-lg p-8 animate__animated animate__fadeIn"
            data-aos="zoom-in"
          >
            <h3 className="text-5xl font-bold text-green-600 mb-4">
              {inView2 && (
                <CountUp
                  start={0}
                  end={1000000}
                  duration={3}
                  prefix="$"
                  separator=","
                />
              )}
            </h3>
            <p className="text-gray-700 text-xl">Funds Raised</p>
          </div>

          {/* Stat Card 3 */}
          <div
            ref={ref3}
            className="bg-white  dark:bg-gradient-to-l dark:from-gray-900 dark:via-teal-200 dark:to-gray-900 shadow-lg rounded-lg p-8 animate__animated animate__fadeInRight"
            data-aos="fade-left"
          >
            <h3 className="text-6xl font-bold   text-blue-600 mb-4">
              {inView3 && (
                <CountUp start={0} end={10000} duration={3} suffix="+" />
              )}
            </h3>
            <p className="text-gray-700 text-xl">Happy Campaigners</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessRate;
