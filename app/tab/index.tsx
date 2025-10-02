import { Text, View, Image } from 'react-native';


const PlaceholderImage = require('../../assets/logo/nexaspay.logo.png');
export default function LoginScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-100">
<View>
  <Image source={PlaceholderImage}/>
</View>
    
    </View>
  );
}