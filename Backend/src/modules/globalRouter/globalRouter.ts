import { Router } from "express";
import productRouter from "../product/product.route"

const globalRouter = Router()
globalRouter.use("/products", productRouter)

export default globalRouter