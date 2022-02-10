const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById,
    createThought, 
    updateThought,
    deleteThought, 
    addReaction, 
    removeReaction 
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId')
    .post(createThought)
    .get(getAllThoughts);

// /api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .post(addReaction)
    .delete(deleteThought);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;