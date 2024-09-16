import { Router } from "express";
import { index, create, destroy, show, update } from "../controllers/book";

const bookRoutes: Router = Router();

bookRoutes.get("/", index);
bookRoutes.post("/", create);
bookRoutes.get("/:id", show);
bookRoutes.put("/:id", update);
bookRoutes.delete("/:id", destroy);

export default bookRoutes;
