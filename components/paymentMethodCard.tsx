import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, ReactNode } from "react";
import { View, Text, DimensionValue } from "react-native";
import Checkbox from "expo-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export interface PaymentMethodCardProperties {
    implemented: boolean | undefined;
    icons: IconDefinition[] | undefined;
    name: String;
    description: String | undefined;
    lined: boolean | undefined;
    height: DimensionValue | undefined;
    value: boolean;
    onValueChanged: (value: boolean) => void
}

export interface PaymentMethodCardStates {
    checked: boolean;
}

export class PaymentMethodCard extends Component<PaymentMethodCardProperties, PaymentMethodCardStates, any> {
    constructor(properties: PaymentMethodCardProperties) {
        super(properties);
        this.state = {
            checked: false
        }
    }

    private valueChanged = (value: boolean) => {
        console.log("slt");
    }

    render(): ReactNode {
        return(
            <View className="w-100 flex-col m-4 bg-gray-300 rounded-md p-3" style={{height: this.props.height}}>

                <View className="flex-row">

                    {/*LEFT VIEW*/}
                    <View className="flex-col">
                        <View className="flex-row">
                            <Checkbox value={this.props.value} onValueChange={this.props.onValueChanged} style={{backgroundColor: "white", borderColor: "black"}}/>
                            <Text>{this.props.name}</Text>
                        </View>

                        {this.props.description ? 
                            <View className="">
                                <Text>{this.props.description}</Text>
                            </View> 
                        : 
                            null
                        }
                    </View>

                    {/*RIGHT VIEW - ICONS AT THE RIGHT*/}
                    {this.props.icons ? 
                        <View className="flex-row">
                            {this.props.icons.map((item, index) => (
                                <View key={index} className="m-1">
                                    <FontAwesomeIcon size={10} icon={item}/>
                                </View>
                            ))}
                        </View> 
                        : 
                        null
                    }

                </View>

                {/*LINE AT THE BOTTOM*/}
                {this.props.lined ?
                    <View className="bg-bottom bg-"></View> 
                    : 
                    null
                }

            </View>
        )
    }
}