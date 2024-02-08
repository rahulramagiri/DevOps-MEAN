const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const dbURI = "mongodb://localhost:27017/";
const port = process.env.PORT || 3000;


mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology: true})
        .then(()=> {
            console.log("Connected to database~~~~~~~~");
        })
        .catch(()=>{console.log("***Error Connecting to Database****");})

const personSchema = mongoose.Schema({
    fullName : {
        type:String,
        required:true,
    }
})

const Person = mongoose.model("Person",personSchema);

app.post('/persons', (req, res) => {
    const fullName = req.body.fullName;
    const person = new Person({ fullName });
    person.save()
        .then((value) => {res.status(200).json(value)})
        .catch(err => {res.status(500).json({ error: error.message }) })
    });
  
  // Get all persons
  app.get('/persons', (req, res) => {
     
      const persons =  Person.find().then()
      res.json(persons);
      (error) 
      res.status(500).json({ error: error.message });
    
  });

app.listen(port,()=>{
    console.log("Listening on port ", port);
})

