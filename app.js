const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
//Mongo require
const mongoose = require('mongoose');
const app = express();
const blogModal = require("./model/blog.js");
const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Mongoose connect
mongoose.connect(
    "mongodb+srv://ms727254:727254@cluster0.2xroh.mongodb.net/blogdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    },
    () => {
      console.log("mongdb is connected");
    }
);

app.get("/", (req, res) => {
    res.render('index');
})

app.get("/insert", (req, res) => {
    res.render('insert', {allData: ''});
})

app.post('/insert', async (req, res) => {
    
    var data = {"title": req.body.title, "body": req.body.body, "author": "Mahi"};
    if(req.body._id){
        blogModal.updateOne({_id : req.body._id}, { $set: data }, (err,data) => {
            if(err){
                console.log(err);
            }else{
                console.log(data._id +' is updated');
            }
            res.redirect('blogs')
        })
    }else{
        let blogDataToinsert = new blogModal(data);
        await blogDataToinsert.save((err,data) => {
            if(err){
                console.log(err);
            }else{
                console.log(data._id +' is inserted');
            }
        });
        res.redirect('blogs');
    }
    
})

app.get("/blogs", async (req, res) => {
    console.log('blogs page Starts');
    try {
        let data = await blogModal.find({});
        res.render('blogs', {allData: data});
    } catch(err){
        console.log(err);
    }

})

app.get('/deleteBlog/:id', (req, res) => {
    blogModal.deleteOne({ _id: req.params.id }, function(err) {
        if (err) {
            console.log(err)
        } else{
            console.log(req.params.id +' Deleted');
        }
        res.redirect('back')
    });
    
})

app.get('/editBlog/:id', async (req, res) => {
    try {
        let data = await blogModal.findOne({_id: req.params.id});
        console.log(data);
        res.render('insert', {allData: data});
    } catch(err){
        console.log(err);
    }
    
})

app.get('/viewBlog/:id', async (req, res) => {
    try {
        let data = await blogModal.findOne({_id: req.params.id});
        console.log(data);
        res.render('blog', {allData: data});
    } catch(err){
        console.log(err);
    }
    
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})