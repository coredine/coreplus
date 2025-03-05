
export enum OrderStatus {
    PENDING = 0,
    ACCEPTED = 1,
    DENIED = 2
}

export interface ReceiptData {
    email: string,
    time: Date
}

export interface OrderResponse {
    status: OrderStatus | null;
    receiptData: ReceiptData | null;
    errorMessage: string | null;
}

export class CheckoutStateObject {

    private static instance: CheckoutStateObject | null = null;
    private orderResponse: OrderResponse = {status: null, receiptData: null, errorMessage: null};

    private constructor() {}

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new CheckoutStateObject();
        }
        return this.instance;
    }

    public setOrderResponse(orderResponse: OrderResponse) {
        this.orderResponse = orderResponse;
    }

    public getStatus() {
        return this.orderResponse.status;
    }

    public getErrorMessage() {
        return this.orderResponse.errorMessage;
    }

    public getReceiptData() {
        return this.orderResponse.receiptData;
    }
}