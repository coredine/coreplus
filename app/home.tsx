import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Camera from '../components/camera';
import { useCallback, useRef, useState } from 'react';
import { BarcodeScanningResult } from 'expo-camera';
import BluetoothService from '../service/BluetoothService';

export default function App() {
  const [scanValue, setScanValue] = useState<string>("Nothing scanned.");
  const instance = useRef(BluetoothService.getInstance());

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan QR Code to connect</Text>
      <Camera barcodeType='qr' width={300} height={300} onBarcodeScanned={async (value: BarcodeScanningResult) => {
        setScanValue(value.data);
        await instance.current.scanDeviceThanConnect(value.data);
      }} />
      <Text style={styles.text}>{scanValue}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, text: {
    width: '100%',
    textAlign: "center",
    margin: 2
  }
});
