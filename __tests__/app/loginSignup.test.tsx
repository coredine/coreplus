import { renderRouter, screen } from 'expo-router/testing-library';
import LoginSignup, { PageState } from '../../app/loginSignup';

const MockLoginPage = jest.fn(() => <LoginSignup initialPageState={PageState.LOGIN}/>);
const MockSignupPage = jest.fn(() => <LoginSignup initialPageState={PageState.SIGNUP}/>);

describe("Test Login page", () => {
  it("should render the component", () => {
    const { getByText } = renderRouter({
      "/loginSignup": MockLoginPage
    }, {
      "initialUrl": "/loginSignup"
    });
    
    expect(getByText("Login")).toBeDefined();
  })
})

describe("Test Signup page", () => {
  it("should render the component", () => {
    const { getByText } = renderRouter({
      "/loginSignup": MockSignupPage
    }, {
      "initialUrl": "/loginSignup"
    });
    
    expect(getByText("Signup")).toBeDefined();
  })
})