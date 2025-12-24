import { Router } from "express";
import productRouter from "../product/product.route"
import authRouter from "../auth/auth.route"

const globalRouter = Router()
globalRouter.use("/products", productRouter)
globalRouter.use("/auth", authRouter)

export default globalRouter