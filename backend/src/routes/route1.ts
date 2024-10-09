import {Router} from "express";
import { Create } from "../controller/Task_01";
import { Read } from "../controller/Task_02";
import { statistics } from "../controller/Task_03";
import { barChart } from "../controller/Task_04";
import { pieChart } from "../controller/Task_05";
import { combined } from "../controller/Task_06";


const router =Router();

router.route("/create").post(Create);
router.route("/read/:month").get(Read);

router.route("/statistics/:month").get(statistics);
router.route("/bar-graph/:month").get(barChart);
router.route("/pie-chart/:month").get(pieChart);
router.route("/combined/:month").get(combined);
export default router;