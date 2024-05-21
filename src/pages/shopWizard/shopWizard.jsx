/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "./components/datePicker";
import Summary from "./components/summary";
import { useParams } from "react-router-dom";
import { findShopByUrlSlug } from "../../services/api/routes/shops";
import { fetchProfessionalsPerShop } from "../../services/api/routes/professionals";
import { fetchServicesPerShop } from "../../services/api/routes/services";
import { fetchProductsPerShop } from "../../services/api/routes/products";

function ShopWizard() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [servicesModelState, setServicesModelState] = useState(false);
  const [professionalModelState, setProfessionalModelState] = useState(false);
  const [productsModelState, setProductsModelState] = useState(false);
  const [updatedServicesData, setUpdatedServicesData] = useState([]);
  const [updatedProfessionalData, setUpdatedProfessionalData] = useState([]);
  const [updatedProductsData, setUpdatedProductsData] = useState([]);
  const [selectedTime, setSelectedTime] = useState();

  const [professionals, setProfessionals] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  // const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchShops = async (id) => {
    setLoading(true);
    const excludeKeys = ["shopId", "__v", "createdAt", "updatedAt", "commissionPercentServices", "commissionPercentProducts", "activated", "description"];

    const filterObject = (obj, keysToExclude) => {
      return Object.keys(obj).reduce((acc, key) => {
        if (!keysToExclude.includes(key)) {
          acc[key] = obj[key];
        }
        return acc;
      }, {});
    };
    try {
      const response = await findShopByUrlSlug(id);

      fetchProfessionalsPerShop(response._id).then((data) => {
        const filteredData = data.map((item) =>
          filterObject(item, excludeKeys)
        );
        setProfessionals(filteredData);
      });

      fetchServicesPerShop(response._id).then((data) => {
        const filteredData = data.map((item) =>
          filterObject(item, excludeKeys)
        );
        setServices(filteredData);
      });

      fetchProductsPerShop(response._id).then((data) => {
        const filteredData = data.map((item) =>
          filterObject(item, excludeKeys)
        );
        console.log(JSON.stringify(filteredData));
        setProducts(filteredData);
      });
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
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
            <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl">
              Reserve Your Appointment Easily
            </h2>

            <nav
              className="grid gap-4 mt-5 md:mt-10"
              aria-label="Tabs"
              role="tablist"
            >
              <button
                type="button"
                className={`${
                  currentStep == 1 &&
                  "bg-white shadow-md hover:border-transparent"
                } text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl active`}
                id="tabs-with-card-item-1"
                data-hs-tab="#tabs-with-card-1"
                aria-controls="tabs-with-card-1"
                role="tab"
                onClick={() => setCurrentStep(1)}
              >
                <span className="flex">
                  <svg
                    className={`flex-shrink-0 mt-2 size-6 md:size-7 ${
                      currentStep == 1 ? "text-blue-600" : "text-gray-800"
                    }`}
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
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
                  </svg>

                  <span className="grow ms-6">
                    <span
                      className={`block text-lg font-semibold ${
                        currentStep == 1 ? "text-blue-600" : "text-gray-800"
                      }`}
                    >
                      Step 1: Select Services
                    </span>
                    <span className="block mt-1 text-gray-800">
                      Choose the services, professional, and products you need
                      for your appointment.
                    </span>
                  </span>
                </span>
              </button>

              <button
                type="button"
                className={`${
                  currentStep == 2 &&
                  "bg-white shadow-md hover:border-transparent"
                } text-start ${
                  updatedServicesData.length > 0 &&
                  updatedProfessionalData.length > 0 &&
                  "hover:bg-gray-200"
                } p-4 md:p-5 rounded-xl active`}
                id="tabs-with-card-item-2"
                data-hs-tab="#tabs-with-card-2"
                aria-controls="tabs-with-card-2"
                role="tab"
                onClick={() => setCurrentStep(2)}
                disabled={
                  updatedServicesData.length === 0 ||
                  updatedProfessionalData.length === 0
                }
              >
                <span className="flex">
                  <svg
                    className={`flex-shrink-0 mt-2 size-6 md:size-7 ${
                      currentStep == 2
                        ? "text-blue-600"
                        : updatedServicesData.length === 0 ||
                          updatedProfessionalData.length === 0
                        ? "text-gray-500"
                        : "text-gray-800"
                    }`}
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
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  <span className="grow ms-6">
                    <span
                      className={`block text-lg font-semibold ${
                        currentStep == 2
                          ? "text-blue-600"
                          : updatedServicesData.length === 0 ||
                            updatedProfessionalData.length === 0
                          ? "text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      Step 2: Choose Date and Time
                    </span>
                    <span
                      className={`block mt-1 ${
                        updatedServicesData.length === 0 ||
                        updatedProfessionalData.length === 0
                          ? "text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      Pick a convenient date and time for your appointment.
                    </span>
                  </span>
                </span>
              </button>

              <button
                type="button"
                className={`${
                  currentStep == 3 &&
                  "bg-white shadow-md hover:border-transparent"
                } text-start ${
                  updatedServicesData.length > 0 &&
                  updatedProfessionalData.length > 0 &&
                  selectedTime &&
                  "hover:bg-gray-200"
                } p-4 md:p-5 rounded-xl active`}
                id="tabs-with-card-item-3"
                data-hs-tab="#tabs-with-card-3"
                aria-controls="tabs-with-card-3"
                role="tab"
                onClick={() => setCurrentStep(3)}
                disabled={
                  updatedServicesData.length === 0 ||
                  updatedProfessionalData.length === 0 ||
                  !selectedTime
                }
              >
                <span className="flex">
                  <svg
                    className={`flex-shrink-0 mt-2 size-6 md:size-7 ${
                      currentStep == 3
                        ? "text-blue-600"
                        : updatedServicesData.length === 0 ||
                          updatedProfessionalData.length === 0 ||
                          !selectedTime
                        ? "text-gray-500"
                        : "text-gray-800"
                    }`}
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span className="grow ms-6">
                    <span
                      className={`block text-lg font-semibold ${
                        currentStep == 3
                          ? "text-blue-600"
                          : updatedServicesData.length === 0 ||
                            updatedProfessionalData.length === 0 ||
                            !selectedTime
                          ? "text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      Step 3: Confirm Appointment
                    </span>
                    <span
                      className={`block mt-1 ${
                        updatedServicesData.length === 0 ||
                        updatedProfessionalData.length === 0 ||
                        !selectedTime
                          ? "text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      Review and confirm your appointment details.
                    </span>
                  </span>
                </span>
              </button>
            </nav>
          </div>

          {services.length > 0 && professionals.length > 0 ? <div className="lg:col-span-6">
            <div className="relative">
              <div>
                <div
                  id="tabs-with-card-1"
                  role="tabpanel"
                  aria-labelledby="tabs-with-card-item-1"
                >
                  <div
                    className={`${
                      currentStep !== 1 && "hidden"
                    } relative shadow-xl shadow-gray-200 rounded-xl h-[567px] overflow-y-auto bg-gray-50 border-t-2 border-blue-500 rounded-t-xl
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                  `}
                  >
                    <div className="flex flex-col justify-center items-start gap-2 pb-4">
                      <div className="w-full sticky top-0 bg-gray-50 p-4 shadow">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Reserve Services, Professional, and Products
                        </h2>
                      </div>

                      <ServiceSelection
                        title="Select Services"
                        isModalOpen={servicesModelState}
                        setIsModalOpen={setServicesModelState}
                        data={updatedServicesData}
                        setData={setUpdatedServicesData}
                        options={services}
                      />

                      <hr className="border-2 w-full" />

                      <ServiceSelection
                        title="Select Professional"
                        isModalOpen={professionalModelState}
                        setIsModalOpen={setProfessionalModelState}
                        data={updatedProfessionalData}
                        setData={setUpdatedProfessionalData}
                        options={professionals}
                      />

                      <hr className="border-2 w-full" />

                      <ServiceSelection
                        title="Select Product"
                        isModalOpen={productsModelState}
                        setIsModalOpen={setProductsModelState}
                        data={updatedProductsData}
                        setData={setUpdatedProductsData}
                        options={products}
                      />
                    </div>
                  </div>
                </div>

                <div
                  id="tabs-with-card-2"
                  className={`${
                    currentStep !== 2 && "hidden"
                  } relative shadow-xl shadow-gray-200 rounded-xl h-[567px] overflow-y-auto bg-gray-50 border-t-2 border-blue-500 rounded-t-xl
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                `}
                  role="tabpanel"
                  aria-labelledby="tabs-with-card-item-2"
                >
                  <DatePicker
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                  />
                </div>

                <div
                  id="tabs-with-card-3"
                  className={`${
                    currentStep !== 3 && "hidden"
                  } relative shadow-xl shadow-gray-200 rounded-xl h-[567px] overflow-y-auto bg-gray-50 border-t-2 border-blue-500 rounded-t-xl
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                `}
                  role="tabpanel"
                  aria-labelledby="tabs-with-card-item-3"
                >
                  <Summary />
                </div>
              </div>

              <div className="hidden absolute -top-20 end-5 translate-x-20 md:block lg:translate-x-20">
                <svg
                  className="w-16 h-auto text-orange-500"
                  width="121"
                  height="135"
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          :
          <div className="lg:col-span-6">
          <div className="w-full min-h-[450px] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <svg
              className="size-10 text-gray-500 dark:text-neutral-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" x2="2" y1="12" y2="12"></line>
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              <line x1="6" x2="6.01" y1="16" y2="16"></line>
              <line x1="10" x2="10.01" y1="16" y2="16"></line>
            </svg>
            <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">
              Shop is not active right now 
            </p>
          </div>
        </div>
        </div>
        }
        </div>

        <div className="absolute inset-0 grid grid-cols-12 size-full">
          <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default ShopWizard;

const ModalComponent = ({
  title,
  options,
  isModalOpen,
  setIsModalOpen,
  qty = true,
  action = true,
  updatedData,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSaveValues = () => {
    let filteredValues = selectedValues.map((obj) => {
      // Filter the keys based on the qty flag
      const filteredEntries = Object.entries(obj).filter(([key]) => 
        qty 
          ? key !== "label" && key !== "value"
          : key !== "label" && key !== "value" && key !== "quantity"
      );
  
      const transformedEntries = filteredEntries.map(([key, value]) => {
        if (key === 'workingHours') {
          return [
            key,
            Object.entries(value).map(([day, hours]) => {
              if (Array.isArray(hours)) {
                return `${day}: ${hours.map(hour => `${hour.startHour}-${hour.endHour}`).join(", ")}`;
              } else {
                return `${day}: No hours`;
              }
            }).join("; ")
          ];
        }
        return [key, value];
      });
  
      return Object.fromEntries(transformedEntries);
    });
  
    updatedData(filteredValues);
    setIsModalOpen(false);
  };
  

  return (
    <>
      {isModalOpen && (
        <div
          id="hs-basic-modal"
          className="fixed top-0 left-0 z-50 w-full h-full flex items-start justify-center bg-black bg-opacity-50"
          style={{ pointerEvents: isModalOpen ? "auto" : "none" }}
        >
          <div className="mt-10 w-full sm:max-w-2xl sm:w-full m-3 sm:mx-auto bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                onClick={toggleModal}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <ReactSelect
              title={title}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                options={options}
                qty={qty}
                action={action}
              />
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                onClick={toggleModal}
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleSaveValues}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// eslint-disable-next-line react/prop-types
const DataTable = ({ columns }) => {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  {/* eslint-disable-next-line react/prop-types */}
                  {columns.length > 0 &&
                    Object.keys(columns[0])?.map(
                      (key) =>
                        key !== "_id" && (
                          <th
                            key={key}
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </th>
                        )
                    )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {columns.length > 0 &&
                  columns?.map((column) => (
                    <tr key={column._id}>
                      {Object.keys(column).map(
                        (key) =>
                          key !== "value" &&
                          key !== "label" &&
                          key !== "_id" && (
                            <td
                              key={key}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                            >
                              {column[key]}
                            </td>
                          )
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ReactSelect = ({
  title,
  options = [],
  selectedValues,
  setSelectedValues,
  qty,
  action,
}) => {
  const handleChange = (selectedOptions) => {
    const optionsArray = Array.isArray(selectedOptions)
      ? selectedOptions
      : [selectedOptions];
    const newSelectedValues = optionsArray.map((option) => ({
      ...option,
      quantity: 1,
    }));

    setSelectedValues((prev) => {
      let newValues;
      if (title === "Professional") {
        newValues = newSelectedValues;
      } else {
        newValues = [...prev, ...newSelectedValues];
        const uniqueValues = Array.from(new Set(newValues.map((v) => v._id))).map(
          (_id) => newValues.find((v) => v._id === _id)
        );
        newValues = uniqueValues;
      }
      return newValues;
    });
  };

  const updateQuantity = (_id, newQuantity) => {
    setSelectedValues((prev) =>
      prev.map((option) =>
        option._id === _id ? { ...option, quantity: newQuantity } : option
      )
    );
  };

  const handleDelete = (_id) => {
    setSelectedValues((prev) => prev.filter((o) => o._id !== _id));
  };

  return (
    <div className="flex flex-col">
      <Select
        options={options.map((option) => ({
          ...option,
          value: option._id,
          label: option.name,
        }))}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: "#ffffff",
            primary25: "#f5f5f5",
          },
        })}
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        onChange={handleChange}
      />
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr>
                  {Object.keys(options[0]).map((key) => (
                    key !== 'workingHours' && (
                      <th
                        key={key}
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    )
                  ))}
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Working Hours
                  </th>
                  {qty && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Qty
                    </th>
                  )}
                  {action && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {selectedValues.map((option) => (
                  <tr key={option._id}>
                    {Object.keys(option).map(
                      (key) =>
                        key !== "quantity" &&
                        key !== "value" &&
                        key !== "label" &&
                        key !== "workingHours" && (
                          <td
                            key={key}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                          >
                            {key === "_id"
                              ? `${option[key].slice(0, 8)}...`
                              : option[key]}
                          </td>
                        )
                    )}
                    {option.workingHours && (
                      <td
                        key="workingHours"
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                      >
                        {Object.entries(option.workingHours).map(
                          ([day, hours]) =>
                            Array.isArray(hours) && hours.length > 0 && (
                              <div key={day}>
                                {day}: {hours.map(hour => `${hour.startHour}-${hour.endHour}`).join(", ")}
                              </div>
                            )
                        )}
                      </td>
                    )}
                    {qty && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
                          <div className="flex items-center gap-x-1.5">
                            <button
                              type="button"
                              className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                              onClick={() =>
                                option.quantity > 1 &&
                                updateQuantity(option._id, option.quantity - 1)
                              }
                            >
                              <svg
                                className="flex-shrink-0 size-3.5"
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
                                <path d="M5 12h14"></path>
                              </svg>
                            </button>
                            <input
                              className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                              type="text"
                              value={option.quantity}
                              readOnly
                            />
                            <button
                              type="button"
                              className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                              onClick={() =>
                                updateQuantity(option._id, option.quantity + 1)
                              }
                            >
                              <svg
                                className="flex-shrink-0 size-3.5"
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
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                    {action && (
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                          onClick={() => handleDelete(option._id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};



const ServiceSelection = ({
  title,
  isModalOpen,
  setIsModalOpen,
  data,
  setData,
  options,
}) => (
  <div className="w-full p-4 flex flex-col">
    <button
      type="button"
      className="self-end py-3 px-4 mb-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400"
      onClick={() => setIsModalOpen(true)}
    >
      {title}
    </button>

    {data.length > 0 ? (
      <DataTable columns={data} />
    ) : (
      <div className="w-full min-h-20 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <svg
            className="size-10 text-gray-500 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" x2="2" y1="12" y2="12"></line>
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
            <line x1="6" x2="6.01" y1="16" y2="16"></line>
            <line x1="10" x2="10.01" y1="16" y2="16"></line>
          </svg>
          <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">
            No data to show
          </p>
        </div>
      </div>
    )}

    <ModalComponent
      title={title.split(" ")[1]}
      options={options}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      qty={title.includes("Product") || title.includes("Service")}
      action={true}
      updatedData={setData}
    />
  </div>
);
