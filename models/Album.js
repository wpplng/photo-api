/**
 * Album model
 */

module.exports = (bookshelf) => {
	return bookshelf.model(
		'Album',
		{
			tableName: 'albums',
			photos() {
				return this.belongsToMany('Photo');
			},
			user() {
				return this.belongsTo('User');
			},
		},
		{
			fetchById(id, user_id, fetchOptions = {}) {
				return new this({ id, user_id }).fetch(fetchOptions);
			},
		}
	);
};
