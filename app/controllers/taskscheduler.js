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

function getWeekDays(config, task, hasRepeat, repeat) {
	var result = '';
	
	if (task.hasRepeat) {
		for(var i = 0; i < 7; i++) {			
			if (task.repeat[i].checked == true) {				
				result = result + ', ' + moment().day(i).locale(config.locale).format('ddd').toLowerCase();
			}
		}
		result = result.substring(2);
	}
	else {
		
		if (moment().day() == moment(task.date).day()) {
			result = 'hoje'
		}
		else {
			result = 'amanhã'
		}
	}
	
	return result;
}

function TaskSchedulerController(config, arduinoserialport) {
	this.config = config;	
	this.arduinoserialport = arduinoserialport;
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
								
			return done(err, task);
		});
	},
	
	getAllFutureTasks: function(model, done) {
		var config = this.config;
		
		Task.find({
			isDeleted : false,
			$or : [{
				hasRepeat: false,
				date : { $gt : moment() }
			},{
				hasRepeat: true				
			}]
		})
		.sort({time: 1})
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
					weekDays: getWeekDays(config, task)
				});
			});
			
			done(false, model);
		});
		
	},
	
	deleteTask: function(id, done) {
		Task.findOne({ _id: id }, function (err, task){
			if (err)
				done(err);

			task.isDeleted = true;		  
			
			task.save(function (err, task){			
				done(err);
			});
		});
	},
	
	doCommandJob: function (done) {
		var config = this.config;
		var arduinoserialport = this.arduinoserialport;
		
		var now = moment().set({ second: 0, millisecond: 0 });
						
		var time = now.utc().format('HH:mm');
		
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
				
				var command = task.command;
				
				if (config.commands.curtain.open.name == command) {
					arduinoserialport.setCurtainStatus(config.commands.curtain.open.name, function () {
						done(false);
					});
					
				} else if (config.commands.curtain.close.name == command) {
					arduinoserialport.setCurtainStatus(config.commands.curtain.close.name, function () {
						done(false);
					});
				} else if (config.commands.alarm.name == command) {
					arduinoserialport.buzz(function () {
						done(false);
					});
				}
				
			});					
		});		
	}
}

module.exports = function(config, arduinoserialport) {
	return new TaskSchedulerController(config, arduinoserialport);
}