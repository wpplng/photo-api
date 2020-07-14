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
			fetchById(id, fetchOptions = {}) {
				return new this({ id }).fetch(fetchOptions);
			},
		}
	);
};
