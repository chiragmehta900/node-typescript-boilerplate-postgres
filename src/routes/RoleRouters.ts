import * as express from "express";
import { getAllRole,  createRole } from "../controllers/RoleController";

let router = express.Router();

router.get("/getall", getAllRole);

router.post("/create", createRole);


export = router;
