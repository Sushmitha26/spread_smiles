const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) { //u can define your own logic or use builtin validators
            if(!validator.isEmail(value))
                throw new Error("Invalid email")
        }
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    // choice: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password'))
                throw new Error("Password cannot be of value 'password' ")
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    //the file system actually gets wiped every time you deploy which means that we would lose data.
    //So instead of storing them on file system we'll add a field onto User model to store the image of binary data.
    avatar: {
        type: Buffer //This is going to allow us to store the buffer with our binary image data
    }
}, {
    timestamps: true
})

volunteerSchema.methods.generateAuthToken = async function() {  //we r accessing a method defined on userSchema,not statics
    const volunteer = this
    const token = jwt.sign({ _id: volunteer._id.toString() }, process.env.JWT_SECRET, { expiresIn: '5 days' }) //_id is an object id, so convert it into string
    
    volunteer.tokens = volunteer.tokens.concat({ token })
    await volunteer.save()

    return token
}

volunteerSchema.statics.findByCredentials = async (email, password) => {
    const volunteer = await Volunteer.findOne({ email })

    if(!volunteer)
        throw new Error("Invalid email/password")
    
    const isMatch = await bcrypt.compare(password, volunteer.password)

    if(!isMatch) 
        throw new Error("Invalid email/password")

    return volunteer
}

//hash plain password before saving to User
volunteerSchema.pre('save', async function(next) {
    const volunteer =  this 
    if(volunteer.isModified('password')) {
        volunteer.password = await bcrypt.hash(volunteer.password, 8)
    }

    next()
}) 


const Volunteer = mongoose.model('Volunteer', volunteerSchema)

module.exports = Volunteer

// const vol = new Volunteer({
//     name:'Sush',
//     email:'sush@gmail.com',
//     phone: 9373373633,
//     address: 'sdfsedfwef'
// })

// vol.save().then(() => { 
//     console.log(vol)
// }).catch((error) => {
//     console.log('Error!', error)
// })