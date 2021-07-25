const express = require('express');
const Volunteer = require('../models/volunteer');
const { FoodReceiver, MedicineReceiver } = require('../models/receiver');
const { FoodDonor, MedicineDonor } = require('../models/donor');
const auth = require('../middleware/auth')

const router = new express.Router()
router.get('/volunteer', (req, res) => {
    res.render('volunteer', {
        title: 'volunteer',
        name: 'Sushmitha'
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'login',
        name: 'Sushmitha'
    })
})

router.post('/login', async (req,res) => {
    try {
        const volunteer = await Volunteer.findByCredentials(req.body.email, req.body.password)
        const token = await volunteer.generateAuthToken() //we r generating token for a single user instance,not on User object
        
        //res.send({volunteer, token});
        //console.log(volunteer);

        const item = req.body.choice;
        if (item == "food") {
            res.redirect('/food')
        } else {
            res.redirect('/viewAvailableMedicine')
        }
    }
    catch(e) {
        console.log('Error!!', e)
        res.status(404).send(e)
    }
})

router.post("/volunteer", (req, res) => {
    var myData = new Volunteer(req.body);
    myData.save()
        .then(item => {
            //console.log(item);
            console.log("item saved to database");
            // if (item.choice == "food") {
            //     res.redirect('/food')
            // } else {
            //     res.redirect('/viewAvailableMedicine')
            // }
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("unable to save to database");
        });
});

router.get('/collect/:id', async(req, res) => {
    const _id = req.params.id
    const owner = req.params.id
    const food_donor = await FoodDonor.deleteOne({ _id }, function(err, data) {
        if (err) {
            res.json(err)
        } else {
            //console.log(data)

        }
    })
    const food_receiver = await FoodReceiver.deleteOne({ owner }, function(err, data) {
        if (err) {
            res.json(err)
        } else {
            //console.log(data)
            // res.render('food');
        }
    })
    res.redirect('/food');
})

router.get('/medicine/:id', async(req, res) => {
    const _id = req.params.id

    const medicine_donor = await MedicineDonor.deleteOne({ _id }, function(err, data) {
        if (err) {
            res.json(err)
        } else {
            //console.log(data)
            res.render('viewAvailableMedicine', { Donors: data });
            res.redirect('/viewAvailableMedicine')
        }
    })
})

router.get('/food', async(req, res) => {
    let vol_food = [];
    const food_receivers = await FoodReceiver.find({}, function(err, data) {
        if (err) {
            res.json(err)
        } else {
            //console.log(data);
            for (let i = 0; i < data.length; i++) {
                //console.log(data[i]);
                const recv = data[i].canReceive;
                const owner = data[i].owner;
                const recv_name = data[i].name;
                //console.log(recv);
                // console.log(owner);
                const _id = owner;
                const food_donor = FoodDonor.findOne({ _id }, function(err, d_data) {
                    if (err) {
                        res.json(err)
                    } else {
                        //console.log(d_data)
                        const donor_name = d_data.name;
                        const deliver = d_data.deliverable;
                        //console.log(deliver);
                        if (recv == false && deliver == false) {
                            //console.log("if");
                            vol_food.push({
                                donor: donor_name,
                                receiver: recv_name,
                                _id: _id,
                                donor_address: d_data.address,
                                receiver_address: data[i].address,
                                recv_phone: data[i].phone,
                                recv_email: data[i].email,
                                recv_type: data[i].receiverType,
                                donor_email: d_data.email,
                                food_items: d_data.fooditems,
                                serves: d_data.serves,
                                phone: d_data.phone
                            })
                            //console.log(vol_food);
                        } else {
                            console.log("something wrong");
                        }
                    }
                })

            }
            res.render('food', { Donors: vol_food })
        }
    })
})

router.get('/viewAvailableMedicine', async(req, res) => {
    let donor_data;
    let receiver_data = [];
    const medicine_donors = await MedicineDonor.find({}, function(err, data) {
        if (err) {
            res.json(err)
        } else {
            // console.log(data)
            donor_data = data;
        }
    })

    const medicine_receiver = await MedicineReceiver.find({}, function(err, data) {
        if (err) {
            res.json(err)
        } else {
            //  console.log(data[0])
            receiver_data.push(data[0]);
        }
    })
    res.render('viewAvailableMedicine', { Donors: donor_data, Receivers: receiver_data });
})

module.exports = router