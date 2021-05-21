const express = require("express");
require('dotenv').config({path:"./config/keys.env"});
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const exphbs  = require('express-handlebars');
const dishes=require("./database/models/dishes.js");

const mongoose= require('mongoose');

var cookieParser = require('cookie-parser');
const flash = require('express-flash');
const fileUpload = require("express-fileupload");

const clientSessions = require("client-sessions");

const storeMealPackageController = require("./controller/product/storepackage");
const bcrypt = require('bcrypt');
const productListController = require("./controller/product/productList");
const app=express();
mongoose.connect("mongodb+srv://dbpkchauhan1:Pawan0945@cluster0.4yua9.mongodb.net/web311?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected"))
.catch(err => console.error("Not connected"));
mongoose.set('useCreateIndex', true);
  function ensureLogin(req, res, next) {
  if (!req.session.account2) {
    res.redirect("/login");
  } else {
    next();
  }
}
const MealPost = require('./database/models/Meal');
function ensureAdmin(req, res, next) {
  if (!req.session.account1 ) {
    res.redirect("/login");
  } else {
    next();
  }
}
app.use(clientSessions({
    cookieName: "session", 
    secret: "week10example_web322", 
    duration: 2 * 60 * 1000, 
    activeDuration: 1000 * 60 
  }));

  app.get("/welcome", ensureLogin, (req, res) => {
  
    res.render("welcome", {user: req.session.user, layout: false});
  });

  app.get("/admin", ensureAdmin, (req, res) => {
  
    res.render("admin", {user: req.session.user, layout: false});
  });

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(fileUpload());
  app.use(flash());
  app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static("public"))


app.get("/",(req,res)=>{
 res.render("home",{
     title : "Home Page",
     data : dishes.getAllProducts()
 })
});

const Schema = mongoose.Schema;
app.get('/mealpackages', productListController);

const dataSchema = new Schema({
  "Fname":  String,
  "Lname": String,
  "Email": String,
  "Password": String,
  "Employee": String
});

const BlogPost = mongoose.model('Web311',dataSchema);
/*app.listen(4000, () =>
{
    console.log("Web Server is running");
});*/


const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    cate: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    mealImage: {
        data: Buffer,
        contentType: String
    },
});

function onHttpStart() {
    console.log("Express http server listening on: ");
  }

  app.get('/packages', productListController);

app.get("/login",(req,res)=>{
    res.render("login",{
        title : "Login Page"
    })
});
    app.get("/editMealPackage",(req,res) =>
    {
        res.render("editMealPackage",{
            title: "Delete"
        })
    });
    app.post("/update",(req,res) =>
    { 
        if(req.body.name != "" && req.body.desc != "" && req.body.cate != "" && req.body.Price != "" && req.body.number != ""){
            MealPost.findOne({name:`${req.body.name}`})
            .exec()
            .then((account)=>{
                if(!account){
                    res.render("editMealPackage",{title:"Edit Packages",});
                }else{
                    
                    MealPost.updateOne({ name : `${req.body.name}` }, [ 
                      { $set: {name : `${req.body.name}`}},
                      { $set: {Price : `${req.body.Price}`}},
                      { $set: {desc : `${req.body.desc}`}},
                      { $set: {number : `${req.body.number}`}},
                      { $set: {cate : `${req.body.cate}`}}
                    ],function(err, result) {
                        if (err) {
                         
                        } else {
                          res.redirect("mealpackages");
                        }
                        });
            }
            });
        }
    });
