var app    = require('express')
var router = app.Router();
var {authenticate} = require('./../middleware/authintication');
var userController = require('./../controllers/user-controller');



// GET USER INFO
router.get('/:id' ,userController.get_user);

// POST USER (CREATE NEW USER - SIGN UP)
router.post('/' ,userController.create_user);

// POST AUTH (CREATE USER SESSION - SIGN IN)
router.post('/auth' ,userController.auth_user);

// DELETE AUTH (DESTROY USER SESSION - SIGN OUT)
router.use('/auth', authenticate );
router.delete('/auth',userController.destroy_user);

module.exports = router;
