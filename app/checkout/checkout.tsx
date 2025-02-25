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
    options: {
        smartCartSelected: boolean;
        paypalSelected: boolean;
        creditCardSelected: boolean;
        platformMethodSelected: boolean;
    };
    selectedOptionKey: string | undefined;
    canProceed: boolean;
}

export default class Checkout extends Component<CheckoutProperties, CheckoutStates, any> {
    constructor(properties: CheckoutProperties) {
        super(properties);
        this.state = {
            options: {
                smartCartSelected: false,
                paypalSelected: false,
                creditCardSelected: false,
                platformMethodSelected: false
            },
            selectedOptionKey: undefined,
            canProceed: true
        }
    }

    componentDidUpdate(prevProps: Readonly<CheckoutProperties>, prevState: Readonly<CheckoutStates>, snapshot?: any): void {
        this.checkSingleSelect();
        this.updateProceedState();
    }

    private iterateStateObjectEntries = (object: {}, callback: (key: string, value: any) => void): void => {
        for (const [key, value] of Object.entries(object)) callback(key, value);
    }

    private checkSingleSelect = (): void => {
        this.iterateStateObjectEntries(this.state.options, (key: string, selected: any) => {
            if (this.state.selectedOptionKey === undefined && selected) this.setState({selectedOptionKey: key});
            else if (this.state.selectedOptionKey !== key && selected) {
                this.setState({options: {...this.state.options, [this.state.selectedOptionKey as string]: false}});
                this.setState({selectedOptionKey: key});
            }
        });
    }

    private updateProceedState = (): void => {
        // this.iterateStateObjectEntries(this.state.options, (key: string, value: any) => {
        //     if (value) this.setState({canProceed: true});
        // });
        this.setState({canProceed: false});
    }

    private resetOptions = (): void => {
        this.iterateStateObjectEntries(this.state.options, (key: string, value: any) => {
            this.setState({options: {...this.state.options, [key]: false}});
        });
    }

    private proceed = () => {
        // switch (this.state.selectedOptionKey) {
        //     case "":
        //         break;
        //     case "...":
        //         break;
        // }
        console.log("salut")
    }

    private getPlatformPaymentMethodButton = (): ReactElement | null => {
        if (Platform.OS == "android") 
            return <PaymentMethodCard name={"Google Pay"} icons={[faGooglePay]} height={"14%"} value={this.state.options.platformMethodSelected} onValueChanged={(value: boolean) => {this.setState({options: {...this.state.options, platformMethodSelected: value}})}} implemented={false} description={undefined}/>;
        else if (Platform.OS == "ios") 
            return <PaymentMethodCard name={"Apple Pay"} icons={[faApplePay]} height={"14%"} value={this.state.options.platformMethodSelected} onValueChanged={(value: boolean) => {this.setState({options: {...this.state.options, platformMethodSelected: value}})}} implemented={false} description={undefined}/>;
        return null;
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
                    onValueChanged={(value: boolean) => {this.setState({options: {...this.state.options, smartCartSelected: value}})}} 
                    icons={[faCartShopping]} 
                    height="14%" 
                    value={this.state.options.smartCartSelected}/>

                    <PaymentMethodCard 
                    description={undefined} 
                    name={"Paypal"} 
                    implemented={false} 
                    onValueChanged={(value: boolean) => {this.setState({options: {...this.state.options, paypalSelected: value}})}} 
                    icons={[faPaypal]} 
                    height="14%" 
                    value={this.state.options.paypalSelected}/>

                    <PaymentMethodCard
                    description={undefined} 
                    name={"Credit Card or Debit Card"} 
                    implemented={false} 
                    onValueChanged={(value: boolean) => {this.setState({options: {...this.state.options, creditCardSelected: value}})}} 
                    icons={[faCcMastercard, faCcVisa]} height="14%" 
                    value={this.state.options.creditCardSelected}/>

                    {this.getPlatformPaymentMethodButton()}
                </View>

                <CheckoutButtons proceedOnpress={this.proceed} backOnpress={undefined} proceedText={"Continue"} grayedOut={this.state.canProceed}/>
            </View>
        )
    }
}