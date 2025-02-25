import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, ReactNode } from "react";
import { View} from "react-native";

export interface PaymentMethodCardProperties {
    implemented: boolean;
    icons: IconDefinition[];
    name: String;
    description: String;
}

export default class PaymentMethodCard extends Component<PaymentMethodCardProperties, any, any> {
    constructor(properties: PaymentMethodCardProperties) {
        super(properties);
    }



    render(): ReactNode {
        return(
            <View className="">
                
            </View>
        )
    }
}