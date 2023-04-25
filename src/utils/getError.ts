export const getError = (error: { response: { data: { message: any; }; }; message: any; }) => {
    return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
};