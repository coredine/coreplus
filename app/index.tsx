import { Link } from 'expo-router';
import "../global.css";
import { View } from 'react-native';

const TempLink = (props: {path: string, label: string}) => {
  return (
    <Link className="text-blue-400 underline text-xl" href={props.path}>{props.label}</Link>
  );
}

export default function App() {
  return (
    <View className="flex flex-row justify-center items-center gap-3">
      <TempLink path="/home" label="Home" />
    </View>
  );
}
