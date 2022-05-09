import express from "express";
import "dotenv/config";
import "reflect-metadata";
import "es6-shim";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { connect } from "../database";
import candidateRouter from "./routes/candidate";
import voteRouter from "./routes/vote";
import electionRouter from "./routes/election";

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer);
const port = process.env.PORT || 3000;

//database
connect();

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("combined"));
app.use(passport.initialize());

app.get("/healthcheck", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    status: true,
    message: "Server is available.",
  });
});

//Router
app.use("/api/candidates", candidateRouter);
app.use("/api/vote", voteRouter);
app.use("/api/election", electionRouter);

io.on("connection", (client) => {
  console.log("new connection", client.id);

  client.on("disconnect", () => {
    console.log("client disconnected", client.id);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is listening at port ${port}.`);
});
