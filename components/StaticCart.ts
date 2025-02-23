import { Product } from "./Product";

export class StaticCart {
    private static products : Product[] = [];
    
    public static productList() : Product[]{
        return this.products;
    }

    public static addProduct(newProduct : Product){
        return this.products.push(newProduct)
    }

    public static clearProductList(){
        this.products = []
    }
}