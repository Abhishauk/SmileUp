const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema(
    {

        // members:Array,
        sender_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        receiver_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        message:{
            type:String,
            require:true
        }

    },
    
    {
         timestamps:true
    }

);

const Chatmodal = mongoose.model('Chatmodal',chatSchema);
module.exports = Chatmodal;