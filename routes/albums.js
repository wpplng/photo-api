/**
 * Albums Routes
 */

const express = require('express');
const router = express.Router();
const {
	index,
	show,
	store,
	update,
	destroy,
} = require('../controllers/album_controller');

/* GET / all albums */
router.get('/', index);

/* GET /:albumId a specific album */
router.get('/:albumId', show);

/* POST / create a new album */
router.post('/', store);

/* PUT /:albumId update album by id */
router.put('/:albumId', update);

/* DELETE /:albumId delete an album by id */
router.delete('/:albumId', destroy);

module.exports = router;
