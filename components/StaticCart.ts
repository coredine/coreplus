import { Product } from "./Product";

export class StaticCart {
    private static product : Product[] = [];
    
    public static productList() : Product[]{
        return this.product;
    }

    public static addProduct(newProduct : Product){
        return this.product.push(newProduct)
    }

    public static clearProductList(){
        this.product = []
    }
}