import instance from "../provider.js";

const createNotification = async (inputData) => {
    const { data } = await instance.post('notifications', inputData);
    return data;
};

const fetchServicesPerShop = async (shopId) => {
    const {data} = await instance.get(`notifications/shops/${shopId}`);
    return data;
};

const updateNotificationPerShop = async (shopId, inputData) => {
    const {data} = await instance
      .patch(`notifications/shops/${shopId}`, inputData)
    return data;
};

export {
    createNotification,
    fetchServicesPerShop,
    updateNotificationPerShop,
}
