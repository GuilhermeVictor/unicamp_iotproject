var moment 		 		= require('moment');
var removeDiacritics 	= require('diacritics').remove;
var Task 				= require('../models/task');
		
function getTaskDescription(config, command) {	
	if (config.commands.curtain.open.name == command)
		return config.commands.curtain.open.description;
	
	else if (config.commands.curtain.close.name == command)
		return config.commands.curtain.close.description;
	
	else if (config.commands.alarm.name == command)
		return config.commands.alarm.description;
	
	throw 'Invalid command "' + command + '" at getTaskDescription';
}

function getTaskImage(config, command) {
	if (config.commands.curtain.open.name == command)
		return config.commands.curtain.open.img;
	
	else if (config.commands.curtain.close.name == command)
		return config.commands.curtain.close.img;
	
	else if (config.commands.alarm.name == command)
		return config.commands.alarm.img;
	
	throw 'Invalid command "' + command + '" at getTaskImage';
}

function getWeekDays(config, hasRepeat, repeat) {
	return 'teste';
}

function TaskSchedulerController(config) {
	this.config = config;
}

TaskSchedulerController.prototype = {

	addTask: function (model, done) {
				
		var task = new Task();
		//task.id			= model.
        task.isEnabled	= model.isEnabled;
        task.isDeleted	= model.isDeleted;
        task.command	= model.command;
        task.hasRepeat	= model.hasRepeat;
        task.repeat		= model.repeat;
        task.time		= model.time;
        task.date		= model.date;
		
		// save the task
		task.save(function(err) {
			if (err)
				throw err;						
			return done(null, task);
		});
	},
	
	getAllFutureTasks: function(model, done) {
		var config = this.config;
		
		Task.find({
			isDeleted : false,
			date : { $gt : moment() }
		})
		.sort({date: 1})
		.exec(function (err, tasks) {
			
			if (err)
				done(err);
						
			model.tasks = new Array();
			
			tasks.forEach(function(task){
				model.tasks.push({
					_id: task._id,
					description: getTaskDescription(config, task.command),
					img: getTaskImage(config, task.command),
					time: task.time,
					weekDays: getWeekDays(config, task.hasRepeat, task.repeat)
				});
			});
			
			done(false, model);
		});
		
	},
	
	doCommandJob: function (done) {
		var config = this.config;
		
		var now = moment().set({ second: 0, millisecond: 0 });
						
		var time = now.format('HH:mm');
		
		var week = removeDiacritics(now.locale(config.locale).format('ddd').toLowerCase());
		
		console.log(now.format());
		
		Task.find({
			isDeleted: false,
			$or: [{ 
				hasRepeat: true,
				repeat: { 
					$elemMatch: { name: week, checked: true } 
				},
				time: time
			}, {
				hasRepeat: false,
				date: { 
					$gte: now.format(),
					$lte: now.add(59, 's').format(),					
				}
			}]
		})			
		.exec(function (err, tasks) {
			
			if (err)
				done(err);								
			
			tasks.forEach(function(task){
				
				//do command
				console.log('Do task:');
				console.log(task);
				
			});
			
			done(false);
		});		
	}
}

module.exports = function(config) {
	return new TaskSchedulerController(config);
}