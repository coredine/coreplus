import BluetoothService from "../../service/BluetoothService";

jest.mock("react-native-ble-plx", ()=> ({
  BleError: jest.fn( () => ({})),
  BleManager: jest.fn( () => ({}))
}))

describe("Test Bluetooth service", () => {
  it("should email be truthy", () => {
    let inst = BluetoothService.getInstance();
    expect(inst).toBeDefined();
  })
})