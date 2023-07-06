import { Router } from "express";
import addressController from "../controllers/addressController";

const addressRoutes: Router = Router();

addressRoutes.get("/", addressController.showAllAddresses);
addressRoutes.get("/id/:addressid", addressController.showById);
addressRoutes.get("/cep/:addresscep", addressController.showByCep);
addressRoutes.get("/street/:addressstreet", addressController.showByStreet);
addressRoutes.delete("/id/:addressid", addressController.remove);

export { addressRoutes };
