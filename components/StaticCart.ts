import { ScanMode } from "./camera";
import { Product } from "./Product";

export class StaticCart {
    private static products : Product[] = [];
    private static scanMode : ScanMode = ScanMode.ALWAYS;

    private static trigger : any = {};

    public static setTrigger(newTrigger: any, newSetTrigger: any){
        this.trigger = { newTrigger, newSetTrigger }
    }

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
        this.trigger.newSetTrigger(this.trigger.newTrigger + 1)
        return this.products.push(newProduct)
    }

    public static clearProductList(){
        this.products = []
    }
}