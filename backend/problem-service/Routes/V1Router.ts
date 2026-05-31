import { Router } from "express";
import problemRoutes from "./ProblemRoute";

const V1Router = Router();
V1Router.use("/problems", problemRoutes);


export default V1Router;
