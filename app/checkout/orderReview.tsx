import { Component, ReactNode } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { }

export interface OrderReviewProperties {
    navigation: any;
    //array of products
}

export interface OrderReviewStates {
    
}

export default class OrderReview extends Component<OrderReviewProperties, OrderReviewStates, any> {
    constructor(properties: OrderReviewProperties) {
        super(properties);
        this.state = {
            isVisible: false
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
       
    }

    private toCheckoutPage(): void {
        this.props.navigation.navigate("Home");
    }

    render(): ReactNode {
        return (
            <View className="h-100">
                <View className="h-5/6 bg-red-300">
                    
                </View>

                <View className="w-100 h-1/6 p-3 bg-green-300">
                    <View className="m-auto flex-row">
                        <TouchableOpacity className="bg-blue-500 w-2/5 rounded-full h-2/3 m-2" onPress={undefined}>
                            <Text className="m-auto">back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-red-500 w-2/5 rounded-full h-2/3 m-2" onPress={this.toCheckoutPage}>
                            <Text className="m-auto">Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

