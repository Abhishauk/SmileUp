const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema(
    {

        members:Array,

    },
    
    {
         timestamps:true
    }

);

const Chatmodal = mongoose.model('Chatmodal',chatSchema);
module.exports = Chatmodal;