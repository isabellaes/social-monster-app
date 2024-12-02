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
    } catch (error) {
      console.log("error: " + error);
      res.status(404).send({ message: "someting went wrong" });
      res.end();
    }
  });

  router.patch("/newComment/:id", async (req, res) => {
    try {
      const data = { text: req.body.text, authorId: req.body.authorId };

      const updatedPost = await postModel.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: data } },
        { new: true }
      );

      res.status(200).send(updatedPost);
    } catch (error) {
      console.log("error: " + error);
      res.status(404).send({ message: "someting went wrong" });
      res.end();
    }
  });

  router.patch("/newLike/:id", async (req, res) => {
    try {
      const updatedPost = await postModel.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true }
      );

      res.status(200).send(updatedPost);
    } catch (error) {
      console.log("error: " + error);
      res.status(404).send({ message: "someting went wrong" });
      res.end();
    }
  });

  return router;
}
