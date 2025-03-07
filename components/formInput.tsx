// import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Component, createRef, ReactNode, RefObject } from "react";
import { ColorValue, DimensionValue, ScrollView, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { verify } from "../service/RegexService";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export interface FormInputProperties {
    confirmationInput?: boolean;
    validationCallback?: (isValid: boolean) => void;
    repeatValidationCallback?: (isValid: boolean) => void;
    placeHolder?: string;
    icon?: string;
    regex?: RegExp;
    errorMessage?: string;
    hidden?: boolean;
    backgroundColor?: ColorValue;
    isValid?: boolean | undefined; //handled by Parent component
    repeatIsValid?: boolean | undefined; //handled by Parent component
    label: string;
    onChangeText: (value: string) => void;
    inputValue: string; //handled by Parent component
}

export interface FormInputStates {
    inputRef: RefObject<TextInput>;

}

export class FormInput extends Component<FormInputProperties, FormInputStates, any> {
    constructor(properties: FormInputProperties) {
        super(properties);
        this.state = {
            inputRef: createRef<TextInput>(),
        }
    }

    private getBackgroundColor = (): ColorValue => {
        return this.props.backgroundColor ? this.props.backgroundColor : "white";
    }

    private updateSecondInputState = (value: string): void => {
        if (value !== this.props.inputValue && this.props.repeatValidationCallback) this.props.repeatValidationCallback(false);
        else if (this.props.repeatValidationCallback) this.props.repeatValidationCallback(true);
    }

    private handleChange = (value: string) => {
        this.props.onChangeText(value);
        if (this.props.confirmationInput) 
            this.updateSecondInputState(value);
        if (this.props.regex && this.props.validationCallback) 
            this.props.validationCallback(verify(value, this.props.regex));
    }

    private focus = () => {
        this.state.inputRef.current?.focus();
    }

    render(): ReactNode {
        return(
            <View className="h-auto m-3" style={{backgroundColor: this.getBackgroundColor()}}>
                <View className="flex-row">
                    <View style={{width: this.props.icon ? "85%" : "100%"}}>
                        <View style={{alignSelf: "flex-start", backgroundColor: this.getBackgroundColor()}} className="z-10 relative ml-[2vw] top-[1.5vh] p-1">
                            <Text className="w-auto text-blue-700">{this.props.label}</Text>
                        </View>
                        <TextInput className="border-2 border-blue-700 h-[7vh]" onChangeText={this.handleChange} placeholder={this.props.placeHolder} secureTextEntry={this.props.hidden} ref={this.state.inputRef} value={this.props.inputValue}/>
                    </View>
                    {this.props.icon ? 
                        <TouchableOpacity className="w-[15%] border-2 border-blue-700 h-[7vh] mt-[2.86vh]" onPress={this.focus}>
                            {/* <FontAwesomeIcon icon={this.props.icon} size={30} style={{margin: "auto"}} color="blue"/> */}
                        </TouchableOpacity> 
                    : 
                    null}
                </View>
                <View className="min-h-[4vh]">
                    {this.props.errorMessage && this.props.isValid === false ? 
                        <Text className="m-auto text-red-600 text-lg font-bold">{this.props.errorMessage}</Text> 
                    : 
                    null
                    }
                </View>

                {this.props.confirmationInput ? 
                    <View className="min-h-[5vh]">
                        <View style={{alignSelf: "flex-start", backgroundColor: this.getBackgroundColor()}} className="z-10 relative left-[7vw] top-[1.5vh] p-1">
                            <Text className="w-auto text-blue-700">Repeat {this.props.label}</Text>
                        </View>
                        <TextInput className="border-2 border-blue-700 h-[7vh] w-[90%] m-auto" onChangeText={this.updateSecondInputState} secureTextEntry={this.props.hidden}/>
                        <View className="min-h-[4vh]">
                            {this.props.repeatIsValid === false ? <Text className="m-auto text-red-600 text-lg font-bold">Both fields must have the same value!</Text> : null}
                        </View>
                    </View>
                    : 
                    null
                }
            </View>
        )
    }
}

export interface SimpleFormInputProperties {
    backgroundColor: ColorValue | undefined;
    onChangeText: (text: string) => void;
    hidden: boolean;
    value: string;
    label: string;
}

/**
 * @note 
 * viewManagerResolver null exception for the other component (FormInput) when testing the app with a cable 
 */
export function SimpleFormInput(props: SimpleFormInputProperties) {

    return(
        <View style={{width: "85%"}} className="mr-auto ml-auto">
            <View style={{alignSelf: "flex-start", backgroundColor: props.backgroundColor}} className="z-10 relative ml-[2vw] top-[1.5vh] p-1">
                <Text className="w-auto text-blue-700">{props.label}</Text>
            </View>
            <TextInput className="border-2 border-blue-700 h-[7vh] p-2" onChangeText={(text: string) => props.onChangeText(text)} value={props.value} secureTextEntry={props.hidden}/>
        </View>
    )
}