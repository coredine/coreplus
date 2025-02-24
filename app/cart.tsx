import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ResizableComponent from '../components/ResizableComponent';
import Camera from '../components/camera';
import { useRef, useState } from 'react';
import { BarcodeScanningResult } from 'expo-camera';
import ProductCard, { Product } from '../components/Product';
import BluetoothService from '../service/BluetoothService';
import { StaticCart } from '../components/StaticCart';

async function getProductBySKU(instance : BluetoothService, sku : string) : Promise<void>{
  await instance.sendSku(sku, "ADD");
}

export default function App() {
  const productList = StaticCart.productList();
  const [trigger, setTrigger] = useState(0);
  const instance = useRef(BluetoothService.getInstance());

  StaticCart.setTrigger(trigger, setTrigger)
  
  return (
    <ResizableComponent childOne={ ( 
      <View style={styles.container}>
        <Text style={styles.text}>Scanner</Text> 
        <Camera barcodeType='qr' width={300} height={180} scanMode={StaticCart.getScanMode()} onBarcodeScanned={async (value: BarcodeScanningResult) => {
          console.log(value.data)
          StaticCart.scanOff();
          await getProductBySKU(instance.current, value.data);
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
