import { ArrowRightIcon, KeyIcon, BulbIcon, PersonIcon } from '@/components/icons';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Settings = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-[30px] py-[35px]">
          <View className="flex flex-row items-center justify-start gap-[81px]">
            <TouchableOpacity onPress={router.back}>
              <ChevronLeft width={24} height={24} color="#2260FF" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="w-[121px] text-center font-lsSemiBold text-[24px] font-semibold leading-[100%] text-[#2260FF]">
              Settings
            </Text>
          </View>

          <View className="flex-1">
            <View className="mt-10 flex">
              <TouchableOpacity
                onPress={() => router.push('/notification-settings')}
                className="mb-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-[21px] size-[40px] items-center justify-center  ">
                    <BulbIcon color={'#2260FF'} width={23} height={20} />
                  </View>
                  <Text className="font-lsRegular text-[20px] leading-[100%] text-black">
                    Notification Setting
                  </Text>
                </View>
                <ArrowRightIcon color="#2260FF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/password-manager')}
                className="mb-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-[21px] size-[40px] items-center justify-center ">
                    <KeyIcon
                      color={'#2260FF'}
                      width={21.904762268066406}
                      height={19.047618865966797}
                    />
                  </View>
                  <Text className="font-lsRegular text-[20px] leading-[100%] text-black">
                    Password Manager
                  </Text>
                </View>
                <ArrowRightIcon color="#2260FF" />
              </TouchableOpacity>

              <TouchableOpacity className="mb-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-[21px] size-[40px] items-center justify-center">
                    <PersonIcon color={'#2260FF'} />
                  </View>
                  <Text className="font-lsRegular text-[20px] leading-[100%] text-black">
                    Delete Account
                  </Text>
                </View>
                <ArrowRightIcon color="#2260FF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
