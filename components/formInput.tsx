import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, createRef, ReactNode, RefObject } from "react";
import { ColorValue, DimensionValue, ScrollView, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { verify } from "../service/RegexService";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export interface FormInputProperties {
    doubleEntry?: boolean;
    validationCallback?: (isValid: boolean) => void;
    placeHolder?: string;
    icon?: IconDefinition;
    regex?: RegExp;
    hidden?: boolean;
    height?: DimensionValue;
    backgroundColor?: ColorValue;
    label: string;
    onChangeText: (value: string) => void;
}

export interface FormInputStates {
    inputRef: RefObject<TextInput>
}

export class FormInput extends Component<FormInputProperties, FormInputStates, any> {
    constructor(properties: FormInputProperties) {
        super(properties);
        this.state = {
            inputRef: createRef<TextInput>()
        }
    }

    private getBackgroundColor = (): ColorValue => {
        return this.props.backgroundColor ? this.props.backgroundColor : "white";
    }

    private handleChange = (value: string) => {
        this.props.onChangeText(value);
        if (this.props.regex && this.props.validationCallback) this.props.validationCallback(verify(value, this.props.regex));
    }

    private focus = () => {
        this.state.inputRef.current?.focus();
    }

    render(): ReactNode {
        return(
            <View className="h-auto m-2" style={{backgroundColor: this.getBackgroundColor()}}>
                <View className="flex-row">
                    <View className="w-[85%]">
                        <View style={{alignSelf: "flex-start", backgroundColor: this.getBackgroundColor()}} className="z-10 relative ml-[2vw] top-[1.5vh] p-1">
                            <Text className="w-auto text-blue-700">{this.props.label}</Text>
                        </View>
                        <TextInput className="border-2 border-blue-700 h-[7vh]" onChangeText={this.handleChange} placeholder={this.props.placeHolder} secureTextEntry={this.props.hidden ? this.props.hidden : false} ref={this.state.inputRef}/>
                    </View>
                    {this.props.icon ? 
                        <TouchableOpacity className="w-[15%] border-2 border-blue-700 h-[7vh] mt-[2.86vh]" onPress={this.focus}>
                            <FontAwesomeIcon icon={this.props.icon} size={30} style={{margin: "auto"}} color="blue"/>
                        </TouchableOpacity> 
                    : 
                    null}
                </View>
            </View>
        )
    }
}