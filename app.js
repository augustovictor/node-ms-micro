const {send} = require('micro');
const {router, get} = require('microrouter');

const hello = (req, res) => {
    send(res, 200, `Hello, ${req.params.who}`);
}

const notFound = (req, res) => {
    send(res, 404, 'Endpoint not found');
}

module.exports = router(
    get('/hello/:who', hello),
    get('/*', notFound)
);