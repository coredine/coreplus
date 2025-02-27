import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, ReactNode } from "react";
import { View, Text, DimensionValue, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export interface PaymentMethodCardProperties {
    icons?: IconDefinition[] | undefined;
    name: String;
    description?: String | undefined;
    height?: DimensionValue | undefined;
    value: boolean;
    onValueChanged: (value: boolean) => void
}

export class PaymentMethodCard extends Component<PaymentMethodCardProperties, any, any> {
    constructor(properties: PaymentMethodCardProperties) {
        super(properties);
    }

    private toggle = () => {
        this.props.onValueChanged(!this.props.value);
    }

    render(): ReactNode {
        return(
            <TouchableOpacity className="w-100 flex-col m-3 bg-gray-300 rounded-md p-3" style={{height: this.props.height ? this.props.height : "14%"}} onPress={this.toggle}>

                <View className="flex-row h-[100%]">

                    <View className="flex-col w-[70%] ">
                        <View className="flex-row">
                            <Checkbox value={this.props.value} onValueChange={this.props.onValueChanged} style={{backgroundColor: "white", borderColor: "black", margin: 5}} color="blue"/>
                            <Text className="font-semibold text-xl text-purple-400">{this.props.name}</Text>
                        </View>

                        {this.props.description ? 
                            <View className="">
                                <Text className="m-auto">{this.props.description}</Text>
                            </View> 
                        : 
                            null
                        }
                    </View>

                    {this.props.icons ? 
                        <View className="flex-row-reverse w-[30%]  h-[100%]">
                            {this.props.icons.map((item, index) => (
                                <View key={index} className="m-auto">
                                    <FontAwesomeIcon size={40} icon={item} color="blue"/>
                                </View>
                            ))}
                        </View> 
                        : 
                        null
                    }

                </View>

            </TouchableOpacity>
        )
    }
}