import { StyleSheet, Text, View } from 'react-native';
import ResizableComponent from '../components/ResizableComponent';
import Camera from '../components/camera';


export default function App() {
  return (
    <ResizableComponent childOne={ ( 
      <View style={styles.container}>
        <Text style={styles.text}>Scanner</Text> 
        <Camera barcodeType='qr' width={300} height={180} />
      </View>
    ) } childTwo={ ( 
      <Text>Shopping cart</Text> 
    ) } />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },text: {
    width: '100%',
    textAlign: "center",
    margin: 2,
    backgroundColor: ""
  }
});
