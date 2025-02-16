import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ResizableComponent from '../components/ResizableComponent';
import Camera, { ScanMode } from '../components/camera';
import { useState } from 'react';
import { BarcodeScanningResult } from 'expo-camera';

interface Product {
  sku: string;
  price: number;
  weight: number;
  title: string;
  picture?: string;
}

export default function App() {
  const [productList, setProductList] = useState(["Product 1", "Product 1", "Product 1", "Product 1", "Product 1"]);
  const [scanMode, setScanMode] = useState(ScanMode.ALWAYS);
  
  return (
    <ResizableComponent childOne={ ( 
      <View style={styles.container}>
        <Text style={styles.text}>Scanner</Text> 
        <Camera barcodeType='qr' width={300} height={180} scanMode={scanMode} onBarcodeScanned={async (value: BarcodeScanningResult) => {
          setProductList( [...productList, value.data])
          setScanMode(ScanMode.NEVER)
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
