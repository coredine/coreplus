import { Characteristic } from "react-native-ble-plx";
import BluetoothService from "../../service/BluetoothService";
import { StaticCart } from "../../service/StaticCart";

jest.mock("react-native-ble-plx", ()=> ({
  BleError: jest.fn( () => ({})),
  BleManager: jest.fn( () => ({
    connectToDevice: jest.fn( async () => ({
      id:"12:34:56:78:90:AB", 
      name:"test", 
      discoverAllServicesAndCharacteristics: jest.fn(),
      monitorCharacteristicForService: jest.fn(),
      writeCharacteristicWithResponseForService: jest.fn(),
      cancelConnection: jest.fn( async () => {})
    }) ),
    startDeviceScan: jest.fn(),
    stopDeviceScan: jest.fn()
  }))
}))

const inst = BluetoothService.getInstance();
describe("Test Bluetooth service", () => {
  beforeAll( () => {
    StaticCart.setTrigger(5, (value:number) => (value+1), () =>{})
  })
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
  it("should connect", async () => {
    expect(await inst.connectToDevice("12:34:56:78:90:AB")).toBeUndefined();
    expect(inst.isConnected()).toBeTruthy();
  })
  it("should send and receive sku", async () => {
    await inst.sendSku("123456", "ADD")
    // inst.skuCallback(null, null)
    expect(inst.isConnected()).toBeTruthy();
  })
  it("should send payment info", async () => {
    await inst.sendPaymentInfos("email", "password")
    // inst.skuCallback(null, null)
    expect(inst.isConnected()).toBeTruthy();
  })
  it("should close connection", async () => {
    await inst.closeConnection()
    expect(inst.isConnected()).toBeFalsy();
  })
})