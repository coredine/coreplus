import { Component, ReactNode } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export interface CreditCardData {
    cardNumber: string | undefined;
    cardHolder: string | undefined;
    expirationDate: string | undefined;
    verificationValue: string | undefined;
}

export interface CreditCardFormModalProperties {
    //updateData()
    //
}

export interface CreditCardFormModalStates {

}

export class CreditCardFormModal extends Component<CreditCardFormModalProperties, CreditCardFormModalStates, any> {


    render(): ReactNode {
        return(
            <Modal 
                onPointerEnter={undefined} 
                onPointerLeave={undefined} 
                onLayout={undefined} 
                onShow={undefined} 
                transparent={true}
                animationType="slide"
                onRequestClose={undefined}
                visible={true}
                >
                    <View className="h-5/6 m-auto bg-violet-700 w-5/6 rounded-xl">
                        <Text>
                            OUI
                        </Text>

                        <TouchableOpacity className="h-1/4 bg-black w-100" onPress={undefined}>

                        </TouchableOpacity>
                    </View>
            </Modal>
        )
    }
}