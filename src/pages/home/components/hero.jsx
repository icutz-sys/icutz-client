import { Link } from "react-router-dom";
import Video from "../../../assets/videos/hero_video.mp4";

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl text-center mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">
            Choose Your Shop and Services with Ease
            <span className="text-blue-600"> Today</span>
          </h1>
          <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
            Find the best shops, reserve services, and buy products with our professionals.
          </p>
        </div>

        <div className="mt-10 relative max-w-7xl mx-auto">
          <div className="relative w-full h-96 sm:h-[600px] rounded-xl overflow-hidden bg-cover bg-center">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={Video}
              autoPlay
              loop
              muted
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <Link
                to="/shops"
                className="py-3 px-4 flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                Start Now
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-12 -left-20 -z-10 w-48 h-48 bg-gradient-to-b from-orange-500 to-white rounded-lg dark:to-neutral-900">
            <div className="w-full h-full bg-white rounded-lg dark:bg-neutral-900"></div>
          </div>

          <div className="absolute -top-12 -right-20 -z-10 w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full">
            <div className="w-full h-full bg-white rounded-full dark:bg-neutral-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
