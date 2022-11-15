const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
     .route('/')
     .get(getAllThought)
     .post(createThought);

router 
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
    .post(createReaction);

router 
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;