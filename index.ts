import express, { Request, Response } from "express";
import cors from "cors";
import MongooseClient from "./src/database/MongooseClient";
import FeatureRoute from "./src/routes/v1/feature";
import { config } from "./src/configs";

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use("/feature", FeatureRoute);
  app.get("/", (req: Request, res: Response) => {
    res.json({
      health_check: "ok",
    });
  });

  MongooseClient.connect(config.mongoDBString)
    .then(async (res) => {
      console.log("MongoDB connected to " + res.connections[0].name);
      app.listen(config.port, () => {
        console.log("Listing listening at port: " + config.port);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
main();
