import { Request, Response, NextFunction } from "express";
import { number, string, object } from "yup";

const hasTrueStrict: { strict: boolean } = { strict: true };

const idValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const idSchema = number().required("Id is required!");
    await idSchema.validate(id, hasTrueStrict);
    next();
  } catch (error) {
    next(error);
  }
};

const plotDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plot = req.body;
    const plotDataSchema = object({
      name: string().required("Name is required!"),
      farm_id: number().required("Farm id is required!"),
    });
    await plotDataSchema.validate(plot, hasTrueStrict);
    next();
  } catch (error) {
    next(error);
  }
};

export default { idValidator, plotDataValidator };
