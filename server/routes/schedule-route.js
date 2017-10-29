var app    = require('express')
var router = app.Router();
var {authenticate_user} = require('./../middleware/authentication');
var {authenticate_team_member} = require('./../middleware/authentication');
var {authenticate_schedule_creator} = require('./../middleware/authentication');
var scheduleController = require('./../controllers/schedule-controller');

// POST SCHEDULE CREATION
router.post('/', authenticate_user , scheduleController.create_schedule);

// POST SCHEDULE CREATION
router.post('/:schedule_id/join', authenticate_user , scheduleController.join_schedule);

// POST SCHEDULE CREATION
router.post('/:schedule_id/kick', authenticate_schedule_creator , scheduleController.kick_participant);

// GET SCHEDULES LISTING
router.get('/schedules', authenticate_user , scheduleController.list_schedules);

// GET SCHEDULES LISTING
router.get('/:schedule_id', authenticate_user , scheduleController.get_schedule);

// GET SCHEDULES LISTING
router.put('/', authenticate_schedule_creator , scheduleController.update_schedule);

// DELETE SCHEDULE
router.delete('/:schedule_id', authenticate_schedule_creator , scheduleController.delete_schedule);


module.exports = router;
