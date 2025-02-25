import { Component, ReactNode } from "react";
import { Modal, Text, TouchableOpacity, View, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CheckoutButtons } from "../../components/checkoutButtons";

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
        console.log("TO CHECKOUT PAGE");
        //this.props.navigation.navigate("Home");
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

                <CheckoutButtons backOnpress={undefined} proceedOnpress={this.toCheckoutPage} proceedText={"Checkout"} grayedOut={false}/>
            </View>
        )
    }
}

