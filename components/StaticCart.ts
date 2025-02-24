import { ScanMode } from "./camera";
import { Product } from "./Product";

export class StaticCart {
    private static products : Product[] = [];
    private static scanMode : ScanMode = ScanMode.ALWAYS;

    private static trigger : any = {};

    private static update() {
        this.trigger.newSetTrigger(this.trigger.newTrigger + 1)
    }

    public static setTrigger(newTrigger: any, newSetTrigger: any){
        this.trigger = { newTrigger, newSetTrigger }
    }

    public static scanOff(){
        this.update()
        this.scanMode = ScanMode.NEVER
    }
    public static scanOn(){
        this.update()
        this.scanMode = ScanMode.ALWAYS
    }
    public static getScanMode(){
        return this.scanMode
    }

    public static productList() : Product[]{
        return this.products;
    }

    public static addProduct(newProduct : Product){
        this.update()
        return this.products.push(newProduct)
    }

    public static clearProductList(){
        this.update()
        this.products = []
    }
}