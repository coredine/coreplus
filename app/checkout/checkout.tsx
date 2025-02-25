import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, ReactNode } from "react";
import { View, Text } from "react-native";

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

    private sendOrder = async () => {
        //send to mocrocontroller/server
    }

    render(): ReactNode {
        return(
            <View className="w-100 h-100">
                <View className="bg-blue-500 h-[8%]">
                    <Text className="m-auto font-extrabold text-4xl">Payment</Text>
                </View>

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