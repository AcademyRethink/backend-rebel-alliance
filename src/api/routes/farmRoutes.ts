import { Router } from "express";
import farmController from "../controllers/farmController";
import farmDataValidator from "../middlewares/farmDataValidator";

const farmRoutes: Router = Router();

farmRoutes.post(
  "/",
  farmDataValidator.farmDataValidator,
  farmController.insert
);
farmRoutes.get("/id/:farmid", farmController.showById);
farmRoutes.get("/cnpj/:farmcnpj", farmController.showByCnpj);
farmRoutes.get("/name/:farmname", farmController.showByName);
farmRoutes.patch(
  "/cnpj/:farmcnpj",
  farmDataValidator.farmPatchDataValidator,
  farmController.update
);
farmRoutes.delete("/id/:farmid", farmController.remove);

export { farmRoutes };
