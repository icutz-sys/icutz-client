import instance from '../provider';

const fetchAppointmentsPerShop = async (shopId) => {
    const {data} = await instance
        .get(`appointments/shops/${shopId}`)
    return data;
};


const getAppointmentById = async (appointmentId, token = null) => {
    const {data} = token ?
        await instance.get(`appointments/${appointmentId}`, {
            headers: {
                Authorization: token,
            },
        }) : await instance.get(`appointments/${appointmentId}`)
    return data;
};


const createAppointment = async (inputData) => {
    const {data} = await instance.post(
        `appointments`,
        inputData,
    );

    return data
}

const updateAppointment = async (appointmentId, inputData) => {
    const {data} = await instance.patch(
        `appointments/${appointmentId}`,
        inputData,
    );

    return data
}


export {
    fetchAppointmentsPerShop,
    getAppointmentById,
    createAppointment,
    updateAppointment,
}
