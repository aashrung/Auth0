const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();


app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://auth0:auth0@auth0.3cz84x2.mongodb.net/Auth0-DB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )  
  .then(() => console.log("MongoDb is connected."))
  .catch( err => console.log(err));


app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});