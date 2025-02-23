import express from "express";
import "dotenv/config";
import AIRouter from "./Routes/ai.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/ai", AIRouter);

app.get("/", (req, res) => {
  res.send("Ai Code Reviewer!");
});

app.listen(4000, () => {
  console.log(`Server listening on Port 4000`);
});
