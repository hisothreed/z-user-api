var app    = require('express')
var router = app.Router();

var userController = require('./../controllers/user-controller');

router.get('/:id',userController.get_user);
router.post('/',userController.create_user);


module.exports = router;
