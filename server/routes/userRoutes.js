const {
	register,
	login,
	addAvatar,
	getAllUsers,
} = require('../controllers/usersController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/addAvatar/:id', addAvatar);
router.get('/allUsers/:id', getAllUsers);

module.exports = router;
