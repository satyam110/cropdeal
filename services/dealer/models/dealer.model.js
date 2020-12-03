const mongoose = require('mongoose');
const { isEmail } = require('validator');


const dealerSchema = new mongoose.Schema({
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
        unique:true, 
    },
    password:{
        type:String,
        required:[true, 'Please enter password'],
        minlength:[6, 'Minimum password length is 6 characters']
    },
    description:{
        type:String,
    },
    role:{
        type:String,
        default:"dealer"
    },
    
    
    bank_details:{
        acc_no:{
            type:Number
        },
        bank_name:{
            type:String
        },
        ifsc_code:{
            type:String
        }
    },

    payment_details:{
        card_type:{
            type:String,
        },
        card_number:{
            type:Number,
            minlength:[16, 'Invlid Card Number']
        },
        expiry:{
            type:Date
        },
        cvv:{
            type:Number,
            minlength:[3, 'Invalid CVV']
        }
    }
    
    
});


module.exports = mongoose.model('Dealer',dealerSchema);