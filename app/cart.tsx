import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ResizableComponent from '../components/ResizableComponent';
import Camera from '../components/camera';
import { useState } from 'react';
import { BarcodeScanningResult } from 'expo-camera';


export default function App() {
  const [productList, setProductList] = useState(["Product 1", "Product 1", "Product 1", "Product 1", "Product 1"]);
  
  return (
    <ResizableComponent childOne={ ( 
      <View style={styles.container}>
        <Text style={styles.text}>Scanner</Text> 
        <Camera barcodeType='qr' width={300} height={180} onBarcodeScanned={async (value: BarcodeScanningResult) => {
          setProductList( [...productList, value.data])
        }} />
      </View>
    ) } childTwo={ ( 
      <ScrollView>
        {productList.map( (value, index) => (
          <Text key={index} style={styles.text}>{value}</Text> 
        ))}
      </ScrollView>
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
