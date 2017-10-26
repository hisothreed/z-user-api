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

// GET USERS
router.get('/list_users' , authenticate_user ,userController.list_users);

// GET FRIENDS
router.get('/:id/list_friends' , authenticate_user ,userController.list_user_friends);

// GET SCHEDULES
router.get('/:id/list_schedules' , authenticate_user ,userController.list_user_schedules);

// GET USER TEAMS
router.get('/:user_id/list_teams' , authenticate_user ,userController.list_user_teams);

// PUT AUTH (EDIT USER - UPDATE USER)
router.put('/' ,authenticate_user ,userController.update_user);

// DELETE AUTH (DESTROY USER SESSION - SIGN OUT)
router.delete('/auth' ,authenticate_user ,userController.destroy_user);

// POST ADD FRIEND
router.post('/add_friend', authenticate_user ,userController.add_friend);

// DELETE FRIEND
router.delete('/remove_friend', authenticate_user, userController.remove_friend)

module.exports = router;
