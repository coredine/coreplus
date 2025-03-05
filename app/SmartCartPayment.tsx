import { Component, ReactNode, useEffect, useRef, useState } from "react";
import { ColorValue, Text, TextInput, TouchableOpacity, View } from "react-native";
import Storage from "../service/StorageService";
import { router } from "expo-router";
import { OrderData } from "../components/OrderData";
import { StaticCart } from "../components/StaticCart";
import { FormInput, SimpleFormInput } from "../components/formInput";
import { faEnvelope, faL, faLock } from "@fortawesome/free-solid-svg-icons";
import { CheckoutButtons } from "../components/checkoutButtons";
import BluetoothService, { AppState } from "../service/BluetoothService";
import { CheckoutStateObject, OrderResponse, OrderStatus } from "../components/OrderResponse";

export default function SmartCartPayment() {
    const [orderData, setOrderData] = useState({email: "", password: ""});
    const instance = useRef(BluetoothService.getInstance());
    const checkoutStateObject = useRef(CheckoutStateObject.getInstance());

    const bgc: ColorValue = "#dce4f2";

    useEffect(() => {
        const toCheckoutState = async () => {
            await instance.current.sendAppState(AppState.CHECKOUT);
        }
        toCheckoutState();
    }, []);

    const pay = async () => {
        try {
            await instance.current.sendPaymentInfos(orderData.email, orderData.password);
            console.log(checkoutStateObject.current.getStatus());
        } catch (error: unknown) {
            console.log(error);
        }
    }

    return(
        <View>
            <View className="h-[95%] w-[95%] m-auto rounded-2xl" style={{backgroundColor: bgc}}>
                <SimpleFormInput backgroundColor={bgc} hidden={false} onChangeText={(text: string) => setOrderData({...orderData, email: text})} value={orderData.email} label="Email"/>
                <SimpleFormInput backgroundColor={bgc} hidden={true} onChangeText={(text: string) => setOrderData({...orderData, password: text})} value={orderData.password} label="Password"/>
                <View className="mt-[10vh] h-auto">
                    <TouchableOpacity onPress={pay} className="w-[80%] bg-blue-700 rounded-2xl h-[5vh] m-auto">
                        <Text className="text-white m-auto text-2xl font-semibold">Pay</Text>
                    </TouchableOpacity>
                </View>
                <View className="mt-[2vh]">
                    {checkoutStateObject.current.getErrorMessage() ? <Text className="m-auto text-red-600 text-2xl font-bold">{checkoutStateObject.current.getErrorMessage()}</Text> : null}
                </View>
            </View>
        </View>
    )
}