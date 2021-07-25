const express = require('express');
const { FoodReceiver, MedicineReceiver } = require('../models/receiver');
const { FoodDonor } = require('../models/donor');

const router = new express.Router()

router.get('/viewAvailableFood', async(req, res) => {
    const food_donors = await FoodDonor.find({}, function(err, data) {
        if (err) {
            res.json(err)
        } else {
            //console.log(data[0])
            res.render('viewAvailableFood', { Donors: data })
        }
    })
})


router.get('/applyforfood/:id', async(req, res) => {
    const _id = req.params.id

    const food_donor = await FoodDonor.findOne({ _id }, function(err, data) {
        if (err) {
            res.json(err)
        } else {
            //console.log(data)
            res.render('applyforfood', { Donor: data })
        }
    })
})

router.post("/applyforfood/:id", async(req, res) => {
    
    const myData = new FoodReceiver({
        ...req.body, //this will copy all parameters in body of request
        owner: req.params.id
    })
    try {
        await myData.save()
        console.log("item saved to database");

        const _id = req.params.id
        const donor = await FoodDonor.findOne({ _id }, function(err, data) {
            if (err) {
                res.json(err)
            } else {
                data.notOrdered = false;
                //console.log(data);
                data.save();
                res.render('viewAvailableFood', { Donors: data })
                res.redirect('/viewAvailableFood');
            }
        })
    } catch (e) {
        res.status(400).send("unable to save to database");
    }
});

router.post('/applyformedicine', (req, res) => {
    var myData = new MedicineReceiver(req.body);
    myData.save()
        .then(item => {
            console.log("item saved to database");
            res.redirect('/applyformedicine');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})

router.get('/applyformedicine', (req, res) => {
    res.render('applyformedicine', {
        title: 'applyformedicine',
        name: 'Sushmitha'
    })
})


module.exports = router