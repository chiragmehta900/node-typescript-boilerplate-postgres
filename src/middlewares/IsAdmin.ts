import { RequestFailed } from "./../response/RequestFailedResponse";
import { User } from "./../entity/User";
import { InternalServerError } from "./../response/InternalServerErrorResponse";
import { NextFunction, Response } from "express";
import { AuthRequest } from "./AuthRequestContext";

export const isAdmin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.userId;
        const user = await User.findOne(userId, { relations: ["role"] });

        if (!user || user.role.name.toLowerCase() !== "admin") {
            return RequestFailed(res, 403, "Unathorized Request");
        }
        next();
    } catch (error) {
        return InternalServerError(res, error);
    }
};
