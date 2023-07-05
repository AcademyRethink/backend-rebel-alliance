import { Router } from "express";
import authController from "../controllers/authController";
import userDataValidator from "../middlewares/userDataValidator";

const userRoutes: Router = Router();

userRoutes.post(
  "/",
  userDataValidator.userDataValidator,
  authController.insert
);
userRoutes.get("/login", authController.login);
userRoutes.get("/id/:userid", authController.showById);
userRoutes.get("/cpforcnpj/:usercpforcnpj", authController.showByCpfOrCnpj);
userRoutes.get("/name/:username", authController.showByName);
userRoutes.patch(
  "/id/:userid",
  userDataValidator.userPatchDataValidator,
  authController.update
);
userRoutes.delete("/id/:userid", authController.remove);

export { userRoutes };
