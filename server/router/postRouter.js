import express from "express";
import { postModel } from "../db/postModel.js";

export function publicPostRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const posts = await postModel
        .find({})
        .populate("authorId")
        .populate("comments.authorId");
      res.status(200).send(posts);
    } catch (error) {
      console.log("error: " + error);
      res.status(404).send({ message: "someting went wrong" });
      res.end();
    }
  });

  router.post("/newPost", async (req, res) => {
    try {
      const post = req.body;
      const request = await postModel.create(post);
      request.save();
      res.status(200).send(request);
    } catch (error) {}
  });

  return router;
}
