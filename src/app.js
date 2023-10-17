import  express  from "express";
import ProductManager from "./productManager.js";
import __dirname from "../utils.js";



const pManager = new ProductManager()
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/products' , async (req , res)=>{
  const products = await pManager.getProducts();
  const {limit} = req.query;

  if(limit){
    const limitresponse = products.slice(0 , limit)
    res.status(200).json({limitresponse})
  }else{
    res.status(200).json(products)
  }
})

app.get('/products/:pid' , async (req , res) =>{
  const id = parseInt(req.params.pid);
    const product = await pManager.getProductsById(id);
    if (product) {
      res.send({product});
    } else {
      res.send({ message: "Product not found" });
      return
    }
})






app.listen(8080, () => {
    console.log('Server on port 8080');
  });