import { Component, ReactNode } from "react";
import { View} from "react-native";
import { CheckoutButtons } from "../../components/checkoutButtons";
import { PageTitle } from "../../components/pageTitle";
import { router } from "expo-router";
import { StaticCart } from "../../components/StaticCart";
import ProductCard, { Product } from "../../components/Product";

export interface OrderReviewStates {
    productList: Product[]
}

export default class OrderReview extends Component<any, OrderReviewStates, any> {
    constructor(properties: any) {
        super(properties);
        this.state = {
            productList: StaticCart.productList()
        }
    }

    toCheckoutPage = (): void => {
        router.navigate("/checkout/checkout");
    }

    render(): ReactNode {
        return (
            <View className="h-100">
                <PageTitle title="Order Review"/>

                <View className="h-[77%]">
                    <View className="bg-gray-200 h-[95%] w-5/6 m-auto rounded-lg">
                        {this.state.productList.map((value : Product, index) => (
                            <ProductCard key={index} 
                            picture={value?.picture} 
                            sku={value.sku} 
                            title={value.title}
                            price={value.price} 
                            weight={value.weight}
                            onPressRemove={() => {}}
                            />
                        ))}
                    </View>
                </View>

                <CheckoutButtons backOnPress={undefined} proceedOnPress={this.toCheckoutPage} proceedText={"Checkout"} grayedOut={false}/>
            </View>
        )
    }
}

