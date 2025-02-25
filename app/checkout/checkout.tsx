import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PaymentMethodCard } from "../../components/paymentMethodCard";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { CheckoutButtons } from "../../components/checkoutButtons";

export interface CheckoutProperties {
    //product array 
}

export interface CheckoutStates {
    smartCartSelected: boolean;
    paypalSelected: boolean;
    creditCardSelected: boolean;
}

export default class Checkout extends Component<CheckoutProperties, CheckoutStates, any> {
    constructor(properties: CheckoutProperties) {
        super(properties);
        this.state = {
            smartCartSelected: false,
            paypalSelected: false,
            creditCardSelected: false
        }
    }

    render(): ReactNode {
        return(
            <View className="w-100 h-100">
                <View className="bg-blue-500 h-[8%]">
                    <Text className="m-auto font-extrabold text-4xl">Payment Method</Text>
                </View>

                <View className="h-[77%]">
                    <PaymentMethodCard lined={true} description={"SmartCart......"} name={"SmartCart"} implemented={true} onValueChanged={(value: boolean) => {this.setState({smartCartSelected: value})}} icons={undefined} height="14%" value={this.state.smartCartSelected}/>
                    <PaymentMethodCard lined={true} description={"Paypal......"} name={"Paypal"} implemented={false} onValueChanged={(value: boolean) => {this.setState({paypalSelected: value})}} icons={undefined} height="14%" value={this.state.paypalSelected}/>
                    <PaymentMethodCard lined={true} description={"Credit Card or Debit Card....."} name={"Credit Card or Debit Card"} implemented={false} onValueChanged={(value: boolean) => {this.setState({creditCardSelected: value})}} icons={undefined} height="14%" value={this.state.creditCardSelected}/>
                </View>

                <CheckoutButtons proceedOnpress={undefined} backOnpress={undefined} proceedText={"Continue"}/>
            </View>
        )
    }
}