import { Component, ReactNode } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export interface ReviewProperties {
    //array of products
}

export interface ReviewStates {
    
}

export default class Review extends Component<ReviewProperties, ReviewStates, any> {
    constructor(properties: ReviewProperties) {
        super(properties);
        this.state = {
            isVisible: false
        }
    }



    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
       
    }

    render(): ReactNode {
        return (
            <View className="h-100">
                <View className="h-5/6 bg-red-300">
                    
                </View>

                <View className="w-100 h-1/6 flex-row p-3 bg-green-300">
                    <TouchableOpacity className="bg-blue-500 w-2/5 rounded-full h-2/3" onPress={undefined}>
                        <Text className="m-auto">BACK</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-red-500 w-2/5 rounded-full h-2/3">
                        <Text className="m-auto">CHECKOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

