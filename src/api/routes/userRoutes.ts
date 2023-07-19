import { Router } from "express";
import authController from "../controllers/authController";
import userDataValidator from "../middlewares/userDataValidator";

const userRoutes: Router = Router();

userRoutes.get("/", authController.showAllUsers);
userRoutes.post("/login", authController.login);
userRoutes.post("/validatetoken", authController.vaidateToken);
userRoutes.get("/:userid", authController.showById);
userRoutes.get("/cpforcnpj/:usercpforcnpj", authController.showByCpfOrCnpj);
userRoutes.get("/name/:username", authController.showByName);
userRoutes.post(
  "/",
  userDataValidator.userDataValidator,
  authController.insert
);
userRoutes.patch(
  "/id/:userid",
  userDataValidator.userPatchDataValidator,
  authController.update
);
userRoutes.delete("/:userid", authController.remove);

export { userRoutes };
