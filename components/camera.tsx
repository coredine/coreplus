import { BarcodeScanningResult, BarcodeType, CameraView,  useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface CameraProps{
  // Only one barcode type at a time. 
  // Maybe allowing different types would be nice?
  barcodeType: BarcodeType;
  onBarcodeScanned?: CallableFunction;
  width?:number;
  height?:number;
}

export default function Camera(props:CameraProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [lastScan, setLastScan] = useState<string>("");

  const barcodeTypes : BarcodeType[] = [props.barcodeType]
  const cameraStyle = { width:props.width, height:props.height }

  if (!permission) { return <View/>; }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Permission required to scan items.</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const onScan = (scanResult:BarcodeScanningResult) => {
    // Only call the method if the scan result is different.
    if (lastScan!==scanResult.data){
      if (props.onBarcodeScanned)
        props.onBarcodeScanned(scanResult);
      else
        console.log(scanResult);
      
      setLastScan(scanResult.data);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView onBarcodeScanned={onScan} style={cameraStyle} active 
        barcodeScannerSettings={{barcodeTypes: barcodeTypes}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor:"#000000"
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});


  