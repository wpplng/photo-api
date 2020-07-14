/**
 * Photo Controller
 */

const { matchedData, validationResult } = require('express-validator');
const { Photo, User } = require('../models');

/* Get all photos for a user */
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

// Get a specific id (GET /id)
const show = async (req, res) => {
	let photo = null;
	try {
		photo = await Photo.fetchById(req.params.photoId);
	} catch (error) {
		res.status(404).send({
			status: 'fail',
			data: 'Photo not found.',
		});
		return;
	}

	const userId = photo.get('user_id');

	if (userId !== req.user.data.id) {
		res.status(401).send({
			status: 'fail',
			data: `You don't have access to that photo.`,
		});
		return;
	}

	res.send({
		status: 'success',
		data: {
			photo,
		},
	});
};

// Create (POST /)
const store = async (req, res) => {};

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
