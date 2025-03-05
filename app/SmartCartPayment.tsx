import { Component, ReactNode } from "react";
import { ColorValue, Text, TouchableOpacity, View } from "react-native";
import Storage from "../service/StorageService";
import { router } from "expo-router";
import { OrderData } from "../components/OrderData";
import { StaticCart } from "../components/StaticCart";
import { FormInput } from "../components/formInput";
import { faEnvelope, faL, faLock } from "@fortawesome/free-solid-svg-icons";
import { CheckoutButtons } from "../components/checkoutButtons";
import BluetoothService from "../service/BluetoothService";
import { OrderResponse, OrderStatus } from "../components/OrderResponse";


export interface SmartCartPaymentStates {
    orderData: OrderData;
    bluetoohService: BluetoothService | undefined;
}

export default class SmartCartPayment extends Component<any, SmartCartPaymentStates, any> {
    constructor(properties: any) {
        super(properties);
        this.state = {
            orderData: {email: "", password: ""},
            bluetoohService: undefined
        }
    }

    private bgc: ColorValue = "#818894";

    /**
     * 
     */
    private pay = async () => {
        let response: OrderResponse;
        try {
            
        } catch (error: unknown) {
            console.log(error);
        }
    }

    render(): ReactNode {
        return(
            <View>
                {/* <View className="h-[95%] w-[95%] m-auto rounded-2xl" style={{backgroundColor: this.bgc}}>
                    <FormInput label="Password" onChangeText={(value: string) => {}} icon={faLock} inputValue={this.state.orderData.password} hidden={true} backgroundColor={this.bgc}/>
                </View> */}
                {/* <FormInput label="Email" onChangeText={(value: string) => {}} icon={faEnvelope} inputValue={this.state.orderData.email} backgroundColor={this.bgc}/> */}
                {/* <CheckoutButtons backOnPress={undefined} proceedOnPress={this.pay} grayedOut={false} proceedText={"Pay"} backgroundColor={this.bgc}/> */}
            </View>
        )
    }
}