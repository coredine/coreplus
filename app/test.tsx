import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import BluetoothService, { AppState } from '../service/BluetoothService';

export default function Test() {
    const instance = useRef(BluetoothService.getInstance());

    useEffect(() => {
        const callback = async () => {
            console.log("Trying to send new app state.");
            await instance.current.sendAppState(AppState.CHECKOUT);
            console.log("Sended successfuly.");

            console.log("Trying to send new payment info.");
            await instance.current.sendPaymentInfos("smartcart", "smartcart");
            console.log("Sended successfuly.");
        };

        callback();
    }, [])

    return (
        <View>
            <Text>test</Text>
        </View>
    )
}