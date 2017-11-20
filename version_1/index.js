/* 
	Server file
*/

// library 
var express = require('express');
var util = require('./util/util');
var bodyParser = require('body-parser');

// variable
// database
var campgrounds = [
	{name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg"},
	{name: "Granite Hill", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Miniature_Granite_Quarry%2C_Table_Hill_-_geograph.org.uk_-_252959.jpg"},
	{name: "Diablo Mountain", image: "https://upload.wikimedia.org/wikipedia/commons/6/62/View_of_Mount_Diablo_and_CA_Highway_24_from_Lafayette_Heights.jpg"},
	{name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg"},
	{name: "Granite Hill", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Miniature_Granite_Quarry%2C_Table_Hill_-_geograph.org.uk_-_252959.jpg"},
	{name: "Diablo Mountain", image: "https://upload.wikimedia.org/wikipedia/commons/6/62/View_of_Mount_Diablo_and_CA_Highway_24_from_Lafayette_Heights.jpg"},
	{name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg"},
	{name: "Granite Hill", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Miniature_Granite_Quarry%2C_Table_Hill_-_geograph.org.uk_-_252959.jpg"},
	{name: "Diablo Mountain", image: "https://upload.wikimedia.org/wikipedia/commons/6/62/View_of_Mount_Diablo_and_CA_Highway_24_from_Lafayette_Heights.jpg"}
];

// object
var app = express();

// setup
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// routing

// GET home 
app.get("/", function(req, res){
	util.logRequestMessage("/", "GET");
	res.render("home");
});

// GET campground 
app.get("/campgrounds", function(req, res){
	util.logRequestMessage("/campgrounds", "GET");
	res.render("campgrounds", {campgrounds: campgrounds});
});

// POST campground
app.post("/campgrounds", function(req, res){
	util.logRequestMessage("/campgrounds", "POST");
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds")
	// get data from form and add to campground array
	// redirect back to campground page

});

// Page for the post campgrounds request
app.get("/campgrounds/new", function(req, res){
	util.logRequestMessage("/campgrounds/new", "GET");
	res.render("new.ejs");
});

// Listening server 
app.listen(8000, function(){
	console.log("Yelp camp server has started");
});