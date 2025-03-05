
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
    private processing: boolean = false;
    private reRenderCallback: (() => void) | undefined;
    private statusUpdateCallback: ((status: OrderStatus) => void) | undefined;


    private constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new CheckoutStateObject();
        }
        return this.instance;
    }

    public setOrderResponse(orderResponse: OrderResponse) {
        this.orderResponse = orderResponse;
        this.triggerReRenderCallback();
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

    public setReRenderCallback(cb: () => void) {
        this.reRenderCallback = cb;
    }

    public triggerReRenderCallback() {
        if (this.reRenderCallback) this.reRenderCallback();
    }

    public updateStatus(status: OrderStatus) {
        if (this.statusUpdateCallback) this.statusUpdateCallback(status);
    }
}