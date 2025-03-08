import { renderRouter, screen } from 'expo-router/testing-library';
import SmartCartPayment from '../../app/SmartCartPayment';

const MockSmartCartPayment = jest.fn(() => <SmartCartPayment/>);

jest.mock("../../service/BluetoothService", () => ({
  getInstance: jest.fn( () => ({
    sendAppState: jest.fn( async () => {}),
    scanBackground: jest.fn(),
    isConnected: jest.fn( () => true)
  })),
  AppState: {
    IDLE : 0,
    SCANNING : 1,
    CHECKOUT : 2,
    END : 3
  }
}))

jest.mock("expo-font", () => ({
  isLoaded: jest.fn(),
  loadAsync: jest.fn()
}))

describe("Test payment page", () => {
  it("should render the component", () => {
    const { getByText } = renderRouter({
      "/SmartCartPayment": MockSmartCartPayment
    }, {
      "initialUrl": "/SmartCartPayment"
    });
    
    expect(getByText("Email")).toBeDefined();
    expect(getByText("Password")).toBeDefined();
  })
})