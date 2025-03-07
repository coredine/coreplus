import { View, TouchableOpacity, Text, ColorValue } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";

export interface CheckoutButtonsProperties {
    backOnPress?: (() => void) | undefined;
    grayedOut?: boolean;
    proceedOnPress: (() => void) | undefined;
    proceedText: String;
    backgroundColor?: ColorValue | undefined; 
    iconSize?: number;
}

export default function CheckoutButtons(props: CheckoutButtonsProperties) {

    const defaultBackOnPress = () => {
        router.back();
    }

    return(
        <View className="h-[15%] p-3" style={{backgroundColor: props.backgroundColor ? props.backgroundColor : "white"}}>
            <View className="m-auto flex-row">
                <TouchableOpacity className="bg-blue-500 w-2/5 rounded-full h-3/4 m-2" onPress={props.backOnPress ? props.backOnPress : defaultBackOnPress}>
                    <AntDesign name="arrowleft" size={props.iconSize ? props.iconSize : 50} style={{margin: "auto"}}/>
                </TouchableOpacity>

                <TouchableOpacity className="bg-blue-500 w-2/5 rounded-full h-3/4 m-2" onPress={props.grayedOut ? undefined : props.proceedOnPress} style={{opacity: props.grayedOut ? 0.50 : 1}}>
                    <Text className="m-auto font-extrabold">{props.proceedText}</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}