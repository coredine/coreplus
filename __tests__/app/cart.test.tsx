import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import Cart from '../../app/cart';
import { StaticCart } from '../../service/StaticCart';
import { act } from 'react';
import { router } from 'expo-router';

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
  beforeAll( () => {
    StaticCart.setTrigger(5, (value:number) => (value+1), () =>{})

    StaticCart.clearProductList();

    StaticCart.addProduct({title:"Title",price:9.99, sku:"123456",weight:9.99})
  })
  it("should render the component", () => {
    let valueToCheck = "Ready to pay";

    const { getByText } = renderRouter({
    "/cart": MockCartPage
    }, {
    "initialUrl": "/cart"
    });

    StaticCart.scanOff();
    StaticCart.scanOn();
    expect(getByText(valueToCheck)).toBeDefined();
  })

  it("should press the delete button on product", () => {
    let valueToCheck = "Please scan the item to remove it";

    const { getByText, getByTestId } = renderRouter({
    "/cart": MockCartPage
    }, {
    "initialUrl": "/cart"
    });

    act(async () => {
      fireEvent.press(getByTestId("removeProduct"));
    });

    expect(getByText(valueToCheck)).toBeDefined();
  })

  it("should press the checkout button", () => {
    const { getByTestId } = renderRouter({
      "/cart": MockCartPage
    }, {
      "initialUrl": "/cart"
    });

    act(() => {
      fireEvent.press(getByTestId("goToCheckout"));
    });

    expect(router.push).toHaveBeenCalledTimes(1);
  })
  afterAll( () => {
    StaticCart.removeProduct("123456")
  })
})