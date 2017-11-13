/* 
	Server file
*/

// library 
var express = require('express');

// utility functions 
function logRequestMessage(msg){
	console.log(msg + " has been requested");
}

// variables

// constants
const HOME = "/";
const CAMPGROUNDS = "/campgrounds"

// object
var app = express();

// setup
app.set("view engine", "ejs");

// routing

// home 
app.get(HOME, function(req, res){
	logRequestMessage(HOME);
	res.render("home");
});

// campground
app.get(CAMPGROUNDS, function(req, res){
	logRequestMessage(CAMPGROUNDS);
	var campgrounds = [
		{name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg"},
		{name: "Granite Hill", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Miniature_Granite_Quarry%2C_Table_Hill_-_geograph.org.uk_-_252959.jpg"},
		{name: "Diablo Mountain", image: "https://upload.wikimedia.org/wikipedia/commons/6/62/View_of_Mount_Diablo_and_CA_Highway_24_from_Lafayette_Heights.jpg"}
	];
	res.render("campgrounds", {campgrounds: campgrounds});
});


// Listening server 
app.listen(8000, function(){
	console.log("Yelp camp server has started");
});