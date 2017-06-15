const {send}        = require('micro');
const {router, get} = require('microrouter');
const rateLimit     = require('micro-ratelimit');

const hello = rateLimit({window: 5000, limit: 2}, (req, res) => {
    send(res, 200, `Hello, ${req.params.who}`);
})

const notFound = (req, res) => {
    send(res, 404, 'Endpoint not found');
}

module.exports = router(
    get('/hello/:who', hello),
    get('/*', notFound)
);