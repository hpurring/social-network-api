const router = require('express').Router();
const userController = require('../../controllers/user-controller')

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  } = userController;

// Set up GET all and POST at /api/users
// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;