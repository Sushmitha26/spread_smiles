const express = require('express');
const { FoodDonor, MedicineDonor } = require('../models/donor');

const router = new express.Router()

// router.get('/donate/food', aysnc (req, res) => {

// })

module.exports = router
router.get('/donatefood', (req, res) => {
    res.render('donatefood', {
        title: 'Donate Food',
        name: 'Sushmitha'
    })
  }) 
  router.get('/donatemedicine', (req, res) => {
    res.render('donatemedicine', {
        title: 'Donate Medicine',
        name: 'Sushmitha'
    })
  }) 

  router.post("/donatefood", (req, res) => {
    var myData = new FoodDonor(req.body);
    myData.save()
        .then(item => {
            console.log("item saved to database");
            res.redirect('/donatefood');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
router.post("/donatemedicine", (req, res) => {
  var myData = new MedicineDonor(req.body);
  myData.save()
      .then(item => {
          console.log("item saved to database");
          res.redirect('/donatemedicine');
      })
      .catch(err => {
          res.status(400).send("unable to save to database");
      });
});