import { renderRouter, screen } from 'expo-router/testing-library';
import Cart from '../../app/cart';
import { StaticCart } from '../../components/StaticCart';

const MockCartPage = jest.fn(() => <Cart />)

jest.mock("../../service/BluetoothService", () => ({
  getInstance: jest.fn( () => ({
    scanBackground: jest.fn(),
    isConnected: jest.fn( () => true)
  }))
}))

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), replace: jest.fn() }
}));

describe("Test cart page", () => {
  it("should render the component", () => {
    let valueToCheck = "Ready to pay";

    const { getByText } = renderRouter({
    "/cart": MockCartPage
    }, {
    "initialUrl": "/cart"
    });

    StaticCart.scanOff();
    expect(getByText(valueToCheck)).toBeDefined();
  })
})