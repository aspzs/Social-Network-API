const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v'})
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found' });
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThought({ params, body}, res) {
            Thought.create(body)
              .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
              })
                .then((dbUserData) => {
                  if (!dbUserData) {
                     res.status(404).json({message: 'no thought found with this id :('});
                     return;
                  }
                  res.json({ message: "Thought created"});
        })
        .catch((err) => res.status(404).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true,})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteThought({params}, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
            )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id'});
            }

            return User.findOneAndUpdate(
                { thoughts: params.id },
                { $pull: {thoughts: params.id }},
                { new: true}
            );
        })
        .then((dbUserData) => {
            if(!dbUserData){
                return res
                .status(404)
            }
            res.json({ message: "Thought deleted"});
        })
        .catch((err) => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body }},
            { new: true, runValidators: true}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    }, 
    
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: { reactionId: params.reactionId }}},
            { new: true}
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;