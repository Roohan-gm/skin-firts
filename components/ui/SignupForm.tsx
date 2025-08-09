import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { FormPasswordInput } from '@/components/ui/FormPasswordInput';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export const signUpSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.email('Invalid email').nonempty('Email is required'),
  mobile: z.string().regex(/^\d{10,}$/, 'Mobile must be 10+ digits'),
  dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use DD/MM/YYYY format'),
  password: z.string().min(6, 'Password ≥ 6 chars'),
});
export type SignUpForm = z.infer<typeof signUpSchema>;

export const SignupForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<SignUpForm>({
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<SignUpForm>>({});

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: SignUpForm) =>
      fetch('https://api.example.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((r) => r.json()),
    onSuccess: () => router.replace('/home'),
  });

  const submit = () => {
    const res = signUpSchema.safeParse(form);
    if (!res.success) {
      const e = res.error.flatten().fieldErrors;
      setErrors({
        fullName: e.fullName?.[0],
        email: e.email?.[0],
        mobile: e.mobile?.[0],
        dob: e.dob?.[0],
        password: e.password?.[0],
      });
      return;
    }
    // mutate(form);
    
      router.push('/home');
  };

  return (
    <>
      <View className="flex gap-[18px]">
        <FormInput
          label="Full name"
          placeholder="John Doe"
          value={form.fullName}
          onChangeText={(v) => setForm({ ...form, fullName: v })}
          error={errors.fullName}
        />
        <FormInput
          label="Email"
          placeholder="example@example.com"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(v) => setForm({ ...form, email: v })}
          error={errors.email}
        />
        <FormInput
          label="Mobile Number"
          placeholder="03121234832"
          keyboardType="phone-pad"
          value={form.mobile}
          onChangeText={(v) => setForm({ ...form, mobile: v })}
          error={errors.mobile}
        />
        <FormInput
          label="Date Of Birth"
          placeholder="DD / MM / YYYY"
          value={form.dob}
          onChangeText={(v) => setForm({ ...form, dob: v })}
          error={errors.dob}
        />
        <FormPasswordInput
          label="Password"
          placeholder="*************"
          value={form.password}
          onChangeText={(v) => setForm({ ...form, password: v })}
          error={errors.password}
        />
      </View>

      <Button
        title="Sign Up"
        onPress={submit}
        disabled={isPending}
        className="mx-auto mt-6 w-[207px] rounded-full bg-[#2260FF]"
        textClassName="text-white font-lsMedium text-2xl"
      />
      {error && <Text className="mt-2 text-center text-red-500">{error.message}</Text>}
    </>
  );
};