import express from "express";
import "dotenv/config";
import AIRouter from "./Routes/ai.routes.js";
import cors from "cors";

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "https://ai-code-reviewer-10.vercel.app", // Allow only this origin
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(cors(corsOptions)); // Use the configured CORS options

// Middleware
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