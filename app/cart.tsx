import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ResizableComponent from '../components/ResizableComponent';
import Camera, { ScanMode } from '../components/camera';
import { useEffect, useRef, useState } from 'react';
import { BarcodeScanningResult } from 'expo-camera';
import ProductCard, { Product } from '../components/Product';
import BluetoothService from '../service/BluetoothService';
import { StaticCart } from '../components/StaticCart';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CheckoutButtons from '../components/checkoutButtons';

export default function Cart() {
  const productList = StaticCart.productList();
  const [trigger, setTrigger] = useState(0);
  const [removeMode, setRemoveMode] = useState<Product | undefined>(undefined)
  const instance = useRef(BluetoothService.getInstance());

  useEffect( () => {
    if (!instance.current.isConnected()){
      alert("You're not connected!")
      router.replace("/home")
    }
  }, []);

  StaticCart.setTrigger(trigger, setTrigger, ()=>{setRemoveMode(undefined)})
  
  return (
    <>
      <ResizableComponent childOne={ ( 
        <View style={styles.container}>
          <Camera barcodeType='code128' scanMode={StaticCart.getScanMode()} onBarcodeScanned={async (value: BarcodeScanningResult) => {
            console.log(value.data);
            StaticCart.scanOff();
            if (removeMode && (removeMode.sku!=value.data)) {
              setTimeout( () => {
                alert("You scanned the wrong product!");
                StaticCart.scanOn();
              }, 2000);
              
              return;
            }
            await instance.current.sendSku(value.data, (removeMode) ? "DEL" : "ADD");
          } } />
        </View>
      ) } childTwo={ ( 
        <SafeAreaView className='flex-1'>
          <ScrollView className='m-3 bg-gray-200 rounded-lg'>
            {productList.map( (value : Product, index) => (
              <ProductCard key={index} picture={value?.picture} 
                sku={value.sku} title={value.title}
                price={value.price} weight={value.weight}
                onPressRemove={() => {
                  setRemoveMode(value);
                }}
                />
            ))}
          </ScrollView>
          <View className='flex flex-row justify-between border-t-2 h-13' style={{borderColor:"lightgray"}}>
            <Text className='text-center text-xl font-semibold p-2 mt-1'>Total: {StaticCart.getTotal().toFixed(2)} + TAX</Text>
            <View className="flex flex-row justify-center pb-3 mr-3 mt-1" style={{opacity: productList.length <= 0 ? 0.50 : 1}}>
              <Button title={"Ready to pay"} onPress={productList.length <= 0 ? null : () => {router.push("/checkout")}} />
            </View>
          </View>
          {((removeMode)) ? (<>
              <View style={{...styles.overlay, backgroundColor:"black", opacity:0.4}}/>
              <View className='flex-1 justify-items' style={{...styles.overlay, justifyContent:'center'}}>
                <Text className='py-2 text-white text-center'>Please scan the item to remove it</Text>
                <Text className='z-100 py-2 text-white text-center'>{removeMode.title}</Text>
              </View> 
            </>): <></>}
            
        </SafeAreaView>
      ) } />
        {((StaticCart.getScanMode() != ScanMode.NEVER)) ? <></> :
          <>
            <View className='z-15' style={{...styles.overlay, backgroundColor:"black", opacity:0.4}}/>
          </>
        }
    </>
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
  },
  overlay:{
    position:'absolute', 
    top:0, bottom:0, 
    left:0, right:0
  }
});
