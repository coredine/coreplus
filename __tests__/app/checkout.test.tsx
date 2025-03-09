import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import Checkout from '../../app/checkout';
import { act } from 'react';

const MockCheckoutPage = jest.fn(() => <Checkout key={1} ref={undefined} />);

jest.mock("../../service/BluetoothService", () => ({
  getInstance: jest.fn( () => ({
    scanBackground: jest.fn(),
    isConnected: jest.fn( () => true)
  }))
}))

jest.mock("expo-font", () => ({
  isLoaded: jest.fn(),
  loadAsync: jest.fn()
}))

describe("Test Checkout page", () => {
  it("should render the component", () => {
    let valueToCheck = "Payment Method";

    const { getByText } = renderRouter({
      "/checkout": MockCheckoutPage
    }, {
      "initialUrl": "/checkout"
    });
    expect(getByText(valueToCheck)).toBeDefined();
  })
  it("should select payment methods and continue", () => {
    const { getByText, getByTestId } = renderRouter({
      "/checkout": MockCheckoutPage
    }, {
      "initialUrl": "/checkout"
    });

    act(async () => {
      fireEvent.press(getByTestId("Paypal"));
      fireEvent.press(getByTestId("Credit Card or Debit Card"));
      fireEvent.press(getByTestId("Apple Pay"));
      fireEvent.press(getByTestId("SmartCart"));
      fireEvent.press(getByTestId("checkoutContinue"));
    });

    expect(getByText("Continue")).toBeDefined();
  })
})