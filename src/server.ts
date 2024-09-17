import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import router from "./routes/route";
import { getData } from "./controllers/fetchData";

dotenv.config();

const app: Express = express();

// use CORS
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

// Serve apis
app.use("/api/", router);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Run getData periodically
setInterval(getData, parseInt(process.env.REFETCH_INTERVAL!) || 60000);

const startServer = async () => {
  try {
    const port = String(process.env.SERVER_PORT) || 5000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port} ...`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
