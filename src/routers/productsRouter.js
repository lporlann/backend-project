import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../managers/productManager.js";

const pManager = new ProductManager();
const productsRouter = Router();




productsRouter.get('/' , async (req , res)=>{
    const products = await pManager.getProducts();
    const {limit} = req.query;
  
    if(limit){
      const limitresponse = products.slice(0 , limit)
      res.status(200).json({limitresponse})
    }else{
      res.status(200).json(products)
    }
  })

  productsRouter.get('/:pid' , async (req , res) =>{
    const id = parseInt(req.params.pid);
    const product = await pManager.getProductsById(id);
    if(product === "Not Found"){
      res.status(400).json({ message: "Product not found"})
    }else{
      res.status(200).json(product)
    }
  })



export default productsRouter;