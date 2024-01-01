import express from "express";
const router = express.Router()

import { getProducts } from "../controllers/productControllers.js";

// Routes architecure
// Get all products /products
// get singleProduct /product/:id
// post product /product
// update product /product/:id
// delete product /product/:id

router.route('/products').get(getProducts).post()
router.route('/products/:id').get().patch().delete()

// router.get('/products')
// //

export default router