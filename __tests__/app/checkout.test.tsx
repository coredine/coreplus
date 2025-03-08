import { renderRouter, screen } from 'expo-router/testing-library';
import Checkout from '../../app/checkout';

jest.mock("../../service/BluetoothService", () => ({
  getInstance: jest.fn( () => ({
    scanBackground: jest.fn(),
    isConnected: jest.fn( () => false)
  }))
}))

jest.mock("expo-font", () => ({
  isLoaded: jest.fn(),
  loadAsync: jest.fn()
}))

describe("Test home page", () => {
  it("should render the component", () => {
    const MockCheckoutPage = jest.fn(() => <Checkout key={1} ref={undefined} />);
    let valueToCheck = "Payment Method";

    const { getByText } = renderRouter({
      "/checkout": MockCheckoutPage
    }, {
      "initialUrl": "/checkout"
    });
    expect(getByText(valueToCheck)).toBeDefined();
  })
})