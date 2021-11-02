const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:String,required:false},
    author:{type:String,required:false}
});

module.exports = mongoose.model('Game', GameSchema);