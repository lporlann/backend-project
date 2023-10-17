import fs from "fs";
import __dirname from "../utils.js";





export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = (`${__dirname}/src/data/products.json`)
  }

  addProduct = async (name, description, price, thumbnail, stock, code) => {
    try {
      const product = {
        name: name,
        description: description,
        price: price,
        thumbnail: thumbnail,
        stock: stock,
        code: code,
      };

      const validateCode = this.products.find(
        (product) => product.code === code
      );
      if (
        !product.name ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.stock ||
        !product.code
      ) {
        console.log("complete all fields");
      }
      if (!validateCode) {
        let id;
        if (this.products.length == 0) {
          id = 1;
        } else {
          id = this.products[this.products.length - 1].id + 1;
        }
        this.products.push({ id , ...product });
        
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null)
        );
      } else {
        return console.log("repeated code");
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const parseData = JSON.parse(data);
        return parseData;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProductsById = async (id) => {
    try {
      let results = await this.getProducts();
      let product = results.find((p) => p.id === id);

      if (product) {
        return product;
      } else {
        return "Not Found";
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (id, updatedProduct) => {
    try {
      const products = await this.getProducts();
      const indexOfProduct = products.findIndex((p) => p.id === id);
      if (indexOfProduct === -1) {
        return `Can't find product with id : ${id}`;
      }

      products[indexOfProduct] = {
        ...products[indexOfProduct],
        ...updatedProduct,
      };

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null)
      );
      console.log(products[indexOfProduct])
      return products[indexOfProduct];
      
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === parseInt(id));

      if (index < 0) {
        return `Can't find product with id : ${id}`;
      }
      products.splice(index, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null)
      );

      return products;
    } catch (error) {
      console.log(error);
    }
  };
}

// const productManager = new ProductManager();

//  await productManager.addProduct(
//   "producto 1",
//   "descripcion 1",
//   12345,
//   "/public/images",
//   45,
//   "123abc"
// );


// await productManager.addProduct(
//   "producto 2",
//   "descripcion 2",
//   876,
//   "/public/images",
//   88,
//   "124abc"
// );
// await productManager.addProduct(
//   "producto 3",
//   "descripcion 3",
//   45,
//   "/public/images",
//   12,
//   "125abc"
// );
// await productManager.addProduct(
//   "producto 5",
//   "descripcion 5",
//   12345,
//   "/public/images",
//   45,
//   "123abh"
// );
//  const productById = await productManager.getProductsById(2);
//  const products = await productManager.getProducts();
//  console.log (products)
//  console.log(productById)

//  await productManager.updateProduct( 1 ,{
    
//     description : 'producto actualizado'
//  })

// await productManager.deleteProduct(3)