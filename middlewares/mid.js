exports.logRequest = (handler) => {
    return (req, res) => {
        console.log('Request received!');
        return handler(req, res);
    };
};