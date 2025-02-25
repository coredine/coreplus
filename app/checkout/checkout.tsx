import { Component, ReactNode } from "react";
import { View } from "react-native";

export interface CheckoutProperties {
    //product array 
}

export interface CreditCardData {
    cardNumber: string | undefined;
    cardHolder: string | undefined;
    expirationDate: Date | undefined;
    verificationValue: string | undefined;
}

export interface CheckoutStates {
    creditCardData: CreditCardData;
    canPay: boolean;
}

export default class Checkout extends Component<CheckoutProperties, CheckoutStates, any> {
    constructor(properties: CheckoutProperties) {
        super(properties);
        this.state = {
            creditCardData: {
                cardNumber: undefined,
                cardHolder: undefined,
                expirationDate: undefined,
                verificationValue: undefined
            },
            canPay: false
        }
    }

    private sendOrder = async () => {
        //send to mocrocontroller/server
    }

    render(): ReactNode {
        return(
            <View>
                <View>
                    {/* PAYMENT METHODS */}
                    {/* OPEN MODAL */}
                </View>

                <View>
                    {/* GOBACK */}
                    {/* SENDDATA */}
                </View>
            </View>
        )
    }
}