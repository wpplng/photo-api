/**
 * Validation rules
 */

const { body } = require('express-validator');
const models = require('../models');

const addPhotosToAlbum = [
	body('photo_ids')
		.notEmpty()
		.isArray()
		.isNumeric()
		.custom(async (values, { req }) => {
			for (let i = 0; i < values.length; i++) {
				await models.Photo.fetchById(values[i], req.user.data.id);
			}
		}),
];

const createAlbum = [body('title').trim().isLength({ min: 2 })];

const createPhoto = [
	body('title').trim().isLength({ min: 2 }),
	body('url').trim().isLength({ min: 2 }).isURL(),
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

const updateAlbum = [body('title').optional().trim().isLength({ min: 2 })];

const updatePhoto = [
	body('title').optional().trim().isLength({ min: 2 }),
	body('url').optional().trim().isLength({ min: 2 }).isURL(),
	body('comment').optional().trim(),
];

module.exports = {
	addPhotosToAlbum,
	createAlbum,
	createPhoto,
	createUser,
	updateAlbum,
	updatePhoto,
};
