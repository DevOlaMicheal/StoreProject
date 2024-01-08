import Product from "./models/productModel.js";
import { connectDb } from "./db/db.js";
import dotenv from 'dotenv'
import data from "./data.js"
// const data = require('./data.js')

dotenv.config()

const connect = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(data)
        console.log("Success")
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}

connect()