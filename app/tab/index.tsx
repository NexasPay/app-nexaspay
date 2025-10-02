import { Text, View, Image } from 'react-native';
import { colors } from '../../utils/colors';

const PlaceholderImage = require('../../assets/logo/nexaspay.logo.png');
export default function LoginScreen() {
  return (
    <View className="flex-1 items-center justify-center"
    style={{
      backgroundColor: colors.bgDark1
    }}>
<View>
  <Text>areroz</Text>
  <Image source={PlaceholderImage}/>
</View>
    
    </View>
  );
}