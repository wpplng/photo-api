/**
 * Database connection
 */

const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'photo',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'photo-api',
		charset: 'utf8',
	},
});

const bookshelf = require('bookshelf')(knex);

/**
 * Models
 */

const Album = require('./Album')(bookshelf);
const Photo = require('./Photo')(bookshelf);
const User = require('./User')(bookshelf);

module.exports = {
	bookshelf,
	Album,
	Photo,
	User,
};
