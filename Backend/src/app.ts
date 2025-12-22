import express from "express"
import globalRouter from "./modules/globalRouter/globalRouter"

const BuildServer = () => {
    const app = express()
    app.use(express.json())

    app.use("/", globalRouter)

    return app
}

export default BuildServer