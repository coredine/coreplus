import React, { useEffect, useState } from 'react'
import BluetoothService from '../service/BluetoothService'
import { FlatList, Text, View } from 'react-native';

export default function Devices() {
    const instance = BluetoothService.getInstance();
    const [devices, setDevices] = useState<Array<string | undefined>>([]);

    useEffect(() => {
        let tmpDevice: typeof devices = [];

        instance.scanDevices((id, name) => {
            console.log(`Id=${id} and Name=${name}`);
            tmpDevice.push(id);
        });

        setTimeout(() => {
            instance.stopScan();
            setDevices(Array.from(new Set(tmpDevice)));
        }, 3000)
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
