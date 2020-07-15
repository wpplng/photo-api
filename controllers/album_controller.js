/**
 * Album Controller
 */

const { matchedData, validationResult } = require('express-validator');
const { Album, User } = require('../models');

/* Get albums for a user (GET /) */
const index = async (req, res) => {
	// query db for user and albums relation
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, {
			withRelated: 'albums',
		});
	} catch (error) {
		res.status(404).send({
			status: 'fail',
			data: 'Not found.',
		});
		return;
	}

	// get the albums that this user has
	const albums = user.related('albums');

	res.send({
		status: 'success',
		data: {
			albums,
		},
	});
};

/* Get a specific id (GET /:albumId) */
const show = async (req, res) => {
	try {
		const album = await Album.fetchById(
			req.params.albumId,
			req.user.data.id,
			{
				withRelated: 'photos',
			}
		);

		res.send({
			status: 'success',
			data: {
				album,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when fetching albums.',
		});
		throw error;
	}
};

/* Create album (POST /) */
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
		const album = await new Album(validData).save();
		res.send({
			status: 'success',
			data: {
				album,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new album.',
		});
		throw error;
	}
};

/* Add photo to album (POST /:albumId/photos) */
const addPhoto = async (req, res) => {
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
		const photoIds = validData.photo_ids;

		// fetch Album model
		const album = await Album.fetchById(
			req.params.albumId,
			req.user.data.id
		);

		// detach photos from album (if already existing in album)
		await album.photos().detach(photoIds);
		// attach photos to album
		await album.photos().attach(photoIds);

		res.status(201).send({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to add photo to album.',
		});
		throw error;
	}
};

/* Update a specific id (PUT /:albumId) */
const update = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		data: null,
		message: 'Method not allowed',
	});
};

/* Delete album (DELETE /:albumId) and photos associations */
const destroy = async (req, res) => {
	try {
		// fetch Album model
		const album = await Album.fetchById(
			req.params.albumId,
			req.user.data.id
		);

		// detach photos from album
		await album.photos().detach();

		// delete album
		await album.destroy();

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
	addPhoto,
	update,
	destroy,
};
