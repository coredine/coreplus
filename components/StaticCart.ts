import { ScanMode } from "./camera";
import { Product } from "./Product";

export class StaticCart {
    private static products : Product[] = [];
    private static scanMode : ScanMode = ScanMode.ALWAYS;

    private static trigger : any = {};

    private static update() {
        this.trigger.newSetTrigger(this.trigger.newTrigger + 1)
        this.trigger.removeMethod();
    }

    public static setTrigger(newTrigger: any, newSetTrigger: any, removeMethod: any){
        this.trigger = { newTrigger, newSetTrigger, removeMethod }
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

    public static removeProduct(sku: string){
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].sku===sku){ index = i; break; }
        }
        if (index>=0){ this.products.splice(index, 1); }
        this.update();
        return (index>=0);
    }

    public static clearProductList(){
        this.update()
        this.products = []
    }
}