const express = require('express');
const router = express.Router();
const { validateJwtToken } = require('../controllers/middlewares/auth');
const { login, refresh, register } = require('../controllers/auth_controller');
const { createUser } = require('../validation/rules');

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'success' });
});

/* /albums */
router.use('/albums', [validateJwtToken], require('./albums'));

/* /photos */
router.use('/photos', [validateJwtToken], require('./photos'));

/* /login */
router.post('/login', login);

/* /refresh */
router.post('/refresh', refresh);

/* /register */
router.post('/register', [createUser], register);

module.exports = router;
