import { useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FormInput } from '@/components/ui/FormInput';
import { Button } from '@/components/ui/Button';
import { PencilIcon, SettingIcon } from '@/components/icons';
import { pickFromLibrary } from '@/utils/imagePicer';
import { ChevronLeft } from 'lucide-react-native';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  avatar: string;
}

export default function EditProfile() {
  const { user } = useLocalSearchParams<{ user: string }>();
  const parsedUser: UserData = JSON.parse(user ?? '{}');
  const [avatarUri, setAvatarUri] = useState<string>(parsedUser.avatar ?? '');

  const [form, setForm] = useState({
    name: parsedUser.name,
    email: parsedUser.email,
    phone: parsedUser.phone,
    dob: parsedUser.dob,
  });

  const router = useRouter();

  const chooseImage = async () => {
    const uri = await pickFromLibrary();
    if (uri) setAvatarUri(uri);
  };

  const handleSave = () => {
    // TODO: send { ...form, avatarUri } to your API
    router.back();
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName="px-[30px] py-[35px]">
        <View className="flex flex-row items-center justify-start gap-[81px]">
          <TouchableOpacity onPress={router.back}>
            <ChevronLeft width={24} height={24} color="#2260FF" strokeWidth={3} />
          </TouchableOpacity>
          <Text className="w-[121px] text-center font-lsSemiBold text-[24px] font-semibold leading-[100%] text-[#2260FF]">
            Profile
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            className="size-[21px] items-center justify-center rounded-full bg-[#2260FF]">
            <SettingIcon color="white" width={16} height={16} />
          </TouchableOpacity>
        </View>

        <View className="mb-[53.43px] mt-[13px] items-center">
          <View className="relative">
            <Image
              source={
                avatarUri && typeof avatarUri === 'string'
                  ? { uri: avatarUri } // remote URL / picked file
                  : require('assets/images/john-doe.png') // local asset
              }
              className="h-[107px] w-[107px] rounded-full"
            />
            <TouchableOpacity
              onPress={chooseImage}
              className="absolute -right-1 bottom-1.5 rounded-full bg-[#2260FF] p-2">
              <PencilIcon width={16} height={16} color="#CAD6FF" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="gap-[25px]">
          <FormInput
            label="Full Name"
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
          />
          <FormInput
            label="Phone Number"
            value={form.phone}
            onChangeText={(t) => setForm({ ...form, phone: t })}
            keyboardType="phone-pad"
          />
          <FormInput
            label="Email"
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
            keyboardType="email-address"
          />
          <FormInput
            label="Date of Birth"
            value={form.dob}
            onChangeText={(t) => setForm({ ...form, dob: t })}
            placeholder="DD/MM/YYYY"
          />
        </View>
        <View className="items-center">
          <Button
            title="Update Profile"
            onPress={handleSave}
            className="mt-[61px] w-[207px] rounded-full bg-[#2260FF]"
            textClassName="text-white font-lsMedium text-[24px] "
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
