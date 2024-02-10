const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const dbURI = "mongodb://localhost:27017/MEAN_DEVOPS_DB";
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database~~~~~~~~");
  })
  .catch(() => {
    console.log("***Error Connecting to Database****");
  });

const personSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

app.post("/", (req, res) => {
  const person = new Person({ fullName: req.body.fullName });
  console.log(req.body);
  person
    .save()
    .then((createdPerson) => {
      res.status(200).json({
        message: "person created...",
        createdPeron: createdPerson,
      });
      console.log(createdPerson);
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});

// Get all persons
app.get("/", (req, res) => {
  Person.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
