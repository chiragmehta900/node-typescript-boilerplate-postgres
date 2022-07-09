import { Request, Response } from "express";
import { Role } from "../entity/Role";
import { InternalServerError } from "./../response/InternalServerErrorResponse";
import { RequestFailed } from "../response/RequestFailedResponse";

export const getAllRole = async (_: Request, res: Response) => {
  try {
    const roles = await Role.find();

    res.status(200).json({
      success: true,
      roles,
    });
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const name: string = req.body.name;

    if (!name || !name.trim().length) {
      return RequestFailed(res, 400, "name");
    }

    const roles = new Role();
    roles.name = name;
    await roles.save();
    res.status(200).json({
      success: true,
      roles,
    });
  } catch (error) {
    return InternalServerError(res, error);
  }
};
