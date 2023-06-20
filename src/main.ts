import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo ao Dashboard da Rebel Alliance");
});

app.listen(3000, () => {
  console.log("Ta funcionando");
});
