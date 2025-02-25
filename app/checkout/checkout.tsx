import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PaymentMethodCard } from "../../components/paymentMethodCard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CheckoutButtons } from "../../components/checkoutButtons";

export interface CheckoutProperties {
    //product array 
}

export interface CheckoutStates {
    canPay: boolean;
}

export default class Checkout extends Component<CheckoutProperties, CheckoutStates, any> {
    constructor(properties: CheckoutProperties) {
        super(properties);
        this.state = {
            canPay: false
        }
    }

    render(): ReactNode {
        return(
            <View className="w-100 h-100">
                <View className="bg-blue-500 h-[8%]">
                    <Text className="m-auto font-extrabold text-4xl">Payment</Text>
                </View>

                <View className="h-[77%]">
                    {/* PAYMENT METHODS */}
                    {/* OPEN MODAL */}
                </View>

                <CheckoutButtons proceedOnpress={undefined} backOnpress={undefined} proceedText={"Continue"}/>
            </View>
        )
    }
}