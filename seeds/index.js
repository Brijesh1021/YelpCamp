const cities=require('./cities')
const {places,descriptors}=require('./randomseed')

const Campground=require('../models/campground')
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp',{})
    .then(()=>{
        console.log("Mongo PORT CONNECTED")
    }).catch(err=>{
        console.log("ITS AN ERROR")
        console.log(err);
    })

const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        
        const rand=Math.floor(Math.random()*1000)
        const placename=array=>array[Math.floor(Math.random()*20)]
        const title=`${placename(descriptors)} ${placename(places)}`

        const newCamp=new Campground({
            location:`${cities[rand].city}, ${cities[rand].state}`,
            title:title
        })
        await newCamp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
});