
class ProductManager {

    constructor(){
        this.products = [];

    }

    addProduct(name , description , price , thumbnail , stock , code){
        
        const product = {
            name: name,
            description: description,
            price: price,
            thumbnail: thumbnail,
            stock: stock,
            code: code
        }

        const validateCode = this.products.find(product => product.code === code)
            if(!validateCode){
                let id;
                if(this.products.length == 0){
                    id = 1
                }else{
                    id = this.products[this.products.length -1].id +1
                }
                this.products.push({...product , id})
                
            }else{
                return console.log('repeated code')
            }
    }

    getProducts(){
        console.log(this.products)
        return this.products;
    }

    getProductsById(id){
        
        const products = this.getProducts()
        const result = products.find(product => product.id === id)

        if(result){
            console.log(result) 
        }else{
            console.log('product not found')
        }
    }

}


const productManager = new ProductManager;

productManager.addProduct('producto 1' , 'descripcion 1' , 12345 , '/public/images' , 45 , '123abc');
productManager.addProduct('producto 2' , 'descripcion 2' , 876 , '/public/images' , 88 , '124abc');
productManager.addProduct('producto 3' , 'descripcion 3' , 45 , '/public/images' , 12 , '125abc');
productManager.addProduct('producto 1' , 'descripcion 1' , 12345 , '/public/images' , 45 , '123abc');
productManager.getProductsById(2);
productManager.getProducts();