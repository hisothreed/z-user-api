var Team = require('./../models/team-model');
var User = require('./../models/user-model');
var Schedule = require('./../models/schedule-model');
const _  = require('lodash');
var {validate_parent} = require('./../middleware/validation');

exports.create_schedule = function(req, res) {
  var scheduleInfo   = _.pick(req.body, ['name' , 'description' , 'parent_type', 'parent_id']);

  scheduleInfo.creator_id = req.user._id;

  validate_parent(scheduleInfo.parent_type, scheduleInfo.parent_id)
  .then(() => {
    return Schedule.createSchedule(scheduleInfo);
  })
  .then(newSchedule => {
    res.send({ message : 'schedule created successfully', schedule_model : newSchedule});
  })
  .catch(e => {
    res.status(400).send(e);
  })
}

exports.update_schedule = function(req, res) {
  var schedule_id = req.body.schedule_id;
  var schedule_info = req.body;
  Schedule.updateSchedule(schedule_id, schedule_info)
  .then(savedSchedule => {
    res.send({ message: 'Schedule updated successfully', schedule_model : savedSchedule });
  })
  .catch(e => {
    console.log(e);
    res.status(422).send(e);
  })
}

exports.list_schedules = function(req, res) {
  Schedule.listSchedules()
  .then(docs => {
    res.send({ schedules : docs })
  })
  .catch(e => {
    res.status(400).send(e);
  })
}

exports.get_schedule = function(req, res) {
  var schedule_id = req.params.schedule_id;
  Schedule.getSchedule(schedule_id)
  .then(schedule => {
    res.send({ schedule_model : schedule });
  })
  .catch(e => {
    res.status(404).send(e);
  })
}
