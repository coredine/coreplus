import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ResizableComponent from '../components/ResizableComponent';
import Camera, { ScanMode } from '../components/camera';
import { useRef, useState } from 'react';
import { BarcodeScanningResult } from 'expo-camera';
import ProductCard, { Product } from '../components/Product';
import BluetoothService from '../service/BluetoothService';
import { StaticCart } from '../components/StaticCart';

async function getProductBySKU(instance : BluetoothService, sku : string) : Promise<Product | undefined>{
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
  await instance.sendSku(`SKU-${sku}`);
  return list.find( (value) => value.sku===sku)
}

export default function App() {
  const productList = StaticCart.productList();
  const [scanMode, setScanMode] = useState(ScanMode.ALWAYS);
  const instance = useRef(BluetoothService.getInstance());
  
  return (
    <ResizableComponent childOne={ ( 
      <View style={styles.container}>
        <Text style={styles.text}>Scanner</Text> 
        <Camera barcodeType='qr' width={300} height={180} scanMode={scanMode} onBarcodeScanned={async (value: BarcodeScanningResult) => {
          console.log(value.data)
          let parsed = await getProductBySKU(instance.current, value.data);
          if (parsed) {
            StaticCart.addProduct(parsed)
            setScanMode(ScanMode.NEVER)
          }
        }} />
      </View>
    ) } childTwo={ ( 
      <ScrollView className='m-3 bg-gray-200 rounded-lg py-2'>
        {productList.map( (value : Product, index) => (
          <ProductCard key={index} picture={value?.picture} 
            sku={value.sku} title={value.title}
            price={value.price} weight={value.weight}
            onPressRemove={() => {console.log("remove " + value.sku)}}
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
