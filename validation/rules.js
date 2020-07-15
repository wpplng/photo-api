/**
 * Validation rules
 */

const { body } = require('express-validator');
const models = require('../models');

const addPhotoToAlbum = [body('photo_id').trim().isNumeric()];

const createAlbum = [body('title').trim().isLength({ min: 2 })];

const createPhoto = [
	body('title').trim().isLength({ min: 2 }),
	body('url').trim().isLength({ min: 2 }),
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
	addPhotoToAlbum,
	createAlbum,
	createPhoto,
	createUser,
};
