// app/models/task.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var taskSchema = mongoose.Schema({
	id			: mongoose.Schema.ObjectId,
	isEnabled	: Boolean,
	isDeleted	: Boolean,		
	command		: { type: String, lowercase: true },
	hasRepeat	: Boolean,
	repeat		: Array,	
	time		: String,
	date		: Date 
});

// methods ======================


// create the model for tasks and expose it to our app
module.exports = mongoose.model('Task', taskSchema);