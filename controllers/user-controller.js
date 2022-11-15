const { Thought, User } = require('../models');

const userController = {
    getAllUser(req, res) {
        User.find({})
            .populate({ path: 'thoughts', select: '-__v'})
            .populate({ path: 'friends', select: '-__v'})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate({ path: 'thoughts', select: '-__v'})
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { users: _id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'no user found with this id :('});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(404).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId }
            )
        .then(deletedUser => {
            if(!deleteUser) {
                return res.status(404).json({ message: 'No thought with this id'});
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { users: params.userId }},
                { new: true}
            );
        })
        .catch(err => res.json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: {friends: req.params.friendId }},
            { runValidators: true, new: true}
        )
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }, 
    
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId}},
            { new: true}
        )
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                return res.status(404).json({message: 'No user found with this id'});
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController;