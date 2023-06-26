import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import weather from "./api/routes/weather";

dotenv.config();
const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo ao Dashboard da Rebel Alliance");
});

app.use("/current", weather);

app.listen(3000, () => {
  console.log("Ta funcionando");
});
