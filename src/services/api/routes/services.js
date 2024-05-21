import instance from "../provider.js";

const fetchServicesPerShop = async (shopId) => {
    const {data} = await instance.get(`services/shops/${shopId}`);
    return data;
};

const getServicesById = async (serviceId) => {
    const {data} = await instance
        .get(`services/${serviceId}`,)
    return data;
};

export {
    fetchServicesPerShop,
    getServicesById,
}
