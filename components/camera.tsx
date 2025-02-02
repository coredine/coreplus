import { BarcodeType, CameraView,  useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, View } from 'react-native';

interface CameraProps{
    barcodeType: BarcodeType;
    width?:number;
    height?:number;
}

export default function Camera(props:CameraProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const barcodeTypes : BarcodeType[] = [props.barcodeType]

  if (!permission) { return <View/>; }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={{width:props.width, height:props.height}} active 
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
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});


  