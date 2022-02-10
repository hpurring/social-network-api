const { User } = require('../models');

const userController = {

    // find all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // find single user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
        path: 'thoughts',
        path: 'friends',
        select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update user by _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete to remove user by _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
            )
        .then(dbFriendData => {
            if (!dbFriendData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbFriendData);
        })
        .catch(err => res.status(400).json(err));
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { reactions: { friends: params.friendId } } },
            { new: true }
        )
        .then(dbFriendData => res.json(dbFriendData))
        .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;