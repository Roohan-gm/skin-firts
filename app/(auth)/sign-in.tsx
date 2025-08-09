import { Button } from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye } from 'lucide-react-native';
import { useState } from 'react';
import { EyeCrossIcon, FacebookIcon, GoogleIcon } from '@/components/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { z } from 'zod';

// Zod schema for form validation
const signInSchema = z.object({
  email: z.email().nonempty('Email or Mobile is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Mock query (replace with your API endpoint)
  const { isLoading, error } = useQuery({
    queryKey: ['signInStatus'],
    queryFn: () => fetch('https://api.example.com/signin').then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      fetch('https://api.example.com/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }).then((res) => res.json()),
    onSuccess: () => {
      router.push('/home');
    },
    onError: (err) => {
      console.error('Sign-in error:', err);
    },
  });

  const handleSubmit = () => {
    try {
      signInSchema.parse(formData);
      setErrors({ email: '', password: '' });
      // mutation.mutate(formData);
      
      router.push('/home');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Record<string, string[]>;
        setErrors({
          email: fieldErrors.email?.[0] || '',
          password: fieldErrors.password?.[0] || '',
        });
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-[30px] py-[35px]">
          <View className="flex flex-row items-center justify-start gap-[81px]">
            <TouchableOpacity onPress={router.back}>
              <ChevronLeft width={24} height={24} color="#2260FF" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="w-[121px] text-center font-lsSemiBold text-[24px] font-semibold leading-[100%] text-[#2260FF]">
              Log In
            </Text>
          </View>
          <Text className="mt-[34px] align-middle font-lsSemiBold text-[24px] font-semibold leading-[100%] text-[#2260FF]">
            Welcome
          </Text>
          <Text className="font-lsLight text-[12px] font-light leading-[100%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>
          <View className="mt-[47px]">
            <View className="gap-3">
              <Text className="font-lsMedium text-[20px] font-medium leading-[100%]">
                Email or Mobile Number
              </Text>
              <TextInput
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="example@example.com"
                placeholderTextColor={'#809CFF'}
                className="font-regular rounded-[13px] bg-[#ECF1FF] px-[13px] align-middle font-lsRegular text-[20px] leading-[100%] text-[#809CFF]"
              />
              {errors.email ? (
                <Text className="text-[12px] text-red-500">{errors.email}</Text>
              ) : null}
            </View>
            <View className="gap-3">
              <Text className="font-lsMedium text-[20px] font-medium leading-[100%]">Password</Text>
              <View className="relative">
                <TextInput
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  placeholder="*************"
                  placeholderTextColor={'#809CFF'}
                  className="font-regular rounded-[13px] bg-[#ECF1FF] px-[13px] align-middle font-lsRegular text-[20px] leading-[100%] text-[#809CFF]"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={22} color="black" /> : <EyeCrossIcon />}
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text className="text-[12px] text-red-500">{errors.password}</Text>
              ) : null}
              <Link href={'/forget-password'} className="mt-[9px]">
                <Text className="text-right align-middle font-lsMedium text-[12px] leading-[100%] text-[#2260FF]">
                  Forget Password
                </Text>
              </Link>
            </View>
          </View>
          <View className="mx-auto mt-[37px] w-[207px]">
            <Button
              title="Log In"
              onPress={handleSubmit}
              textClassName="text-white font-lsMedium text-2xl"
              className="rounded-full bg-[#2260FF]"
              disabled={isLoading}
            />
          </View>
          {error && <Text className="mt-2 text-center text-red-500">{error.message}</Text>}
          <Text className="mt-[16px] text-center font-lsLight text-[12px] leading-[100%]">
            or sign up with
          </Text>
          <View className="mt-3 flex flex-row justify-center gap-[9px]">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#CAD6FF]">
              <GoogleIcon />
            </View>
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#CAD6FF]">
              <FacebookIcon />
            </View>
          </View>
          <Text className="mt-[38px] text-center font-lsMedium text-[12px] leading-[100%]">
            Don&apos;t have an account?{' '}
            <Link href={'/sign-up'} className="text-[#2260FF]">
              Sign Up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
