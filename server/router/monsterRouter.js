import express from "express";
import { monsterModel } from "../db/monsterModel.js";

export function publicMonstertRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const monsters = await monsterModel.find({});
      res.status(200).send(monsters);
    } catch (error) {
      console.log("error: " + error);
      res.status(404).send({ message: "someting went wrong" });
      res.end();
    }
  });

  router.post("/newMonster", async (req, res) => {
    try {
      const monster = req.body;
      const request = await monsterModel.create(monster);
      request.save();
      res.status(200).send(request);
    } catch (error) {}
  });

  return router;
}
