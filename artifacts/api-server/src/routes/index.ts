import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import adminRouter from "./admin";
import consultationRouter from "./consultation";
import aiAcademyRouter from "./ai-academy";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(consultationRouter);
router.use(aiAcademyRouter);
router.use(adminRouter);

export default router;
