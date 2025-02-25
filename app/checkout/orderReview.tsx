import { Component, ReactNode } from "react";
import { Modal, Text, TouchableOpacity, View, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export interface OrderReviewProperties {
    navigation: any;
    //array of products
}

export default class OrderReview extends Component<OrderReviewProperties, any, any> {
    constructor(properties: OrderReviewProperties) {
        super(properties);
        this.state = {}
    }

    toCheckoutPage = (): void => {
        this.props.navigation.navigate("Home");
    }

    render(): ReactNode {
        return (
            <View className="h-100">
                <View className="bg-blue-500 h-[8%]">
                    <Text className="m-auto font-extrabold text-4xl">Order Review</Text>
                </View>

                <View className="h-[77%]">
                    <View className="bg-gray-200 h-[95%] w-5/6 m-auto rounded-lg">
                        <Text>ARRAY....</Text>
                        {/* <FlatList/> of ProductCard */}
                    </View>
                </View>

                <View className="h-[15%] p-3 bg-white">
                    <View className="m-auto flex-row">
                        <TouchableOpacity className="bg-blue-500 w-2/5 rounded-full h-3/4 m-2" onPress={undefined}>
                            <FontAwesomeIcon icon={faArrowLeft} size={50} style={{margin: "auto"}}/>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-blue-500 w-2/5 rounded-full h-3/4 m-2" onPress={this.toCheckoutPage}>
                            <Text className="m-auto font-extrabold">Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

