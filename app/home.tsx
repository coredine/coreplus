import { BarcodeScanningResult } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Camera, { ScanMode } from '../components/camera';
import BluetoothService from '../service/BluetoothService';

export default function HomePage() {
  const [scanValue, setScanValue] = useState<string | undefined>();
  const [scanMode, setScanMode] = useState(ScanMode.ALWAYS);
  const instance = useRef(BluetoothService.getInstance());

  useEffect(() => {
    const callBack = async () => {
      await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE
      ]);

      instance.current.scanBackground();
    }

    callBack();
  }, []);

  return (
    <View style={styles.container}>
      <Text className="text-4xl font-bold text-blue-400">Coreplus&reg;</Text>
      <Text className="text-lg font-semibold">Scan QR code to connect to a SmartCart.</Text>
      {(scanMode===ScanMode.ALWAYS) ?
        <Camera scanMode={scanMode} barcodeType='qr' width={300} height={300} onBarcodeScanned={async (value: BarcodeScanningResult) => {
          setScanValue(value.data);
          setScanMode(ScanMode.NEVER);
          await instance.current.connectToDevice(value.data);
          setScanValue(undefined);
          
          setTimeout(() => {
            setScanMode(ScanMode.ALWAYS);
          }, 2000);
        }} /> : <View style={{backgroundColor:"black", width:300, height:300}}></View>

      {scanValue ?
        <Text style={styles.text}>Try to connect to {scanValue}.</Text> : <></>
      }
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
