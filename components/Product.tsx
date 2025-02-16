import { View, Text, TouchableOpacity, Image } from "react-native";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Reanimated from 'react-native-reanimated';

export interface Product {
  sku: string;
  price: number;
  weight: number;
  title: string;
  picture?: string;
}

interface ProductProps extends Product{
  onPressRemove: Function;
}

export default function ProductCard(props: ProductProps){
  const noImage = require("../assets/no-image.png");

  const RemoveItem = () => {

    return (
      <Reanimated.View style={{width:64}} className="bg-red-500 justify-center">
        <TouchableOpacity onPress={() => props?.onPressRemove()}>
          <Text className="text-center text-2xl text-white">X</Text>
        </TouchableOpacity>
      </Reanimated.View>
    )
  }

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable 
        containerStyle={{
          margin:6, marginLeft:12, marginRight:12,
          borderRadius:8
        }}
        friction={2.5}
        enableTrackpadTwoFingerGesture
        rightThreshold={45}
        renderRightActions={RemoveItem}
        >
        <View className="flex flex-row w-100 justify-between bg-white p-2">
          <Image style={{width:50, height:50}} className="w-100 h-100" src={props.picture} source={noImage} />
          <View className="align-middle">
            <Text className="text-right text-xl font-extrabold"> {props.title} </Text>
            <Text className="text-right"> {props.price} + TAX </Text>
          </View>
        </View>
      </ReanimatedSwipeable>
      
    </GestureHandlerRootView>
  )
}