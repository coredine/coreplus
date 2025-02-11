import { StyleSheet, Text, View } from 'react-native';
import ResizableComponent from '../components/ResizableComponent';


export default function App() {
  return (
    <ResizableComponent childOne={ ( <Text>Camera</Text> ) } childTwo={ ( <Text>Shopping cart</Text> ) } />
  );
}

const styles = StyleSheet.create({
  text: {
    width: '100%',
    textAlign: "center",
    margin: 2,
    backgroundColor: ""
  }
});
