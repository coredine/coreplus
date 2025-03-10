import { CheckoutStateObject, OrderStatus } from "../../components/OrderResponse";

const checkoutState = CheckoutStateObject.getInstance()
describe("Test Order Response", () => {
  beforeAll( () =>{
    checkoutState.setStatusCallback( () => {})
    checkoutState.setReRenderCallback( () => {})
    checkoutState.setReceiptDataCallback( () => {})
    checkoutState.setErrorMessageCallback( () => {})
    checkoutState.setOrderResponse({status: OrderStatus.PENDING, receiptData: {email:"email", time: new Date()}, errorMessage: null})
  })
  it("should render the component", () => {
    checkoutState.updateStatus(OrderStatus.PENDING)
    expect(checkoutState.getStatus()).toBe(OrderStatus.PENDING);
  })
  it("should get empty error message", () => {
    checkoutState.updateErrorMessage(null)
    expect(checkoutState.getErrorMessage()).toBeNull();
  })
  it("should get empty error message", () => {
    checkoutState.updateReceiptData({email:"email", time: new Date()})
    expect(checkoutState.getReceiptData()?.email).toBe("email");
  })
})