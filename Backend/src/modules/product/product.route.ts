import { Router } from "express";
import {
  deleteProduct,
  getOneProduct,
  getProduct,
  getSearchProduct,
  postProduct,
  updateProduct,
} from "./product.controller";

const router = Router();
router.post("/", postProduct);
router.get("/", getProduct);
router.get("/search", getSearchProduct);
router.get("/:id", getOneProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
