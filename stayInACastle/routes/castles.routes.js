const express = require("express")
const router = express.Router();
const Castle = require("../models/castle.model")
const User = require("../models/user.model");



//CREATE CASTLE (ADMIN)
router.get("/create", (req, res) => {
    res.render("castle-create")
 });

 router.post("/create", (req, res) => {
     const { name, country, address, image, capacity, link, description } = req.body;

     Castle.create({name, country, address, image, capacity, link, description})
     .then(() => res.redirect("/user-profile"))
     .catch(error => `Error with creating Castle ${error}`)
 });

 //Update castle (ADMIN) (POST)
router.get("/castles/:id/edit", (req, res) => {
    const { id } = req.params;

    Castle.findById( id )
    .then (castleToEdit => {
        res.render("castle-edit", castleToEdit); 
    })
    .catch(err => console.log(`Error occured while updating castle: ${err}`))
});

//Update castle (ADMIN) POST
router.post("/castles/:id/edit", (req, res) => {
    const { id } = req.params;
    const { name, country, address, image, capacity, link, description } = req.body; 

    Castle.findByIdAndUpdate( id, { name, country, address, image, capacity, link, description }, {new: true} )
    .then (updatedCastle => {
        res.redirect("/"); ///change into "/countries/${updatedCastle._id}"
    })
    .catch(err => console.log(`Error occured while updating castle: ${err}`))
});

//Delete castle (ADMIN)
router.post("/castles/:id/delete", (req, res) => {
    const { id } = req.params;

    Castle.findByIdAndDelete( id )
    .then (() =>  res.redirect("/"))
    .catch(err => console.log(`Error occured while deleting castle: ${err}`))
})

  //list by country
  router.get("/country", (req, res) => {
    const { country } = req.query

    Castle.find({ country })
      .then((castlesFromDB) => {
        console.log("castles are:", castlesFromDB)
        res.render("country", { castlesFromDB })
      }
      )
      .catch((error) => `Error while fetching countries: ${error}`);
  });

module.exports = router;