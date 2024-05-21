// shop.service.js
import instance from '../provider';


const findAllShops = async (page = 1, limit = 8) => {
  const { data } = await instance.get(`/shops?page=${page}&limit=${limit}`);
  return data;
};

const findShopById = async (id) => {
  const { data } = await instance.get(`/shops/${id}`);
  return data;
};

const findShopByUrlSlug = async (id) => {
  const { data } = await instance.get(`/shops/urlSlug/${id}`);
  return data;
};


const updateShop = async (id, updateShopDto) => {
  const { data } = await instance.patch(`/shops/${id}`, updateShopDto);
  return data;
};

export {
  findAllShops,
  findShopById,
  findShopByUrlSlug,
  updateShop,
};
