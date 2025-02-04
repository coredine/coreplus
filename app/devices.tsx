import React, { useEffect, useState } from 'react'
import BluetoothService from '../service/BluetoothService'
import { FlatList, PermissionsAndroid, Text, View } from 'react-native';
import { PERMISSIONS, request, check, requestMultiple } from 'react-native-permissions';

export default function Devices() {
    const [devices, setDevices] = useState<Array<string | undefined>>([]);

    useEffect(() => {
        const callBack = async () => {
            let tmpDevice: typeof devices = [];

            await requestMultiple([
                PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE
            ]);

            let instance = BluetoothService.getInstance();

            instance.scanDevices((id, name) => {
                console.log(`Id=${id} and Name=${name}`);
                tmpDevice.push(id);
            });

            setTimeout(() => {
                instance.stopScan();
                setDevices(Array.from(new Set(tmpDevice)));
            }, 3000);
        }

        callBack();
    }, [])
    return (
        <View className="flex items-center">
            <Text className="text-2xl font-bold text-center">Available devices</Text>
            <FlatList
                data={devices}
                renderItem={({ item }) => (
                    <Text key={item}>{item}</Text>
                )} />
        </View>
    )
}
