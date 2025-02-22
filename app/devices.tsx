import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import BluetoothService from '../service/BluetoothService';

export default function Devices() {
    const [devices, setDevices] = useState<Array<string | undefined>>([]);
    const instance = useRef(BluetoothService.getInstance());

    useEffect(() => {
        const callBack = async () => {
            let tmpDevice = new Set<string | undefined>();

            await requestMultiple([
                PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE
            ]);


            instance.current.scanDevices((id, name) => {
                console.log(`Id=${id} and Name=${name}`);
                tmpDevice.add(id);
            });

            let interval = setInterval(() => {
                setDevices(Array.from(tmpDevice));
                console.log("Interval!");
            }, 2000);

            setTimeout(() => {
                instance.current.stopScan();
                clearInterval(interval);
            }, 5000);
        }

        callBack();
    }, [])
    return (
        <View className="flex items-center">
            <Text className="text-2xl font-bold text-center">Available devices</Text>
            <FlatList
                data={devices}
                ItemSeparatorComponent={() => <View className="p-1" />}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={async () => {
                        console.log("Trying connect with "+item+".")
                        await instance.current.connectToDevice(item!);
                        await instance.current.sendSku("SKU-00001");
                        console.log("DONE!")
                    }} className="bg-blue-400 p-3" key={item}>
                        <Text className="text-white">{item}</Text>
                    </TouchableOpacity>
                )} />
        </View>
    )
}
