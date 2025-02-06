import { Component, ReactNode, RefObject } from "react";
import { Modal, Text, TextInput, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedbackProps, View } from "react-native";

export interface CreditCardFormModalProperties {
    touchableActuator: RefObject<TouchableWithoutFeedbackProps>;
    cardNumberCallback: (value: string) => void;
    cardHolderCallback: (value: string) => void;
    verificationValueCallback: (value: string) => void;
    expirationDate: (value: string) => void;
    onShow: () => void | undefined;
    onHide: () => void | undefined;
}

export interface CreditCardFormModalStates {
    isVisible: boolean;
}

export class CreditCardFormModal extends Component<CreditCardFormModalProperties, CreditCardFormModalStates, any> {
    constructor(properties: CreditCardFormModalProperties) {
        super(properties);
        this.state = {
            isVisible: false
        }
    }

    componentDidMount(): void {
        this.props.touchableActuator.current!.onPress = this.toggleVisibility;
    }

    private toggleVisibility = () => {
        this.setState({...this.state, isVisible: !this.state.isVisible});
    }

    render(): ReactNode {
        return(
            <Modal 
                onShow={this.props.onShow} 
                animationType="fade"
                onRequestClose={this.props.onHide}
                visible={this.state.isVisible}
                >
                    <View className="h-5/6 w-5/6 m-auto bg-violet-700 rounded-xl">

                        <View className="h-5/6 bg-red-300">
                            <TextInput onChangeText={(value) => this.props.cardNumberCallback(value)}>

                            </TextInput>

                            <TextInput onChangeText={(value) => this.props.cardHolderCallback(value)}>

                            </TextInput>

                            

                        </View>
                        
                        <View className="w-100 h-1/6 flex-row p-3 bg-green-300">
                            <TouchableOpacity className="bg-blue-500 w-2/5 rounded-full h-2/3" onPress={undefined}>
                                <Text className="m-auto">CLOSE</Text>
                            </TouchableOpacity>
                        
                            <TouchableOpacity className="bg-red-500 w-2/5 rounded-full h-2/3">
                                <Text className="m-auto">SAVE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Modal>
        )
    }
}