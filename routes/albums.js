/**
 * Albums Routes
 */

const express = require('express');
const router = express.Router();
const {
	index,
	show,
	store,
	addPhoto,
	update,
	destroy,
} = require('../controllers/album_controller');
const {
	addPhotosToAlbum,
	createAlbum,
	updateAlbum,
} = require('../validation/rules');

/* GET / all albums */
router.get('/', index);

/* GET /:albumId a specific album */
router.get('/:albumId', show);

/* POST / create a new album */
router.post('/', [createAlbum], store);

/* POST /:albumId/photos */
router.post('/:albumId/photos', [addPhotosToAlbum], addPhoto);

/* PUT /:albumId update album by id */
router.put('/:albumId', [updateAlbum], update);

/* DELETE /:albumId delete an album by id */
router.delete('/:albumId', destroy);

module.exports = router;
