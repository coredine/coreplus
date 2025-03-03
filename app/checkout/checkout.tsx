import { Component, ReactElement, ReactNode } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { PaymentMethodCard } from "../../components/paymentMethodCard";
import { faPaypal, faCcMastercard, faCcVisa, faGooglePay, faApplePay } from "@fortawesome/free-brands-svg-icons";
import { CheckoutButtons } from "../../components/checkoutButtons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { PageTitle } from "../../components/pageTitle";
import { router } from "expo-router";

export interface CheckoutProperties {
    //product array 
    //cart
}

export interface CheckoutStates {
    options: {
        smartCartSelected: boolean;
        paypalSelected: boolean;
        creditCardSelected: boolean;
        platformMethodSelected: boolean;
    };
    selectedOptionKey: string | undefined;
    cannotProceed: boolean;
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
            cannotProceed: true
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
        let nothingSelected: boolean = true;
        this.iterateStateObjectEntries(this.state.options, (key: string, value: any) => {
            if (value && this.state.cannotProceed === true) {
                this.setState({cannotProceed: false});
                nothingSelected = false;
            } else if (value) nothingSelected = false;
        });
        if (nothingSelected === true && this.state.cannotProceed === false) this.setState({cannotProceed: true});
    }

    private _setState = (value: boolean, selectName: string) => {
        this.setState({options: {...this.state.options, [selectName]: value}});
    }

    private resetOptions = (): void => {
        this.iterateStateObjectEntries(this.state.options, (key: string, value: any) => {
            this.setState({options: {...this.state.options, [key]: false}});
        });
    }

    private proceed = () => {
        switch (this.state.selectedOptionKey) {
            case "smartCartSelected":
                router.navigate("checkout/SmartCartPayment");
                break;
            default:
                console.log("not yet implemented");
                break;
        }
    }

    private getPlatformPaymentMethodButton = (): ReactElement | null => {
        if (Platform.OS == "android") 
            return <PaymentMethodCard name={"Google Pay"} icons={[faGooglePay]} value={this.state.options.platformMethodSelected} onValueChanged={(value: boolean) => {this._setState(value, "platformMethodSelected")}}/>;
        else if (Platform.OS == "ios") 
            return <PaymentMethodCard name={"Apple Pay"} icons={[faApplePay]} value={this.state.options.platformMethodSelected} onValueChanged={(value: boolean) => {this._setState(value, "platformMethodSelected")}}/>;
        return null;
    }


    render(): ReactNode {
        return(
            <View className="w-100 h-100">
                <PageTitle title="Payment Method"/>

                <View className="h-[77%]">
                    <PaymentMethodCard 
                    description={"SmartCart custom paying service."} 
                    name={"SmartCart"}
                    onValueChanged={(value: boolean) => {this.setState({options: {...this.state.options, smartCartSelected: value}})}} 
                    icons={[faCartShopping]} 
                    height="20%" 
                    value={this.state.options.smartCartSelected}/>

                    <PaymentMethodCard 
                    name={"Paypal"} 
                    onValueChanged={(value: boolean) => {this.setState({options: {...this.state.options, paypalSelected: value}})}} 
                    icons={[faPaypal]} 
                    value={this.state.options.paypalSelected}/>

                    <PaymentMethodCard
                    name={"Credit Card or Debit Card"} 
                    onValueChanged={(value: boolean) => {this.setState({options: {...this.state.options, creditCardSelected: value}})}} 
                    icons={[faCcMastercard, faCcVisa]} 
                    value={this.state.options.creditCardSelected}/>

                    {this.getPlatformPaymentMethodButton()}
                </View>

                <CheckoutButtons proceedOnPress={this.proceed} backOnPress={undefined} proceedText={"Continue"} grayedOut={this.state.cannotProceed}/>
            </View>
        )
    }
}