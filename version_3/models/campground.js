var mongoose = require('mongoose');

// Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

// campground object
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;