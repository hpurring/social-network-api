const router = require('express').Router();
const { createThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(createThought)

// /api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(deleteThought);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;