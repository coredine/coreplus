import { Component, ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Storage from "../../service/StorageService";
import { router } from "expo-router";
import { OrderData } from "../../components/OrderData";
import { StaticCart } from "../../components/StaticCart";
import { FormInput } from "../../components/formInput";
import { faEnvelope, faL, faLock } from "@fortawesome/free-solid-svg-icons";
import { CheckoutButtons } from "../../components/checkoutButtons";

export interface SmartCartPaymentStates {
    wasSuccessful: boolean | undefined;
    orderData: OrderData;
}

export default class SmartCartPayment extends Component<any, SmartCartPaymentStates, any> {
    constructor(properties: any) {
        super(properties);
        this.state = {
            wasSuccessful: undefined,
            orderData: {email: "", password: ""}
        }
    }

    /**
     * 
     */
    private pay = async () => {
        try {

        } catch (error: unknown) {
            console.log(error);
        }
    }

    render(): ReactNode {
        return(
            <View>
                <View className="bg-gray-300 h-[95%] w-[95%] m-auto rounded-2xl">
                    <FormInput label="Email" onChangeText={(value: string) => {}} icon={faEnvelope} inputValue={this.state.orderData.email}/>
                    <FormInput label="Password" onChangeText={(value: string) => {}} icon={faLock} inputValue={this.state.orderData.password} hidden={true}/>
                    <CheckoutButtons backOnPress={undefined} proceedOnPress={this.pay} grayedOut={false} proceedText={"Pay"}/>
                </View>
            </View>
        )
    }
}