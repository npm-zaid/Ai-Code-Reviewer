import express from "express";
import "dotenv/config";
import AIRouter from "./Routes/ai.routes.js";
import cors from "cors";

const app = express();



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/ai", AIRouter);

app.get("/", (req, res) => {
  res.send("Ai Code Reviewer!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});