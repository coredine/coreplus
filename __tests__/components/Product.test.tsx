import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import ProductCard from '../../components/Product';

const MockProduct = jest.fn(() => <ProductCard 
    title='Product' price={9.99} 
    weight={15} sku='123456'
    onPressRemove={() => {}}
  />)

describe("Test cart page", () => {
  it("should render the component", () => {
    let valueToCheck = "Product";

    const { getByText, getByTestId } = renderRouter({
    "/cart": MockProduct
    }, {
    "initialUrl": "/cart"
    });

    act(async () => {
      fireEvent.press(getByTestId("removeProduct"));
    });

    expect(getByText(valueToCheck)).toBeDefined();
  })
})