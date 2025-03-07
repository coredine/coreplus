import { renderRouter, screen } from 'expo-router/testing-library';
import Home from '../../app/home';

const MockHomePage = jest.fn(() => <Home />)

describe("Test home page", () => {
  it("should render the component", () => {
    let valueToCheck = "Scan QR Code to connect";

    const { getByText } = renderRouter({
      "/home": MockHomePage
    }, {
      "initialUrl": "/home"
    });
    expect(getByText(valueToCheck)).toBeDefined();
  })
})