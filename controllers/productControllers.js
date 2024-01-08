import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc get all products
// Route GET /api/supermarket/products

const getProducts = async (req, res, next) => {

    const {category, search, sort, fields, page, limit, numericFilters} = req.query

    const qObject = {}

    if(category) {
        qObject.category = category
    }

    if(search) {
        qObject.productName = { $regex: search, $options: 'i'}
    }

    if(numericFilters) {

        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g

        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)

        const options = ['productPrice', 'quantity']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            console.log(field, operator)

            if(options.includes(field)) {
                qObject[field] = {[operator]: Number(value)}
            }
        })

        console.log(qObject)
    }

    console.log(qObject)


    try {
        let result = Product.find(qObject)
        if(sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList)
        }else{
            result = result.sort('createdAt')
        }
        
        if(fields){
            const fieldList = fields.split(',').join(' ')
            result = result.select(fieldList)
        }

        const pageNumber = Number(page) || 1
        const limitNumber = Number(limit) || 5

        const skip = (pageNumber -1) * limitNumber
        result = result.skip(skip).limit(limitNumber)

        const product = await result
        res.status(200).json({number: product.length, product})
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