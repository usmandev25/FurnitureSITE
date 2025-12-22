import { Router } from "express";
import { getProduct, postProduct } from "./product.controller";

const router = Router()
router.post("/", postProduct)
router.get("/", getProduct)

export default router