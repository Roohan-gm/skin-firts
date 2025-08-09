import { TouchableOpacity, View } from 'react-native';
import { FacebookIcon, GoogleIcon } from '@/components/icons';

export const SocialLoginBar = () => (
  <View className="mt-3 flex flex-row justify-center gap-[9px]">
    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-[#CAD6FF]">
      <GoogleIcon />
    </TouchableOpacity>
    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-[#CAD6FF]">
      <FacebookIcon />
    </TouchableOpacity>
  </View>
);
