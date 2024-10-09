import {Router} from "express";
import { Create, Read } from "../controller/trans";


const router =Router();

router.route("/create").post(Create);
router.route("/read").get(Read);

export default router;