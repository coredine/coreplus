import Storage from "../../service/StorageService";

const storage :any = {}

jest.mock("@react-native-async-storage/async-storage", () =>({
  setItem: jest.fn(async () => {storage.customerAuth = "value";}), 
  getItem: jest.fn(async () => storage?.customerAuth), 
  removeItem: jest.fn(async () => {delete storage["customerAuth"]})
}))

describe("Test Storage service", () => {
  it("should return nothing", async () => {
    expect(await Storage.getAuthToken()).toBeUndefined();
  })
  it("should return something", async () => {
    await Storage.setAuthToken("value");
    expect(await Storage.getAuthToken()).toBe("value");
  })
  it("should remove item", async () => {
    await Storage.reset();
    expect(await Storage.getAuthToken()).toBeUndefined();
  })
})