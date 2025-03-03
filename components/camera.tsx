import { BarcodeScanningResult, BarcodeType, CameraView,  useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

enum ScanMode {
  NEVER,
  DEFAULT,
  ALWAYS
}

interface CameraProps{
  // Only one barcode type at a time. 
  // Maybe allowing different types would be nice?
  barcodeType: BarcodeType;
  onBarcodeScanned?: CallableFunction;
  width?:number|string;
  height?:number|string;
  borderRadius?:number;
  scanMode?:ScanMode;
}

export default function Camera(props:CameraProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [lastScan, setLastScan] = useState<string>("");

  const barcodeTypes : BarcodeType[] = [props.barcodeType]
  const cameraStyle = { width:props.width ?? "100%", height: props.height ?? "100%", borderRadius:props.borderRadius ?? 0 }

  if (!permission) { return <View/>; }

  if (!permission.granted) {
    return (
      <View style={{...styles.container, width: props.width}}>
        <Text style={styles.message}>Permission required to scan items.</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const onScan = (scanResult:BarcodeScanningResult) => {
    if (props.scanMode==ScanMode.NEVER) 
      return;

    // Only call the method if the scan result is different or scan mode is always.
    if (lastScan!==scanResult.data || props.scanMode==ScanMode.ALWAYS) {
      if (props.onBarcodeScanned)
        props.onBarcodeScanned(scanResult);
      else
        console.log(scanResult);
      
      setLastScan(scanResult.data);
    }
  }

  return (
    <CameraView onBarcodeScanned={onScan} active 
        style={{...styles.cameraContainer, ...cameraStyle}}
        barcodeScannerSettings={{barcodeTypes: barcodeTypes}} />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor:"#F0F0F0",
    padding:8
  },
  cameraContainer:{
    borderWidth:2,
    borderCurve:'circular'
  },
  message: {
    width:'100%',
    textAlign: 'center',
    paddingBottom: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});

export { ScanMode };