import { Component, ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Storage from "../../service/StorageService";
import { router } from "expo-router";
import { OrderData } from "../../components/OrderData";
import { StaticCart } from "../../components/StaticCart";

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

    private checkAuth = async () => {
        try {
            let tk: string | null = await Storage.getAuthToken();
            if (!tk) {
                //router.push("/loginSignup");
            } else {
                //call checktoken and get email/currentBalance
            }
        } catch (error: unknown) {
            console.log(error);
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

    componentDidMount(): void {
        this.checkAuth();
    }

    render(): ReactNode {
        return(
            <View>
                <View className="bg-gray-300 h-[95%] w-[95%] m-auto rounded-2xl">
                    
                </View>
            </View>
        )
    }
}