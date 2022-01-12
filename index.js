const express = require("express");
require("dotenv").config();
const cors = require("cors");

const ObjectId = require("mongodb").ObjectId;
const MongoUtil = require("./MongoUtil");

const mongoUrl = process.env.MONGO_URL;

let app = express();
app.use(express.json());

app.use(cors());

async function main() {

  let db = await MongoUtil.connect(mongoUrl, "exercise_list");

  app.get("/", function(req, res){
    res.json({
      "message": "Hello"
    })
  })

}

main();

// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});
