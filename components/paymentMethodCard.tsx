import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, ReactNode } from "react";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export interface PaymentMethodCardProperties {
    implemented: boolean | undefined;
    icons: IconDefinition[] | undefined;
    name: String;
    description: String | undefined;
    lined: boolean | undefined;
    onValueChanged: (value: boolean) => void
}

export class PaymentMethodCard extends Component<PaymentMethodCardProperties, any, any> {
    constructor(properties: PaymentMethodCardProperties) {
        super(properties);
    }

    render(): ReactNode {
        return(
            <View className="w-100 h-100 flex-col">

                <View className="flex-row">

                    {/*LEFT VIEW*/}
                    <View className="flex-col">
                        <View className="flex-row">
                            <Checkbox value={false} onValueChange={(value: boolean) => this.props.onValueChanged(value)}/>
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
                    <View className=""></View> 
                    : 
                    null
                }

            </View>
        )
    }
}