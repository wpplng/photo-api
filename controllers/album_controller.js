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
	let album = null;
	try {
		album = await Album.fetchById(req.params.albumId, {
			withRelated: 'photos',
		});
	} catch (error) {
		res.status(404).send({
			status: 'fail',
			data: 'Album not found.',
		});
		return;
	}

	const userId = album.get('user_id');

	if (userId !== req.user.data.id) {
		res.status(401).send({
			status: 'fail',
			data: `You don't have access to that album.`,
		});
		return;
	}

	res.send({
		status: 'success',
		data: {
			album,
		},
	});
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

// Update a specific id (PUT /id)
const update = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		data: null,
		message: 'Method not allowed',
	});
};

// Delete a specific id (DELETE /id)
const destroy = async (req, res) => {};

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
