import { Response } from "express";

export const InternalServerError = (res: Response, error: any) => {
    console.log(error);
    console.log(error.message);

    if (error.code === "ER_DUP_ENTRY") {
        res.status(409).json({
            success: false,
            message: error.sqlMessage,
        });
    } else {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
