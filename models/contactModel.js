const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_Id:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:"User",

    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],   
    },
    
        lastname:{
            type: String,
            required: [true, "Please add your lastname"]
        },

        bloodType:{
            type: String,
            required:[true, "Please add your bloodtype"]
        }
    ,
    email: {
        type:String,
         required: [true, "Please add the contact email address"]
    },
    phone:  {
        type:String,
        required:[ true, "Please add the contact phone number"]
    },
    
},{
    timestamps:true
})



module.exports = mongoose.model("Contact", contactSchema)