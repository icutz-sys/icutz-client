/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import ShopImage from "../../assets/images/shop.jpg";
import StickyNotes from "../../assets/images/sticky_notes.jpg";
import PhoneMap from "../../assets/images/phone_map.jpg";
import Planning from "../../assets/images/planning.jpg";
import SocialMedia from "../../assets/images/social_media.jpg";
import WorkingHours from "../../assets/images/working_hours.jpg";
import { useEffect, useState } from "react";
import { findShopByUrlSlug } from "../../services/api/routes/shops";

const StarRating = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927C9.432 2.025 10.568 2.025 10.951 2.927L12.296 6.24L15.845 6.9C16.84 7.08 17.253 8.28 16.544 9.046L13.89 11.849L14.518 15.46C14.686 16.462 13.702 17.197 12.786 16.732L9.999 15.279L7.212 16.732C6.296 17.197 5.312 16.462 5.48 15.46L6.108 11.849L3.454 9.046C2.745 8.28 3.158 7.08 4.153 6.9L7.702 6.24L9.049 2.927Z" />
      </svg>
    ));
  return <div className="flex">{stars}</div>;
};

function Shop() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(false);

  function formatHour(hour) {
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return formattedHour + " " + ampm;
  }

  const fetchShops = async (id) => {
    setLoading(true);
    try {
      const response = await findShopByUrlSlug(id);
      console.log(JSON.stringify(response));
      setShop(response);
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchShops(id);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:self-end col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-5 lg:col-start-3">
            <a
              className="group relative block rounded-xl overflow-hidden"
              href="#"
            >
              <div className="relative">
                <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-b from-gray-200 to-gray-300">
                    <div
                      className={` flex justify-center items-center ${
                        shop?.profileImg
                          ? "border shadow hover:border-2"
                          : "bg-white"
                      }`}
                    >
                      <img
                        className={`group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover rounded-xl ${
                          shop?.profileImg ? " w-80" : "w-full"
                        }`}
                        src={shop?.profileImg ? shop?.profileImg : ShopImage}
                        alt="Image Description"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                  <div className="text-sm font-bold text-gray-800 rounded-lg shadow-lg bg-white p-4 md:text-base dark:bg-neutral-800 dark:text-neutral-200">
                    <h2 className="text-lg font-semibold">{shop?.name}</h2>
                    <p className="text-gray-600">Phone: {shop?.phone}</p>
                    <p className="text-gray-600">Email: {shop?.email}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="sm:self-end col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3">
            <a
              className="group relative block rounded-xl overflow-hidden"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                <img
                  className="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                  src={PhoneMap}
                  alt="Image Description"
                />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                <div className="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-neutral-800 dark:text-neutral-200">
                  <div className="sm:col-span-12 md:col-span-6 lg:col-span-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                      Address
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      {shop?.location?.address
                        ? shop?.location?.address
                        : "N/A"}
                    </p>
                    <Link
                      to="https://maps.google.com"
                      className="text-sm text-blue-400 hover:underline"
                    >
                      View on Map
                    </Link>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="relative">
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                <img
                  className="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                  src={
                    shop?.facebook || shop?.linkedin || shop?.x
                      ? SocialMedia
                      : WorkingHours
                  }
                  alt="Image Description"
                />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                <div className="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-neutral-800 dark:text-neutral-200">
                  {shop?.facebook || shop?.linkedin || shop?.x ? (
                    <>
                      <a href={shop?.facebook}>Facebook</a>
                      <a href={shop?.linkedin}>LinkedIn</a>
                      <a href={shop?.x}>X</a>
                    </>
                  ) : (
                    <div className="flex gap-1 flex-wrap">
                      {shop?.workingHours &&
                        Object.keys(shop.workingHours)
                          .filter((day) => day !== "_id")
                          .map((day, ind) => (
                            <p key={day} className="text-sm text-gray-700">
                              {ind !== shop?.workingHours[day].length - 1
                                ? " | "
                                : ""}
                              <span className="font-semibold">
                                {day.slice(0, 3)}:
                              </span>{" "}
                              {Array.isArray(shop?.workingHours[day]) &&
                              shop?.workingHours[day]?.length > 0 ? (
                                shop?.workingHours[day].map((hour, index) => (
                                  <span key={index}>
                                    <span className="text-blue-500 font-medium">
                                      {formatHour(hour.startHour)} -{" "}
                                      {formatHour(hour.endHour)}
                                    </span>
                                  </span>
                                ))
                              ) : (
                                <span className="text-red-500 font-medium">
                                  Off
                                </span>
                              )}
                            </p>
                          ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <a
              className="group relative block rounded-xl overflow-hidden"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                <img
                  className="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                  src={Planning}
                  alt="Image Description"
                />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                <div className="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-neutral-800 dark:text-neutral-200 flex justify-center">
                  <Link
                    to={`/shop/${id}/book`}
                    className="inline-flex justify-center items-center px-6 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </a>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <a
              className="group relative block rounded-xl overflow-hidden"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                <img
                  className="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                  src={StickyNotes}
                  alt="Image Description"
                />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                <div className="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-neutral-800 dark:text-neutral-200">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    Rating
                  </h2>
                  <div className="flex items-center mt-1">
                    <StarRating rating={shop?.ratings} />
                    {shop?.ratings ? (
                      <span className="ml-2 text-sm text-neutral-400">
                        {shop?.ratings || 0} out of 5
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-neutral-400">
                        {0} out of 5
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    {shop?.comments && shop?.comments?.length > 0 ? (
                      <p className="text-sm text-neutral-400">
                        <blockquote className="relative">
                          <svg
                            className="absolute -top-6 -start-8 size-16 text-gray-400 dark:text-neutral-700"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                              fill="currentColor"
                            ></path>
                          </svg>

                          <div className="relative z-10">
                            <p className="text-gray-800 sm:text-xs dark:text-white">
                              <em>
                                &rdquo;
                                {shop?.comments[shop?.comments.length - 1]}
                                &rdquo;
                              </em>
                            </p>
                          </div>

                          <footer className="mt-1">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <svg
                                  className="hs-accordion-active:block ms-auto hidden size-4 rounded-full bg-gray-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m18 15-6-6-6 6" />
                                </svg>
                              </div>
                              <div className="ms-4">
                                <div className="text-xs text-gray-500 dark:text-neutral-500">
                                  Last Customer
                                </div>
                              </div>
                            </div>
                          </footer>
                        </blockquote>
                      </p>
                    ) : (
                      <p className="text-sm text-neutral-400">
                        Be the first to review!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;

("{comment.comment}");
