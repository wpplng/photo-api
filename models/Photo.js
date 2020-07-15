/**
 * Photo model
 */

module.exports = (bookshelf) => {
	return bookshelf.model(
		'Photo',
		{
			tableName: 'photos',
			albums() {
				return this.belongsToMany('Album');
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
