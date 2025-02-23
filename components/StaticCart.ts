import { ScanMode } from "./camera";
import { Product } from "./Product";

export class StaticCart {
    private static products : Product[] = [];
    private static scanMode : ScanMode = ScanMode.ALWAYS;

    public static scanOff(){
        this.scanMode = ScanMode.NEVER
    }
    public static scanOn(){
        this.scanMode = ScanMode.ALWAYS
    }
    public static getScanMode(){
        return this.scanMode
    }

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