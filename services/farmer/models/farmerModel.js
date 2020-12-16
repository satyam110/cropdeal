const mongoose = require('mongoose');
const { isEmail } = require('validator');

const farmerSchema = new mongoose.Schema({
    name:{type:String,required:[true, 'Please enter name']},
    email:{
        type:String,
        required:[true, 'Please enter an email'],
        unique:true,
        lowercase:true,
        validate: [isEmail, 'Please enter a valid email']
    },
    phone:{
        type:Number,
        required:[true, 'Please enter phone number'],
        maxlength:10,
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please enter password'],
        minlength:[6, 'Minimum password length is 6 characters']
    },
    description:{
        type:String
    },
    role:{
        type:String,
        default:'farmer'
    },
    bank_details:{
        bank_name:{
            type:String,
            default:''
        },
        acc_no:{
            type:Number,
            defualt:null
        },
        ifsc_code:{
            type:String,
            default:''
        }
    }
});


module.exports = mongoose.model('Farmer',farmerSchema);