var app    = require('express')
var router = app.Router();
var {authenticate} = require('./../middleware/authintication');
var userController = require('./../controllers/user-controller');



// POST USER (CREATE NEW USER - SIGN UP)
router.post('/' ,userController.create_user);

// POST AUTH (CREATE USER SESSION - SIGN IN)
router.post('/auth' ,userController.auth_user);

// GET USER INFO (READ USER INFO)
router.get('/:id' ,authenticate ,userController.get_user);

// PUT AUTH (EDIT USER - UPDATE USER)
router.put('/' ,authenticate ,userController.update_user);

// DELETE AUTH (DESTROY USER SESSION - SIGN OUT)
router.delete('/auth' ,authenticate ,userController.destroy_user);

module.exports = router;
