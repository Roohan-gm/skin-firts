import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView } from 'react-native';
import { Button } from '@/components/ui/Button';
import '../global.css';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="mt-[235px] flex flex-col items-center">
          <Image
            source={require('assets/images/welcome.png')}
            className="h-[251px] w-[146px] object-contain"
            resizeMode="contain"
          />

          <Text className="font-lslight mx-[52px] mt-[84px] text-center  text-[12px] font-light leading-[100%] text-neutral-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>

          <View className="mt-[30px] flex w-[207px] flex-col gap-[7px] space-y-4">
            <Button
              title="Log In"
              onPress={() => {
                router.push('/sign-in');
              }}
              textClassName="text-white font-lsMedium text-2xl"
              className="rounded-full bg-[#2260FF]"
            />
            <Button
              title="Sign Up"
              onPress={() => {
                router.push('/sign-up');
              }}
              textClassName="text-[#2260FF] font-lsMedium text-2xl"
              className="rounded-full bg-[#CAD6FF]"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar hidden />
    </SafeAreaView>
  );
}
