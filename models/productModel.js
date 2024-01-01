import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: [true, 'product name is required']
    },

    productPrice: {
        type: Number,
        required: [true, 'Price is required']
    },

    quantity: {
        type: Number,
        required: [true, 'Qty is required']
    },
    category: {
        type: [ String ],
        validate: {
            validator: function (v) {
                return v && v.length > 0
            }
        }
    },
    
}, {timestamps: true})

const Product = mongoose.model("product", ProductSchema)

export default Product