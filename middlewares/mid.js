exports.logRequest = (next) => {
    return (req, res) => {
        console.log('Request received!');
        return next(req, res);
    };
};