app.post('/log',(req,res)=>
{ 
    
    let pass= "";
    let mail = "";
    if(req.body.Email == ""){
                mail = "This field cannot be empty";
    }  
    else{
    let regular_expression = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
    if(req.body.Password == "") 
    {
        pass = "Enter Password";
    }else if(req.body.Password!="")
        {
        }else{
        pass = "Password must be 6 digit, start with Capital letter and alphabets, numeric combination";
    }
}
        const Email = req.body.Email;
    if(pass != "" || mail !="" )
    {
        res.render("login",
        {
            title: "Error in submission",
            mError: mail,
            pError: pass
        });
    }else{
        const v = req.body.email;
        BlogPost.findOne({Email:`${req.body.Email}`})
        .exec()
        .then((account)=>{
            if(!account){
                res.render("login",{title:"Login",});
            }else{
                if(!bcrypt.compareSync(req.body.Password,account.Password)){
                        
                        if(account.Employee == 'employee')
                              {
                                  req.session.account1 = {Email: account.Email}
                                  res.render("admin",{fname : account.Fname , lname :account.Lname});
                              }
                              else{
                                  req.session.account2 = {Email: account.Email}
                                  res.render("welcome",{fname : account.Fname , lname :account.Lname});
                               }        
                    }
                    else{
                        res.render("login",{title:"Wrong Password,"});
                    }
                };
        });
    } 
});
app.get("/registration",(req,res)=>{
    res.render("registration",{
        title : "Registration Page"
    })
});
app.get("/add_meal", (req,res) => 
{
    res.render("add_meal",{
        title: "Register"
    });  
});
app.post("/store/meal/package",  storeMealPackageController);


        app.post('/send',(req,res)=>
        { 
            let fname = "";
    let lname = "";
    let pass= "";
    let mail = "";
    if(req.body.Fname == ""){
        fname = "This field cannot be empty";
    }
        if(req.body.Lname == ""){
            lname = "This field cannot be empty";
        }
            if(req.body.Email == ""){
                mail = "This field cannot be empty";
            } 
    let regular_expression = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;

    if(req.body.Password == "")
    {
        pass = "Enter Password";
    }else if(req.body.Password != "")
        {
        }else{
        pass = "Password must be 6 digit, start with Capital letter and alphabets, numeric combination";
    }
       
    if(pass != "" || fname != "" || lname != "" || mail !="" )
    {
        res.render("registration", {
            title: "Error in submission",
            pError: pass,
            fError: fname,
            lError: lname,
            mError: mail
        });
    }
    else{
    const Email = req.body.Email;
    
    BlogPost.findOne({Email:`${req.body.Email}`})
    .exec()
    .then((account)=>{
        if(account){
           
            res.render("registration",{title:"Try other email!",});
        }else{
                          
            req.body.Password = bcrypt.hashSync(req.body.Password,10);
            const newData = new BlogPost({
               Fname : `${req.body.Fname}`,
               Lname : `${req.body.Lname}`,
               Email: `${req.body.Email}`,
               Password: `${req.body.Password}`,
               Employee: `${req.body.Employee}`
            });
        
        
            newData.save((err) => {
                if(err) {
                  res.render("registration", {
                    title: "Submit"
                });
        
                } else {
        
                    bcrypt.genSalt(12, function (err, salt) {
                    if (err) {
                            //console.log("Error2");
                    }else{
        
                        bcrypt.hash(req.body.Password, salt, function (err, hash) {
        
                            if (err) {
                                console.log(err);
                            } else {
        
                                BlogPost.updateOne(
                                    {Email: req.body.Email},
                                    {$set: {Password: hash}}
                                ).exec();
                                res.render("welcome",{
                                    title: "welcome"
                                });
                            
        
                            }
                        });
                    }
                });
              }
                
            });
            };
    });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cpd.pawandeep@gmail.com',
          pass: 'pannu1234@'
        }
      });
      var mailOptions = {
        from: 'cpd.pawandeep@gmail.com',
        to: Email,
        subject: 'Sending Email using Node.js',
        text: 'Welcome to our website! Thankyou for signing in with us... ',
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    
    }
    });

app.get("/welcome",(req,res)=>{
    res.render("welcome",{
        title : "Welcome"
    })
});

app.listen(process.env.PORT, ()=>{
    console.log(`The webserver is up and running`);
})


