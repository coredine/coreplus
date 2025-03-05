import { Component, ReactNode } from "react";
import { View, TouchableOpacity, Text, ColorValue } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AnimatableNumericValue } from "react-native";
import { router } from "expo-router";

export interface CheckoutButtonsProperties {
    backOnPress?: (() => void) | undefined;
    grayedOut?: boolean;
    proceedOnPress: (() => void) | undefined;
    proceedText: String;
    backgroundColor?: ColorValue | undefined; 
}

export class CheckoutButtons extends Component<CheckoutButtonsProperties, any, any> {
    constructor(properties: CheckoutButtonsProperties) {
        super(properties);
    }

    private defaultBackOnPress = () => {
        router.back();
    }

    render(): ReactNode {
        return(
            <View className="h-[15%] p-3" style={{backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "white"}}>
                <View className="m-auto flex-row">
                    <TouchableOpacity className="bg-blue-500 w-2/5 rounded-full h-3/4 m-2" onPress={this.props.backOnPress ? this.props.backOnPress : this.defaultBackOnPress}>
                        <FontAwesomeIcon icon={faArrowLeft} size={50} style={{margin: "auto"}}/>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-blue-500 w-2/5 rounded-full h-3/4 m-2" onPress={this.props.grayedOut ? undefined : this.props.proceedOnPress} style={{opacity: this.props.grayedOut ? 0.50 : 1}}>
                        <Text className="m-auto font-extrabold">{this.props.proceedText}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}