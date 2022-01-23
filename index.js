const express = require("express");
require("dotenv").config();
const cors = require("cors");

const ObjectId = require("mongodb").ObjectId;
const MongoUtil = require("./MongoUtil");
const { request } = require("express");

const mongoUrl = process.env.MONGO_URI;

let app = express();
app.use(express.json());

app.use(cors());

async function main() {

  await MongoUtil.connect(mongoUrl, "exercise_list");

  // app.get("/", function (req, res) {
  //   res.json({
  //     "message": "hello"
  //   })
  // })

  //Add in new exercise POST
  app.post("/new_exercise", async (req, res) => {
    const db = MongoUtil.getDB();

    let { poster, title, image, duration, description, routine, type, intensity, targetArea, caloriesBurnt, tags } = req.body;
    if (!Array.isArray(tags)) {
      tags = [tags];
    }

    let result = await db.collection("exercises").insertOne({
      "poster": poster,
      "title": title,
      "image": image,
      "duration": duration,
      "description": description,
      "routine": routine,
      "type": type,
      "intensity": intensity,
      "target_area": targetArea,
      "calories_burnt": caloriesBurnt,
      "tags": tags

    });
    res.json(result);

  });

  //Get endpoint

  app.get("/find_exercise", async (req, res) => {
    const db = MongoUtil.getDB();
    let criteria = {};

    if (req.query.title) {
      criteria["title"] = {
        $regex: req.query.title,
        $options: "i"
      }
    }

    if (req.query.type) {
      criteria["type"] = {
        $regex: req.query.type,
        $options: "i"
      }
    }

    if (req.query.intensity) {
      criteria["intensity"] = {
        $regex: req.query.intensity,
        $options: "i"
      }
    }

    let results = await db
      .collection("exercises")
      .find(criteria)
      .toArray();

    res.json(results);
  });

  app.get('/find_exercise/:exerciseId', async (req, res) => {
    console.log(`get`, req)
    const db = MongoUtil.getDB();
    let results = await db.collection('exercises').findOne({
      _id: ObjectId(req.params.exerciseId)
    });
    res.send(results);
  });

  // Update document in API

  app.put("/find_exercise/:id", async (req, res) => {
    console.log(`put`, req);
    let { poster, title, image, duration, description, routine, type, intensity, targetArea, caloriesBurnt, tags } = req.body;
    if (!Array.isArray(tags)) {
      tags = [tags];
    }

    let results = await db.collection('exercises').updateOne({
      _id: ObjectId(req.params.id)
    }, {
      '$set': {
        "poster": poster,
        "title": title,
        "image": image,
        "duration": duration,
        "description": description,
        "routine": routine,
        "type": type,
        "intensity": intensity,
        "target_area": targetArea,
        "calories_burnt": caloriesBurnt,
        "tags": tags
      }
    })
    res.send(results);
  });

  //Delete document in API

  app.delete("/new_exercise/:id", async (req, res) => {
    let results = await db.collection("exercises").remove({
      _id: ObjectId(req.params.id)
    });
    res.send(results);
  });

}

main();

// START SERVER
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
