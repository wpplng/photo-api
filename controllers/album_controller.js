/**
 * Album Controller
 */

const models = require('../models');

// Get index (GET /)
const index = async (req, res) => {};

// Get a specific id (GET /id)
const show = async (req, res) => {};

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
