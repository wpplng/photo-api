/**
 * User model
 */

const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
	return bookshelf.model(
		'User',
		{
			tableName: 'users',
			albums() {
				return this.hasMany('Album');
			},
			photos() {
				return this.hasMany('Photo');
			},
		},
		{
			hashSaltRounds: 10,

			fetchById(id, fetchOptions = {}) {
				return new this({ id }).fetch(fetchOptions);
			},

			// login metod
			login: async function (username, password) {
				const user = await new this({ username }).fetch({
					require: false,
				});
				if (!user) {
					return false;
				}

				const hash = user.get('password');

				return (await bcrypt.compare(password, hash)) ? user : false;
			},
		}
	);
};
