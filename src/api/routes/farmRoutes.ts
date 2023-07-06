import { Router } from "express";
import farmController from "../controllers/farmController";
import farmDataValidator from "../middlewares/farmDataValidator";

const farmRoutes: Router = Router();

farmRoutes.get("/", farmController.showAllFarms);
farmRoutes.get("/:farmid", farmController.showById);
farmRoutes.get("/cnpj/:farmcnpj", farmController.showByCnpj);
farmRoutes.get("/name/:farmname", farmController.showByName);
farmRoutes.post(
  "/",
  farmDataValidator.farmDataValidator,
  farmController.insert
);
farmRoutes.patch(
  "/cnpj/:farmcnpj",
  farmDataValidator.farmPatchDataValidator,
  farmController.update
);
farmRoutes.delete("/:farmid", farmController.remove);

export { farmRoutes };
