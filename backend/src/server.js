import cors from "cors";
import express from "express";
import path from "path";
import http from "http";
import { connect } from "mongoose";
import { config } from "dotenv";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

config();

connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log("Error in database connection", err.message);
  });

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "authorization"],
};

const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, "../", "public/uploads")));
app.use(cors(corsOption));
app.use("/api/v1", routes);

const server = http.createServer(app);
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
