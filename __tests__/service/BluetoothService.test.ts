import BluetoothService from "../../service/BluetoothService";

jest.mock("react-native-ble-plx", ()=> ({
  BleError: jest.fn( () => ({})),
  BleManager: jest.fn( () => ({
    connectToDevice: jest.fn( async () => ({
      id:"12:34:56:78:90:AB", 
      name:"test", 
      discoverAllServicesAndCharacteristics: jest.fn(),
      monitorCharacteristicForService: jest.fn(),
      writeCharacteristicWithResponseForService: jest.fn()
    }) ),
    startDeviceScan: jest.fn(),
    stopDeviceScan: jest.fn()
  }))
}))

const inst = BluetoothService.getInstance();
describe("Test Bluetooth service", () => {
  it("should exist", () => {
    expect(inst).toBeDefined();
  })
  it("should not be connected", () => {
    expect(inst.isConnected()).toBeFalsy();
  })
  it("should scan", async () => {
    expect(await inst.scanBackground()).toBeUndefined();
  })
  it("should stop scan", async () => {
    expect(await inst.stopScan()).toBeUndefined();
  })
})