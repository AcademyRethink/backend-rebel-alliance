import { Router } from "express";
import authController from "../controllers/authController";

const userRoutes: Router = Router();

userRoutes.post("/", authController.insert);
userRoutes.get("/login", authController.login);
userRoutes.get("/id/:userid", authController.showById);
userRoutes.get("/cpforcnpj/:usercpforcnpj", authController.showByCpfOrCnpj);
userRoutes.get("/name/:username", authController.showByName);
userRoutes.put("/id/:userid", authController.update);
userRoutes.delete("/id/:userid", authController.remove);

export { userRoutes };
