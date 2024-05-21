import instance from "../provider.js";

const createEmailConfirmation = async (inputData) => {
    const {data} = await instance
        .post("emails", inputData)
    return data
}

const createScheduledEmailConfirmation = async (inputData) => {
    const {data} = await instance
        .post("emails/scheduled", inputData)
    return data
}

export {
    createEmailConfirmation,
    createScheduledEmailConfirmation,
}
