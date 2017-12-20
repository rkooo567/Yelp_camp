/* 
	Server file
*/

// library 
var express = require('express');
var util = require('./util/util');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/* var campgrounds = [
	{name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg"},
	{name: "Granite Hill", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Miniature_Granite_Quarry%2C_Table_Hill_-_geograph.org.uk_-_252959.jpg"},
	{name: "Diablo Mountain", image: "https://upload.wikimedia.org/wikipedia/commons/6/62/View_of_Mount_Diablo_and_CA_Highway_24_from_Lafayette_Heights.jpg"},
	{name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg"},
	{name: "Granite Hill", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Miniature_Granite_Quarry%2C_Table_Hill_-_geograph.org.uk_-_252959.jpg"},
	{name: "Diablo Mountain", image: "https://upload.wikimedia.org/wikipedia/commons/6/62/View_of_Mount_Diablo_and_CA_Highway_24_from_Lafayette_Heights.jpg"},
	{name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg"},
	{name: "Granite Hill", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Miniature_Granite_Quarry%2C_Table_Hill_-_geograph.org.uk_-_252959.jpg"},
	{name: "Diablo Mountain", image: "https://upload.wikimedia.org/wikipedia/commons/6/62/View_of_Mount_Diablo_and_CA_Highway_24_from_Lafayette_Heights.jpg"}
];*/

// object
var app = express();

// setup
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:/yelp_camp');

// Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// tryout
/*Campground.create(
	{
		name: "Granite Hill", 
		image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Miniature_Granite_Quarry%2C_Table_Hill_-_geograph.org.uk_-_252959.jpg",
		description: "This is a huge Granite Hill. No bathroom, no water, and beautiful granite."
	}, 
	function (err, campground){
		if (err){
			console.error(err);
		} else {
			console.log("Newly created campground: ");
			console.log(campground);
		}
	}
)*/

// routing

// GET home 
app.get("/", function(req, res){
	util.logRequestMessage("/", "GET");
	res.render("home");
});

// INDEX
app.get("/campgrounds", function(req, res){
	util.logRequestMessage("/campgrounds", "GET");
	// Get all the campgrounds from the DB
	Campground.find({}, function(err, allCampgrounds){
		if (err){
			console.error(err);
		} else {
			res.render("index.ejs", {campgrounds: allCampgrounds});
		}
	});
});

// CREATE
app.post("/campgrounds", function(req, res){
	util.logRequestMessage("/campgrounds", "POST");
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	// Create a new campground and save to the database
	Campground.create(newCampground, function(err, newCampground){
		if (err){
			console.error(err);
		} else {
			// redirect back to campground page
			res.redirect("/campgrounds")
		}
	});
	// get data from form and add to campground array
});

// NEW
app.get("/campgrounds/new", function(req, res){
	util.logRequestMessage("/campgrounds/new", "GET");
	res.render("new.ejs");
});

// SHOW - shows more information about one campground when id is given.
app.get("/campgrounds/:id", function(req,res){
	var id = req.params.id;
	util.logRequestMessage("/campgrounds/" + String(id), "GET");
	Campground.findById(id, function(err, foundCampground){
		if (err){
			console.error(err);
		} else {
			res.render("show.ejs", {campground: foundCampground});
		}
	});
});

// Listening server 
app.listen(8000, function(){
	console.log("Yelp camp server has started");
});