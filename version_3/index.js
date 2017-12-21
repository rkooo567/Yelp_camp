/* 
	Server file
*/

// library 
var express = require('express');
var util = require('./util/util');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var seedDB = require("./seeds");

seedDB();

// object
var app = express();
var Campground = require("./models/campground")

// setup
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:/yelp_camp_v3');

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
	Campground.findById(id).populate("comments").exec(function(err, foundCampground){
		if (err){
			console.error(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
});

// Listening server 
app.listen(8000, function(){
	console.log("Yelp camp server has started");
});