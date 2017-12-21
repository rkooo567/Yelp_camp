var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Clound's rest 3", 
		image: "https://cdn.allyosemite.com/images/content/12274_W4lKU_Yosemite_Upper_Pines_Campground__lg.jpg",
		description: "Very beautiful place to play around"
	},
	{
		name: "Clound's rest 4", 
		image: "https://cdn.allyosemite.com/images/content/12274_W4lKU_Yosemite_Upper_Pines_Campground__lg.jpg",
		description: "Very beautiful place to play around"
	},
	{
		name: "Clound's rest 5", 
		image: "https://cdn.allyosemite.com/images/content/12274_W4lKU_Yosemite_Upper_Pines_Campground__lg.jpg",
		description: "Very beautiful place to play around"
	}
]

function seedDB(){
	// remove all campgrounds
	Campground.remove({}, function(err){
		if (err) {
			console.log("error occured");
		} else { 
			console.log("removed campgrounds");
			// add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campgroundData){
					if (err){
						console.error(err);
					} else {
						console.log("added");
						// create comments on each campground
						Comment.create(
							{
								text: "Nice. But I wanted better internet",
								author: "Sang"
							}, 
							function(err, comment){
								if (err){
									console.error(err);
								} else {
									campgroundData.comments.push(comment);
									campgroundData.save();
									console.log("Created a new comment");
								}
						});
					}
				});
			});
		}
	});
}

module.exports = seedDB;