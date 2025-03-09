import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import SmartCartPayment from '../../app/SmartCartPayment';
import { act } from 'react';
import { router } from 'expo-router';
import BluetoothService from '../../service/BluetoothService';

const MockSmartCartPayment = jest.fn(() => <SmartCartPayment/>);

jest.mock("../../service/BluetoothService", () => ({
  getInstance: jest.fn( () => ({
    sendAppState: jest.fn( async () => {}),
    scanBackground: jest.fn(),
    isConnected: jest.fn( () => true),
    sendPaymentInfos: jest.fn( async () => {})
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

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), replace: jest.fn() }
}));

describe("Test payment page", () => {
  it("should render the component", () => {
    const { getByText } = renderRouter({
      "/SmartCartPayment": MockSmartCartPayment
    }, {
      "initialUrl": "/SmartCartPayment"
    });
    
    expect(getByText("Card Number")).toBeDefined();
    expect(getByText("Password")).toBeDefined();
  })
  
  it("should edit email and password", () => {
    const { getByTestId } = renderRouter({
      "/SmartCartPayment": MockSmartCartPayment
    }, {
      "initialUrl": "/SmartCartPayment"
    });

    act(async () => {
      fireEvent.changeText(getByTestId("inputCard Number"), "1234 1234 1234 1234");
      fireEvent.changeText(getByTestId("inputPassword"), "password");
      fireEvent.press(getByTestId("checkoutContinue"));
    });

    expect(getByTestId("inputCard Number")).toBeDefined();
    expect(getByTestId("inputPassword")).toBeDefined();
  })
})