import { BleError, BleManager, Characteristic, Device, UUID } from "react-native-ble-plx";
import { Product } from "../components/Product";
import { StaticCart } from "../components/StaticCart";
import { router } from "expo-router";

const CART_SERVICE = "1cf9e025-5cee-4558-a754-731e27e028ff";

const CH_JSON_ITEM = "20507320-c712-43ed-a240-05d80fd066fd";
const CH_SKU = "c4fa2ae9-d7f4-42ac-8042-afde6dc23568";
const CH_APP_STATE = "a4ee0286-6010-46b6-8d21-602f1ee38d71";
const CH_ORDER = "d923866a-17d1-4dee-829d-426e6b57e2b3";
const CH_PAYEMENT_INFOS = "0d3401a6-2d29-427d-9a0d-87dd46b302a4";

export default class BluetoothService {
    private device?: Device;
    private bleManager = new BleManager();
    private static instance?: BluetoothService;

    private constructor() { }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new BluetoothService();
        }

        return this.instance;
    }

    async scanBackground() {
        return this.bleManager.startDeviceScan(null, { allowDuplicates: false }, () => { });
    }

    async stopScan() {
        return this.bleManager.stopDeviceScan();
    }

    async connectToDevice(id: string) {
        try {
            if(this.device) return;
            console.log(`Trying to connect to ${id}`)

            this.device = await this.bleManager.connectToDevice(id, { timeout: 5000 });
            await this.device?.discoverAllServicesAndCharacteristics();
            this.device?.monitorCharacteristicForService(CART_SERVICE, CH_JSON_ITEM, this.skuCallback);
            
            await this.stopScan();
            console.log("Connection successful!");
            router.replace("/cart")
        } catch(error) {
            if(error instanceof BleError) {
                console.log(error);

                if(error.message == "Operation was cancelled") {
                    alert("Enable to find the SmartCart in a 5 sec delay.");
                }
            }
        }
    }

    async closeConnection() {
        if (!this.device) return;
        await this.device.cancelConnection();
        this.device = undefined;
    }

    public async sendSku(sku: string, action: "ADD" | "DEL") {
        StaticCart.scanOff();
        await this.device?.writeCharacteristicWithResponseForService(CART_SERVICE, CH_SKU, btoa(JSON.stringify({ sku, action })));
    }

    /**
     * The function that will be called after the phone send the SKU to the cart. 
     * After the SKU is send, the characteristic of this callback should contains 
     * the item that has this SKU.
     */
    public async skuCallback(error: BleError | null, characteristic: Characteristic | null) {
        console.log("READING...");
        let product: Product | number = JSON.parse(atob((await characteristic?.read())?.value!));
        console.log(product);

        if (typeof product !== "number") {
            if (product.action) {
                StaticCart.removeProduct(product.sku);
            } else {
                StaticCart.addProduct(product);
            }

        }
        StaticCart.scanOn()
    }
}