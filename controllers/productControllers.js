import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc get all products
// Route GET /api/supermarket/products

const getProducts = async (req, res, next) => {

    const {category, search} = req.query

    const qObject = {}

    if(category) {
        qObject.category = category
    }

    if(search) {
        qObject.productName = { $regex: search, $options: 'i' }
    }

    try {
        const product = await Product.find(qObject)
        res.status(200).json({product})
    } catch (error) {
        next(error)
    }
    
}

// @desc get single products
// Route GET /api/supermarket/products/:id

const getSingleProducts = async (req, res, next) => {

    try {
        const product = await Product.find()
    } catch (error) {
        next(error)
    }
    
}

// @desc add new product
// Route POST /api/supermarket/products

const addProduct = async (req, res, next) => {

    const {productName, productPrice, quantity, category} = req.body

    try {
        const product = await Product.create({productName, productPrice, quantity, category})
        res.json(200).json({product})
    } catch (error) {
        next(error)
    }
    
}


// @desc get all products
// Route GET /api/supermarket/products

// const getProductsS = async (req, res, next) => {

//     try {
//         const product = await Product.find()
//     } catch (error) {
//         next(error)
//     }
    
// }

export {
    getProducts,
    getSingleProducts,
    addProduct
}