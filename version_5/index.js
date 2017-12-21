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
var Comment = require("./models/comment")

// setup
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost:/yelp_camp_v5');

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
			res.render("./campgrounds/index", {campgrounds: allCampgrounds});
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
	res.render("./campgrounds/new");
});

// SHOW - shows more information about one campground when id is given.
app.get("/campgrounds/:id", function(req,res){
	var id = req.params.id;
	util.logRequestMessage("/campgrounds/" + String(id), "GET");
	Campground.findById(id).populate("comments").exec(function(err, foundCampground){
		if (err){
			console.error(err);
		} else {
			res.render("./campgrounds/show", {campground: foundCampground});
		}
	});
});

// ================================================================
// Comments route (nested)
// ================================================================

// NEW
app.get("/campgrounds/:id/comments/new", function(req, res){
	var id = req.params.id;
	util.logRequestMessage("/campgrounds/:id/comments/new" + String(id) , "GET");
	Campground.findById(id, function(err, campground){
		if(err) {
			console.error(err);
		} else {
			res.render("./comments/new", {campground: campground});
		}
	});
});

// POST
app.post("/campgrounds/:id/comments", function(req, res){
	var id = req.params.id;
	util.logRequestMessage("/campgrounds/:id/comments/" + String(id) , "POST");
	Campground.findById(id, function(err, campground){
		if(err) {
			console.error(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					console.error(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// Listening server 
app.listen(8000, function(){
	console.log("Yelp camp server has started");
});