// app/(auth)/set-password.tsx
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye } from 'lucide-react-native';
import { useState } from 'react';
import { EyeCrossIcon } from '@/components/icons';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

// 1️⃣  Schema: password + confirm-password
const schema = z
  .object({
    password: z.string().min(6, 'Minimum 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Form = z.infer<typeof schema>;

export default function SetPassword() {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<Form>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Form>>({});

  const { isPending, error, mutate } = useMutation({
    mutationFn: (payload: Form) =>
      fetch('https://api.example.com/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((res) => res.json()),
    onSuccess: () => router.replace('/home'),
  });

  const handleSubmit = () => {
    try {
      schema.parse(formData);
      setErrors({});
      mutate(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.flatten().fieldErrors as Partial<Form>);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-[30px] py-[35px]">
          {/* Header */}
          <View className="flex flex-row items-center">
            <ChevronLeft onPress={router.back} size={24} color="#2260FF" strokeWidth={3} />
            <Text className="flex-1 text-center font-lsSemiBold text-[24px] text-[#2260FF]">
              Set Password
            </Text>
          </View>

          <Text className="mt-7 font-lsLight text-[12px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>

          {/* Password */}
          <View className="mt-[35px] gap-3">
            <Text className="font-lsMedium text-[20px]">Password</Text>
            <View className="relative ">
              <TextInput
                secureTextEntry={!showPass}
                value={formData.password}
                onChangeText={(t) => setFormData({ ...formData, password: t })}
                placeholder="*************"
                placeholderTextColor="#809CFF"
                className="rounded-[13px] bg-[#ECF1FF] px-3 py-3 font-lsRegular text-[20px] text-[#809CFF]"
              />
              <TouchableOpacity
                className="absolute right-3 top-1/3"
                onPress={() => setShowPass(!showPass)}>
                {showPass ? <Eye size={22} color="black" /> : <EyeCrossIcon />}
              </TouchableOpacity>
            </View>
            {errors.password && <Text className="text-[12px] text-red-500">{errors.password}</Text>}
          </View>

          {/* Confirm Password */}
          <View className="mt-5 gap-3">
            <Text className="font-lsMedium text-[20px]">Confirm Password</Text>
            <View className="relative">
              <TextInput
                secureTextEntry={!showConfirm}
                value={formData.confirmPassword}
                onChangeText={(t) => setFormData({ ...formData, confirmPassword: t })}
                placeholder="*************"
                placeholderTextColor="#809CFF"
                className="rounded-[13px] bg-[#ECF1FF] px-3 py-3 font-lsRegular text-[20px] text-[#809CFF]"
              />
              <TouchableOpacity
                className="absolute right-3 top-1/3"
                onPress={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <Eye size={22} color="black" /> : <EyeCrossIcon />}
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text className="text-[12px] text-red-500">{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Submit */}
          <View className="mx-auto mt-11 w-[258px]">
            <Button
              title="Create New Password"
              onPress={handleSubmit}
              textClassName="text-white font-lsMedium text-2xl leading-[100%] "
              className="rounded-full bg-[#2260FF] h-[45px]"
              disabled={isPending}
            />
          </View>

          {error && (
            <Text className="mt-2 text-center text-[12px] text-red-500">{error.message}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
