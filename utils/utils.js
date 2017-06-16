module.exports.validateModel = (err) => {
    const errorAttrs = Object.keys(err.errors);
    const errorResponse = errorAttrs.reduce((responseErr, error) => {
        responseErr[error] = err.errors[error]['message'];
        return responseErr;
    }, {});
    return errorResponse;
};