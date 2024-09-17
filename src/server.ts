import express, { Express, Request, Response } from "express";
import cors from "cors";
import ErrorMiddleware from "./errorhandlers/errorMiddleware";
import dotenv from "dotenv";

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

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// ERROR middleware
app.use(ErrorMiddleware);

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
