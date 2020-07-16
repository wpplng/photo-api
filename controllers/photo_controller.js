/**
 * Photo Controller
 */

const { matchedData, validationResult } = require('express-validator');
const { Photo, User } = require('../models');

/* Get all photos for a user (GET /) */
const index = async (req, res) => {
	// query db for user and photos relation
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, {
			withRelated: 'photos',
		});
	} catch (error) {
		res.status(404).send({
			status: 'fail',
			data: 'Not found.',
		});
		return;
	}

	// get the photos that this user has
	const photos = user.related('photos');

	res.send({
		status: 'success',
		data: {
			photos,
		},
	});
};

/* Get a specific id (GET /:photoId) */
const show = async (req, res) => {
	try {
		const photo = await Photo.fetchById(
			req.params.photoId,
			req.user.data.id
		);

		res.send({
			status: 'success',
			data: {
				photo,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when fetching photos.',
		});
		throw error;
	}
};

/* Create photo (POST /) */
const store = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);
	validData.user_id = req.user.data.id;

	try {
		const photo = await new Photo(validData).save();
		res.send({
			status: 'success',
			data: {
				photo,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new photo.',
		});
		throw error;
	}
};

/* Update a specific id (PUT /:photoId) */
const update = async (req, res) => {
	// Finds the validation errors in this request
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	try {
		const validData = matchedData(req);

		// fetch Photo model
		const photo = await Photo.fetchById(
			req.params.photoId,
			req.user.data.id
		);

		// save changes to photo
		await photo.save(validData);

		res.status(204).send({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to update photo.',
		});
		throw error;
	}
};

/* Delete photo (DELETE /:photoId) and albums associations */
const destroy = async (req, res) => {
	try {
		// fetch Photo model
		const photo = await Photo.fetchById(
			req.params.photoId,
			req.user.data.id
		);

		// detach albums from photos
		await photo.albums().detach();

		// delete photo
		await photo.destroy();

		res.send({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to delete album.',
		});
		throw error;
	}
};

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
