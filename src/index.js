import Express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/config.js";
import shortRoutes from "./routes/shortner.routes.js";
import { redirectUrl } from "./controllers/shortner.controller.js";
import serverless from "serverless-http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express();

// Connect to MongoDB
connectDB();

// Move these middleware configurations before setting view engine
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req, res) => {
  res.render("index", { title: "URL Shortener" });
});

// API routes
app.use("/api", shortRoutes);

// Redirect route
app.get("/:code", redirectUrl);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export for serverless functions
export const handler = serverless(app);

export default app;
