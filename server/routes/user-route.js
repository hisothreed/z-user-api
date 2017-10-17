var app    = require('express')
var router = app.Router();
var {authenticate_user} = require('./../middleware/authentication');
var {authenticate_team_member} = require('./../middleware/authentication');
var userController = require('./../controllers/user-controller');



// POST USER (CREATE NEW USER - SIGN UP)
router.post('/' ,userController.create_user);

// POST AUTH (CREATE USER SESSION - SIGN IN)
router.post('/auth' ,userController.auth_user);

// GET USER INFO (READ USER INFO)
router.get('/:id' ,authenticate_user ,userController.get_user);

// PUT AUTH (EDIT USER - UPDATE USER)
router.put('/' ,authenticate_user ,userController.update_user);

// DELETE AUTH (DESTROY USER SESSION - SIGN OUT)
router.delete('/auth' ,authenticate_user ,userController.destroy_user);
// USER-TEAM REQUESTS

// POST REMOVE TEAM
router.post('/remove_team' , authenticate_team_member ,userController.remove_team);


module.exports = router;
