import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, ReactNode } from "react";
import { Text, TextInput, View } from "react-native";

export interface FormInputProperties {
    doubleEntry?: boolean;
    validationCallback?: (isValid: boolean) => void;
    placeHolder?: string;
    label: string;
    icon?: IconDefinition;
    regex?: RegExp;
    onChangeText: (value: string) => void;
}

export class FormInput extends Component<FormInputProperties, any, any> {
    constructor(properties: FormInputProperties) {
        super(properties);
    }

    render(): ReactNode {
        return(
            <View className="">
                <View>
                    <Text></Text>
                </View>

                <View>
                    <TextInput className="" onChangeText={(text: string) => this.props.onChangeText(text)}/>
                </View>
            </View>
        )
    }
}