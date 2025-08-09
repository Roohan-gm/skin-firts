import { Button } from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye } from 'lucide-react-native';
import { useState } from 'react';
import { EyeCrossIcon } from '@/components/icons';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

//  Schema: password + confirm-password
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

// PasswordField component
interface PasswordFieldProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  show: boolean;
  toggle: () => void;
}
const PasswordField = ({ label, value, onChangeText, show, toggle }: PasswordFieldProps) => (
  <View className="gap-3">
    <Text className="font-lsMedium text-[20px]">{label}</Text>
    <View className="relative">
      <TextInput
        secureTextEntry={!show}
        value={value}
        onChangeText={onChangeText}
        placeholder="*************"
        placeholderTextColor="#809CFF"
        className="rounded-[13px] bg-[#ECF1FF] px-3 py-3 font-lsRegular text-[20px] text-[#809CFF]"
      />
      <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2" onPress={toggle}>
        {show ? <Eye size={22} color="black" /> : <EyeCrossIcon />}
      </TouchableOpacity>
    </View>
  </View>
);

export default function PasswordManager() {
  const router = useRouter();

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);

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
              Password Manager
            </Text>
          </View>

          {/* Current Password */}
          <View className="mt-[45px] mb-[19px] gap-3">
            <Text className="font-lsMedium text-[20px] font-medium leading-[100%]">
              Current Password
            </Text>
            <View className="relative">
              <TextInput
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                placeholder="*************"
                placeholderTextColor={'#809CFF'}
                className="font-regular rounded-[13px] bg-[#ECF1FF] px-[13px] align-middle font-lsRegular text-[20px] leading-[100%] text-[#809CFF]"
                secureTextEntry={!showNew}
              />
              <TouchableOpacity
                className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                onPress={() => setShowCurrent(!showNew)}>
                {showCurrent ? <Eye size={22} color="black" /> : <EyeCrossIcon />}
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

          <View className="gap-[26px]">
            {/* New Password */}
            <PasswordField
              label="New Password"
              value={formData.password}
              onChangeText={(t) => setFormData({ ...formData, password: t })}
              show={showNew}
              toggle={() => setShowNew(!showNew)}
            />
            {errors.password && <Text className="text-[12px] text-red-500">{errors.password}</Text>}

            {/* Confirm New Password */}
            <PasswordField
              label="Confirm New Password"
              value={formData.confirmPassword}
              onChangeText={(t) => setFormData({ ...formData, confirmPassword: t })}
              show={showConfirm}
              toggle={() => setShowConfirm(!showConfirm)}
            />
            {errors.confirmPassword && (
              <Text className="text-[12px] text-red-500">{errors.confirmPassword}</Text>
            )}
          </View>
          {/* Submit */}
          <Button
            title="Change Password"
            onPress={handleSubmit}
            textClassName="text-white font-lsMedium text-2xl leading-[100%] "
            className="mt-[262px] h-[45px] rounded-full bg-[#2260FF]"
            disabled={isPending}
          />

          {error && (
            <Text className="mt-2 text-center text-[12px] text-red-500">{error.message}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
