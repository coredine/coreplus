import { useEffect, useRef, useState } from "react";
import { ColorValue, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { OrderData } from "../components/OrderData";
import { SimpleFormInput } from "../components/formInput";
import BluetoothService, { AppState } from "../service/BluetoothService";
import { CheckoutStateObject, OrderResponse, OrderStatus, ReceiptData } from "../components/OrderResponse";
import CheckoutButtons from "../components/checkoutButtons";

export default function SmartCartPayment() {

    const instance = useRef(BluetoothService.getInstance());
    const checkoutStateObject = useRef(CheckoutStateObject.getInstance());
    const bgc: ColorValue = "#dce4f2";

    const [orderData, setOrderData] = useState<OrderData>({email: "", password: ""});
    const [refresh, setRefresh] = useState(false);
    const [checkoutCompleted, setCheckoutCompleted] = useState(false);
    //to trigger rerenders with publisher
    const [componentOrderResponse, setComponentOrderResponse] = useState<OrderResponse>({
        receiptData: null,
        status: null,
        errorMessage: null
    });


    const setCallbacks = () => {
        checkoutStateObject.current.setReRenderCallback(() => {
            console.log("trigger....");
            setRefresh(!refresh);
        });
        checkoutStateObject.current.setErrorMessageCallback((value: string | null) => setComponentOrderResponse((prevState) => {return {...prevState, errorMessage: value}}));
        checkoutStateObject.current.setReceiptDataCallback((value: ReceiptData | null) => setComponentOrderResponse((prevState) => {return {...prevState, receiptData: value}}));
        checkoutStateObject.current.setStatusCallback(async (value: OrderStatus | null) => {
            await checkCompletion(value);
            setComponentOrderResponse((prevState) => {return {...prevState, status: value}})
        });
    }

    useEffect(() => {
        if (!instance.current.isConnected()) router.replace("/home");

        const toCheckoutState = async () => {
            await instance.current.sendAppState(AppState.CHECKOUT);
            setCallbacks();
        }; toCheckoutState();
    }, []);

    useEffect(() => {

    }, [refresh, componentOrderResponse]);

    const toHome = () => {
        router.replace("/home");
    }

    const checkCompletion = async (value: OrderStatus | null) => {
        if (value?.toString() == "ACCEPTED") {
            await instance.current.sendAppState(AppState.END);
            setCheckoutCompleted(true);
            await instance.current.closeConnection();
        } else {
            console.log(componentOrderResponse.status?.toString())
            console.log(OrderStatus.ACCEPTED.toString())
        }
    }

    const pay = async () => {
        try {
            await instance.current.sendPaymentInfos(orderData.email, orderData.password);
            setRefresh(!refresh);
        } catch (error: unknown) {
            console.log(error);
        } 
    }

    return(
        <View>
            <View className="h-[90vh] w-[95%] m-auto rounded-2xl" style={{backgroundColor: bgc}}>
                {!checkoutCompleted ? 
                    <View>
                        <SimpleFormInput backgroundColor={bgc} hidden={false} onChangeText={(text: string) => setOrderData({...orderData, email: text})} value={orderData.email} label="Email"/>
                        <SimpleFormInput backgroundColor={bgc} hidden={true} onChangeText={(text: string) => setOrderData({...orderData, password: text})} value={orderData.password} label="Password"/>
                        <CheckoutButtons proceedOnPress={pay} proceedText={"Pay"}backgroundColor={bgc} iconSize={25}/>
                        <View className="mt-[2vh]">
                            {componentOrderResponse ? <Text className="m-auto text-red-600 text-2xl font-bold">{componentOrderResponse.errorMessage}</Text> : null}
                        </View> 
                    </View>
                    : 
                    <View className="h-[90vh] w-[95%] m-auto rounded-2xl" style={{backgroundColor: bgc}}>
                        <View className="w-[90%] h-[33%] m-2">
                            <Text className="m-auto text-purple-600 text-3xl font-extrabold">{componentOrderResponse.receiptData?.email}</Text>
                            <Text className="m-auto text-purple-600 text-3xl font-extrabold">{componentOrderResponse.receiptData?.time.toString()}</Text>
                        </View>
                        <View className="w-[90%] h-[33%] m-2" style={{backgroundColor: bgc}}>
                            <Text className="m-auto text-purple-600 text-3xl font-extrabold">THANKS FOR YOUR PAYMENT</Text>
                        </View>
                        <View className="w-[90%] h-[33%] m-2" style={{backgroundColor: bgc}}>
                            <TouchableOpacity onPress={toHome} className="w-[50%] bg-blue-700 rounded-2xl h-[5vh] m-auto">
                                <Text className="text-white m-auto text-2xl font-semibold">Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}