import instance from "../provider.js";

const fetchProductsPerShop = async (shopId) => {
    const {data} = await instance.get(`products/shops/${shopId}`);
    return data;
};

const getProductById = async (productId) => {
    const {data} = await instance.get(`products/${productId}`);
    return data;
};

export {
    fetchProductsPerShop,
    getProductById,
}
