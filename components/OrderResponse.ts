
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
    status: OrderStatus;
    receiptData: ReceiptData | null;
    errorMessage: string | null;
}