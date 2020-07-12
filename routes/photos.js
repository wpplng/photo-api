/**
 * Photos Routes
 */

const express = require('express');
const router = express.Router();
const {
	index,
	show,
	store,
	update,
	destroy,
} = require('../controllers/photo_controller');

/* GET / all photos */
router.get('/', index);

/* GET /:photoId a specific photo */
router.get('/:photoId', show);

/* POST / create a new photo  */
router.post('/', store);

/* PUT /:photoId update photo by id */
router.put('/:photoId', update);

/* DELETE /:photoId delete a photo by id */
router.delete('/:photoId', destroy);

module.exports = router;
