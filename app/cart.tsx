import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ResizableComponent from '../components/ResizableComponent';
import Camera, { ScanMode } from '../components/camera';
import { useState } from 'react';
import { BarcodeScanningResult } from 'expo-camera';
import ProductCard, { Product } from '../components/Product';

function getProductBySKU(sku : string) : Product | undefined{
  const list = [{
    sku: "123456", title: "abc-123",
    picture : "https://reactnative.dev/img/tiny_logo.png",
    price: 19.99, weight: 1.1
  },{
    sku: "123458", title: "Lolapop",
    price: 1.79, weight: 0.25
  },{
    sku: "127659", title: "Apple",
    price: 2.19, weight: 0.31
  }]
  return list.find( (value) => value.sku===sku)
}

export default function App() {
  const [productList, setProductList] = useState<Product[]>([{
    sku: "123456", title: "abc-123",
    price: 19.99, weight: 1.1
  }]);
  const [scanMode, setScanMode] = useState(ScanMode.ALWAYS);
  
  return (
    <ResizableComponent childOne={ ( 
      <View style={styles.container}>
        <Text style={styles.text}>Scanner</Text> 
        <Camera barcodeType='qr' width={300} height={180} scanMode={scanMode} onBarcodeScanned={async (value: BarcodeScanningResult) => {
          console.log(value.data)
          let parsed = getProductBySKU(value.data);
          if (parsed) {
            setProductList( [...productList, parsed])
            setScanMode(ScanMode.NEVER)
          }
        }} />
      </View>
    ) } childTwo={ ( 
      <ScrollView>
        {productList.map( (value : Product, index) => (
          <ProductCard key={index} picture={value?.picture} 
            sku={value.sku} title={value.title}
            price={value.price} weight={value.weight}
            />
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
