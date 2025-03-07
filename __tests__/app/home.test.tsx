import { renderRouter, screen } from 'expo-router/testing-library';
import Home from '../../app/home';

const MockHomePage = jest.fn(() => <Home />)

jest.mock("../../service/BluetoothService", () => ({
  getInstance: jest.fn( () => ({scanBackground: jest.fn()})),
  scanBackground: jest.fn()
}))

describe("Test home page", () => {
  it("should render the component", () => {
    let valueToCheck = "Scan QR code to connect to a SmartCart.";

    const { getByText } = renderRouter({
      "/home": MockHomePage
    }, {
      "initialUrl": "/home"
    });
    expect(getByText(valueToCheck)).toBeDefined();
  })
})