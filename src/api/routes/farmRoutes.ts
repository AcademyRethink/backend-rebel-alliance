import { Router } from "express";
import farmController from "../controllers/farmController";

const farmRoutes: Router = Router();

farmRoutes.post("/", farmController.insert);
farmRoutes.get("/id/:farmid", farmController.showById);
farmRoutes.get("/cnpj/:farmcnpj", farmController.showByCnpj);
farmRoutes.get("/name/:farmname", farmController.showByName);
farmRoutes.put("/id/:farmid", farmController.update);
farmRoutes.delete("/id/:farmid", farmController.remove);

export { farmRoutes };
