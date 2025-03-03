import { BleError, BleManager, Characteristic, Device } from "react-native-ble-plx";

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

    public isConnected(): boolean {
        return this.device != null;
    }

    async scanDevices(deviceFoundListener: (id?: string, name?: string) => void) {
        this.bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
            deviceFoundListener(scannedDevice?.id, scannedDevice?.name!);
        });
    }

    async stopScan() {
        return this.bleManager.stopDeviceScan();
    }

    async connectToDevice(id: string) {
        this.device = await this.bleManager
            .connectToDevice(id, { timeout: 5000 })
            .then(device => device.discoverAllServicesAndCharacteristics());

        this.device?.monitorCharacteristicForService(CART_SERVICE, CH_JSON_ITEM, this.skuCallback);
    }

    async closeConnection() {
        if (!this.device) return;
        await this.device.cancelConnection();
        this.device = undefined;
    }

    public async sendSku(sku: string) {
        await this.device?.writeCharacteristicWithResponseForService(CART_SERVICE, CH_SKU, btoa(sku));
    }

    /**
     * The function that will be called after the phone send the SKU to the cart. 
     * After the SKU is send, the characteristic of this callback should contains 
     * the item that has this SKU.
     */
    public async skuCallback(error: BleError | null, characteristic: Characteristic | null) {
        console.log("READING...");
        let product = JSON.parse(atob((await characteristic?.read())?.value!));
        console.log(product);
    }
}