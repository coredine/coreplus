import { Component, ReactElement, ReactNode } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { PaymentMethodCard } from "../../components/paymentMethodCard";
import { faPaypal, faCcMastercard, faCcVisa, faGooglePay, faApplePay } from "@fortawesome/free-brands-svg-icons";
import { CheckoutButtons } from "../../components/checkoutButtons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export interface CheckoutProperties {
    //product array 
}

export interface CheckoutStates {
    smartCartSelected: boolean;
    paypalSelected: boolean;
    creditCardSelected: boolean;
    platformMethodSelected: boolean;
}

export default class Checkout extends Component<CheckoutProperties, CheckoutStates, any> {
    constructor(properties: CheckoutProperties) {
        super(properties);
        this.state = {
            smartCartSelected: false,
            paypalSelected: false,
            creditCardSelected: false,
            platformMethodSelected: false
        }
    }

    componentDidUpdate(prevProps: Readonly<CheckoutProperties>, prevState: Readonly<CheckoutStates>, snapshot?: any): void {
        console.log("AAAHHHHH");
    }

    private getPlatformPaymentMethodButton = (): ReactElement | null => {
        if (Platform.OS == "android") 
            return <PaymentMethodCard name={"Google Pay"} icons={[faGooglePay]} height={"14%"} value={this.state.platformMethodSelected} onValueChanged={(value: boolean) => {this.setState({platformMethodSelected: value})}} implemented={false} description={undefined}/>;
        else if (Platform.OS == "ios") 
            return <PaymentMethodCard name={"Apple Pay"} icons={[faApplePay]} height={"14%"} value={this.state.platformMethodSelected} onValueChanged={(value: boolean) => {this.setState({platformMethodSelected: value})}} implemented={false} description={undefined}/>;
        return null;
    }

    private proceed = () => {
        console.log("oui");
    }

    render(): ReactNode {
        return(
            <View className="w-100 h-100">
                <View className="bg-blue-500 h-[8%]">
                    <Text className="m-auto font-extrabold text-4xl">Payment Method</Text>
                </View>

                <View className="h-[77%]">
                    <PaymentMethodCard 
                    description={"SmartCart custom paying service."} 
                    name={"SmartCart"} implemented={true} 
                    onValueChanged={(value: boolean) => {this.setState({smartCartSelected: value})}} 
                    icons={[faCartShopping]} 
                    height="14%" 
                    value={this.state.smartCartSelected}/>
                    <PaymentMethodCard description={undefined} name={"Paypal"} implemented={false} onValueChanged={(value: boolean) => {this.setState({paypalSelected: value})}} icons={[faPaypal]} height="14%" value={this.state.paypalSelected}/>
                    <PaymentMethodCard description={undefined} name={"Credit Card or Debit Card"} implemented={false} onValueChanged={(value: boolean) => {this.setState({creditCardSelected: value})}} icons={[faCcMastercard, faCcVisa]} height="14%" value={this.state.creditCardSelected}/>
                    {this.getPlatformPaymentMethodButton()}
                </View>

                <CheckoutButtons proceedOnpress={this.proceed} backOnpress={undefined} proceedText={"Continue"} grayedOut={true}/>
            </View>
        )
    }
}