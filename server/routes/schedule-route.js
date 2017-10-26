var app    = require('express')
var router = app.Router();
var {authenticate_user} = require('./../middleware/authentication');
var {authenticate_team_member} = require('./../middleware/authentication');
var {authenticate_schedule_creator} = require('./../middleware/authentication');
var scheduleController = require('./../controllers/schedule-controller');

// POST SCHEDULE CREATION
router.post('/', authenticate_user , scheduleController.create_schedule);

// GET SCHEDULES LISTING
router.get('/list_schedules', authenticate_user , scheduleController.list_schedules);

// GET SCHEDULES LISTING
router.get('/:schedule_id', authenticate_user , scheduleController.get_schedule);

// GET SCHEDULES LISTING
router.put('/', authenticate_schedule_creator , scheduleController.update_schedule);



module.exports = router;
