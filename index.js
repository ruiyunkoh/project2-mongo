const express = require("express");
require("dotenv").config();
const cors = require("cors");

const ObjectId = require("mongodb").ObjectId;
const MongoUtil = require("./MongoUtil");

const mongoUrl = process.env.MONGO_URI;

let app = express();
app.use(express.json());

app.use(cors());

async function main() {

 await MongoUtil.connect(mongoUrl, "exercise_list");

  // app.get("/", function(req,res){
  //   res.json({
  //     "message":"hello"
  //   })
  // })
  
  //Add in new exercise POST
  app.post("/new_exercise", async (req, res) => {
    const db = MongoUtil.getDB();

    let {poster, title, image, duration, description, routine, type, intensity, target_area, calories_burnt, tags} = req.body;
    if (!Array.isArray(tags)) {
      tags = [tags];
    }

    // let poster = req.body.poster;
    // let title = req.body.title;
    // let image = req.body.image;
    // let duration = req.body.duration;
    // let description = req.body.description;
    // let routine = req.body.routine;
    // let type = req.body.type;
    // let intensity = req.body.intensity;
    // let target_area = req.body.target_area;
    // let calories_burnt = req.body.calories_burnt;
    // let tags = req.body.tags;


    let result = await db.collection("exercises").insertOne({
      poster, 
      title, 
      image,
      duration,
      description,
      routine,
      type, 
      intensity,
      target_area,
      calories_burnt,
      tags
      
      // "poster": poster,
      // "title": title,
      // "image": image,
      // "duration": duration,
      // "description": description,
      // "routine": routine,
      // "type": type,
      // "intensity": intensity,
      // "target area": target_area,
      // "calories burnt": calories_burnt,
      // "tags": tags

    });
    res.json(result);

  });
}

main();

// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});
