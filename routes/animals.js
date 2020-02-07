var express = require("express");
var router = express.Router();
var Animal = require("../models/animal");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res) {
  // Get all campgrounds from DB
  Animal.find({}, function(err, allAnimals) {
    if (err) {
      console.log(err);
    } else {
      res.render("animals/index", { animals: allAnimals });
    }
  });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var disease = req.body.disease;
  var symptoms = req.body.symptoms;
  var no_of_days = req.body.no_of_days;
  var breed = req.body.breed;

  var village = req.body.village;
  var district = req.body.district;
  var state = req.body.state;
  var pincode = req.body.pincode;

  var medicine_used = req.body.medicine_used;
  var medicine_type = req.body.medicine_type;
  var newAnimal = {
    name: name,
    image: image,
    description: desc,
    author: author,
    disease: disease,
    symptoms: symptoms,
    no_of_days: no_of_days,
    breed: breed,
    village: village,
    district: district,
    state: state,
    pincode: pincode,
    medicine_used: medicine_used,
    medicine_type: medicine_type
  };

  // Create a new campground and save to DB
  Animal.create(newAnimal, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      console.log(newlyCreated);
      res.redirect("/animals");
    }
  });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("animals/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
  //find the campground with provided ID
  Animal.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundAnimal) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundAnimal);
        //render show template with that campground
        res.render("animals/show", { animal: foundAnimal });
      }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkAnimalOwnership, function(req, res) {
  Animal.findById(req.params.id, function(err, foundAnimal) {
    res.render("animals/edit", { animal: foundAnimal });
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkAnimalOwnership, function(req, res) {
  // find and update the correct campground
  Animal.findByIdAndUpdate(req.params.id, req.body.animal, function(
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect("/animals");
    } else {
      //redirect somewhere(show page)
      res.redirect("/animals/" + req.params.id);
    }
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkAnimalOwnership, function(req, res) {
  Animal.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/animals");
    } else {
      req.flash("error", "Deleted the livestock");
      res.redirect("/animals");
    }
  });
});

module.exports = router;
