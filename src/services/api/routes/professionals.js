import instance from "../provider.js";

const fetchProfessionalsPerShop = async (shopId) => {
    const {data} = await instance
        .get(`professionals/shops/${shopId}`)
    return data;
};

const getProfessionalById = async (professionalId) => {
    const {data} = await instance
        .get(`professionals/${professionalId}`,)
    return data;
};


export {
    fetchProfessionalsPerShop,
    getProfessionalById,
}
