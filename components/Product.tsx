import { View, Text, Image } from "react-native";

export interface Product {
  sku: string;
  price: number;
  weight: number;
  title: string;
  picture?: string;
}

export default function ProductCard(props: Product){
  const noImage = require("../assets/no-image.png");
  return (
    <View className="flex flex-row w-100 justify-between bg-red-300 m-2 mx-6 p-2 rounded-lg">
      <Image style={{width:50, height:50}} className="w-100 h-100" src={props.picture} source={noImage} />
      <View className="align-middle">
        <Text className="text-right text-xl font-extrabold"> {props.title} </Text>
        <Text className="text-right"> {props.price} + TAX </Text>
      </View>
    </View>
  )
}