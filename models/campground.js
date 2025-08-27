const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const CampSchema=new Schema({
    title:String,
    price:Number,
    Description:String,
    location:String
})

module.exports=mongoose.model('Campground',CampSchema);