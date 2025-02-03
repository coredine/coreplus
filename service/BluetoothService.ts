import { BleManager, Device } from "react-native-ble-plx";

export default class BluetoothService {
    private device?: Device;
    private bleManager = new BleManager();
    private static instance?: BluetoothService;

    private constructor() {}

    public static getInstance() {
        if(!this.instance) {
            this.instance = new BluetoothService();
        }

        return this.instance;
    }

    async connectToDevice(id: string) {
        this.bleManager.enable()
        this.device = await this.bleManager
            .connectToDevice(id)
            .then(device => device.discoverAllServicesAndCharacteristics());
    }

    async closeConnection() {
        if (!this.device) return;
        await this.device.cancelConnection();
        this.device = undefined;
    }
}