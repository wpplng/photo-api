/**
 * Validation rules
 */

const { body } = require('express-validator');
const models = require('../models');

const createPhoto = [
	body('title').trim().notEmpty(),
	body('url').trim().notEmpty(),
	body('comment').optional().trim(),
];

const createUser = [
	body('email')
		.isLength({ min: 3 })
		.custom(async (value) => {
			const user = await new models.User({ email: value }).fetch({
				require: false,
			});
			if (user) {
				return Promise.reject('Email already exists.');
			}

			return Promise.resolve();
		}),
	body('password').isLength({ min: 3 }),
	body('first_name').isLength({ min: 2 }),
	body('last_name').isLength({ min: 2 }),
];

module.exports = {
	createPhoto,
	createUser,
};
