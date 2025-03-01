import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, ReactNode } from "react";
import { TextInput, View } from "react-native";
import { RegexService } from "../service/RegexService";

export interface FormInputProperties {
    doubleEntry?: boolean;
    placeHolder?: string;
    label: string;
    icon?: IconDefinition;
    onChangeText: (value: string) => void;
}

export class FormInput extends Component<FormInputProperties, any, any> {
    constructor(properties: FormInputProperties) {
        super(properties);
    }

    render(): ReactNode {
        return(
            <View>
                <TextInput/>
            </View>
        )
    }
}