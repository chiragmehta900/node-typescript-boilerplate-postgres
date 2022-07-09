import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestFailed } from "../response/RequestFailedResponse";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { AuthRequest } from "./AuthRequestContext";

interface JWT_DECODE {
    id: number;
    username: string;
    iat: number;
    exp: number;
}

export const Auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return RequestFailed(res, 404, "Unauthorized / no token found");
        } else {
            const data = jwt.verify(token, process.env.TOKEN_SECRET!) as JWT_DECODE;
            req.userId = data.id;
            next();
        }
    } catch (error) {
        return InternalServerError(res, error);
    }
};
