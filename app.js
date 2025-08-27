const express=require('express')
const app=express()
const path=require('path')

const Campground=require('./models/campground')
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp',{})
    .then(()=>{
        console.log("Mongo PORT CONNECTED")
    }).catch(err=>{
        console.log("ITS AN ERROR")
        console.log(err);
    })

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.listen(4003,()=>{
    console.log("PORT CONNECTED")
})

app.get('/',(req,res)=>{
    res.render('home')
})


app.get('/make',async (req,res)=>{
     res.send(First);
     await First.save()     
})

//index page
app.get('/camps',async (req,res)=>{
    const camp=await Campground.find({});
    res.render('index',{camp})
})


app.get('/camps/new',(req,res)=>{
    res.render('new')
})

app.post('/camps',async (req,res)=>{
    const {title,location}=req.body;
    const camp=new Campground({title,location});
    await camp.save();
    res.redirect(`/camps/${camp._id}`)
})


app.get('/camps/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const shows=await Campground.findById(id);
    res.render('edit',{shows})
})

app.put('/camps/:id',async (req,res)=>{
    console.log(req.body);
    const {id}=req.params;
    const edit=await Campground.findByIdAndUpdate(id,{...req.body})
    res.redirect(`/camps/${edit._id}`)
})

app.delete('/camps/:id',async (req,res)=>{
    const {id}=req.params;
    const delet=await Campground.findByIdAndDelete(id);
    res.redirect('/camps')
})

app.get('/camps/:id',async (req,res)=>{
     const {id}=req.params;
     const shows=await Campground.findById(id);
     res.render('show',{shows})
})


