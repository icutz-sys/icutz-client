import instance from "../provider.js";

const updateClientById = async (clientId, inputData) => {
    const {data} = await instance.patch(
        `clients/${clientId}`,
        inputData,
    );
    return data;
};
const createClient = async (inputData) => {
    const {data} = await instance.post(
        `clients`,
        inputData,
    );

    return data
}

const getClientById = async (clientId) => {
    const {data} = await instance
        .get(`clients/${clientId}`)
    return data
}


export {
    updateClientById,
    createClient,
    getClientById,
}
