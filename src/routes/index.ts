import { Router } from "express";
import bookRoutes from "./book";

const routes: Router = Router();

routes.use("/books", bookRoutes);

export default routes;