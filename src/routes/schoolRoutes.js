import { Router } from "express";
import { addSchool, listSchools } from "../controllers/schoolControllers.controllers.js";



const router = Router();

router.route("/add").post(addSchool);
router.route("/list").get(listSchools);

export default router;