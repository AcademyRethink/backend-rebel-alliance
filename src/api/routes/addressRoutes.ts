import { Router } from "express";
import addressController from "../controllers/addressController";

const addressRoutes: Router = Router();

addressRoutes.get("/", addressController.showAllAddresses);
addressRoutes.get("/:addressid", addressController.showById);
addressRoutes.get("/cep/:addresscep", addressController.showByCep);
addressRoutes.get("/street/:addressstreet", addressController.showByStreet);
addressRoutes.delete("/:addressid", addressController.remove);

export { addressRoutes };
