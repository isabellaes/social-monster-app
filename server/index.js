import { connectToDb } from "./db/connectToDb.js";
import * as dotenv from "dotenv";
import { publicMonstertRouter } from "./router/monsterRouter.js";
import { publicPostRouter } from "./router/postRouter.js";
import Express from "express";

dotenv.config();

const server = Express();
const port = 3000;

server.use(Express.json());

server.use("*", async (req, res, next) => {
  await connectToDb();
  next();
});

server.use("/monster", publicMonstertRouter());
server.use("/post", publicPostRouter());

server.listen(port, () => {
  console.log("server running on port " + port);
});
