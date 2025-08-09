import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import { SignupForm } from '@/components/ui/SignupForm';
import { SocialLoginBar } from '@/components/ui/SocialLoginBar';

export default function SignUpScreen() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-[30px] py-[35px]">
          <View className="flex flex-row items-center justify-start gap-[24px]">
            <TouchableOpacity onPress={router.back}>
              <ChevronLeft size={24} color="#2260FF" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="flex-1 text-center font-lsSemiBold text-[24px] text-[#2260FF]">
              New Account
            </Text>
          </View>
          <View className='mt-[36px]'>
            <SignupForm />
          </View>
          <Text className="mx-auto mt-5 w-[273px] text-center font-lsLight text-[12px]">
            By continuing, you agree to{' '}
            <Link href="/sign-up" className="text-[#2260FF]">
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link href="/sign-up" className="text-[#2260FF]">
              Privacy Policy
            </Link>
            .
          </Text>

          <Text className="mt-4 text-center font-lsLight text-[12px]">or sign up with</Text>
          <SocialLoginBar />

          <Text className="mt-[38px] text-center font-lsMedium text-[12px] leading-[100%]">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#2260FF]">
              Log in
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
