const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const sendEmail = require('../utils/mail.util')

const createProduct = asyncHandler(async (req, res, next) => {    
    const product = await Product.create(req.body)
    res.status(StatusCodes?.CREATED).json({
        status:ReasonPhrases?.OK,
        success:true,
        data:product
    })
});

const getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find()
    res.status(StatusCodes?.OK).json({
        status:ReasonPhrases?.OK,
        success:true,
        data:products
    })
});

const getProductDetail = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        res.status(StatusCodes?.BAD_REQUEST).json({
            status:ReasonPhrases?.BAD_REQUEST,
            success:false,
            error: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message:"Product not found"
        })
    }
    
    res.status(StatusCodes?.OK).json({
        status:ReasonPhrases?.OK,
        success:true,
        data:product
    })

});

const updateProduct = asyncHandler(async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        res.status(StatusCodes?.BAD_REQUEST).json({
            status:ReasonPhrases?.BAD_REQUEST,
            success:false,
            error: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    })

    res.status(StatusCodes?.OK).json({
        status:ReasonPhrases?.OK,
        success:true,
        data:product
    })
})

const deleteProduct = asyncHandler(async(req,res,next)=>{
    let product = Product.findById(req.params.id)
    if(!product){
        res.status(StatusCodes?.BAD_REQUEST).json({
            status:ReasonPhrases?.BAD_REQUEST,
            success:false,
            error: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message:"Product not found"
        })
    }

     await product.remove()

    res.status(StatusCodes?.OK).json({
        status:ReasonPhrases?.OK,
        success:true,
        message:'Product deleted successfully'
    })
})

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetail
};
