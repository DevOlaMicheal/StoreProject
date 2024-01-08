import express from "express"
import { connectDb } from "./db/db.js"
import * as dotenv from "dotenv"
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from "./middlewares/errorHandler.js"

dotenv.config()
const app = express()

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => console.log('connected and listening'))
    } catch (error) {
        console.log(error.message);
    }
}

start()

app.use(express.json())

app.use('/api/shop', productRoutes)

app.use(notFound)
app.use(errorHandler)

