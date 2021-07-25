const mongoose = require('mongoose') 
const FoodReceiver = require('./receiver')

const foodDonorSchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        required: true
    },
    email: {
      type:String,
      trim:true,
      required:true
    },
    phone: {
      type:String,
      trim:true,
      required:true
    },
    address: {
      type: String,
      trim: true,
      required: true
    },
    fooditems: {
      type: String,
      required: true
    },
    serves: {
      type: Number,
      required: true
    },
    deliverable: {
        type: Boolean,
        default: false
    },
    notOrdered: {
      type: Boolean,
      default: true
    }
}, {
    timestamps: true
})

foodDonorSchema.virtual('foodreceivers', {
  ref: 'FoodReceiver',
  localField: '_id', //the local field is that is where that local data is stored.
  foreignField: 'owner' //foreign field is the name of the field on the other thing in this case on the task that's going to create this relationship and we set that up to be the owner 
})

const FoodDonor = mongoose.model('FoodDonor', foodDonorSchema)

const medicineDonorSchema = new mongoose.Schema({
  name: {
    type:String,
    trim: true,
    required: true
  },
  email: {
    type:String,
    trim:true,
    required:true
  },
  phone: {
    type:String,
    trim:true,
    required:true
  },
  address: {
  type: String,
  trim: true,
  required: true
  },
  medicines: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  }
}, {
    timestamps: true
})

const MedicineDonor = mongoose.model('MedicineDonor', medicineDonorSchema);

module.exports = {
  FoodDonor,
  MedicineDonor
}

// const fd = new FoodDonor({
//       name: 'Sushmitha',
//       email: 'sush@gmail.com',
//       address: 'Mysuru',
//       phone: 9839383748,
//       peopleToServe: 5,
//       items: 'Vadapav',
//       canDeliver: false
// })
  
// fd.save().then(() => { 
//       console.log(fd)
//   }).catch((error) => {
//       console.log('Error!', error)
// })

