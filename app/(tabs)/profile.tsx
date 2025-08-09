import {
  ArrowRightIcon,
  WalletIcon,
  HeartIcon,
  PencilIcon,
  PersonIcon,
  LockIcon,
  SettingIcon,
  LogoutIcon,
} from '@/components/icons';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  dob: string;
}

const Profile = () => {
  const router = useRouter();

  // Mock user data object
  const user: UserData = {
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: require('assets/images/john-doe.png'),
    phone: '+1 234 567 8900',
    dob: '15-11-2001',
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleLogout = () => {
    // Perform logout logic here
    console.log('Logging out...');
    router.replace('/sign-in'); // Redirect to home screen after logout
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
              My Profile
            </Text>
          </View>

          <View className="flex-1">
            {/* Profile Section */}
            <View className="mt-[13px] items-center">
              <View className="relative">
                <Image
                  source={
                    typeof user.avatar === 'string'
                      ? { uri: user.avatar } // remote URL
                      : user.avatar // local require(...)
                  }
                  className="h-[106.57317352294922px] w-[106px] rounded-full"
                />
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/edit/query',
                      params: { user: JSON.stringify(user) },
                    })
                  }
                  className="absolute -right-1 bottom-1.5 rounded-full bg-[#2260FF] p-2">
                  <PencilIcon width={16} height={16} color="#CAD6FF" />
                </TouchableOpacity>
              </View>
              <Text className="mt-[16.43px] font-lsSemiBold text-[24px] leading-[100%]">
                {user.name}
              </Text>
            </View>

            <View className="mt-10 flex">
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/profile')}
                className="mb-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-[21px] size-[40px] items-center justify-center rounded-full bg-[#CAD6FF]">
                    <PersonIcon color={'#2260FF'} />
                  </View>
                  <Text className="font-lsRegular text-[20px] leading-[100%] text-black">
                    Profile
                  </Text>
                </View>
                <ArrowRightIcon />
              </TouchableOpacity>

              <TouchableOpacity className="mb-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-[21px] size-[40px] items-center justify-center rounded-full bg-[#CAD6FF]">
                    <HeartIcon color={'#2260FF'} width={23} height={20} />
                  </View>
                  <Text className="font-lsRegular text-[20px] leading-[100%] text-black">
                    Favorite
                  </Text>
                </View>
                <ArrowRightIcon />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/payment-method')}
                className="mb-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-[21px] size-[40px] items-center justify-center rounded-full bg-[#CAD6FF]">
                    <WalletIcon
                      color={'#2260FF'}
                      width={21.904762268066406}
                      height={19.047618865966797}
                    />
                  </View>
                  <Text className="font-lsRegular text-[20px] leading-[100%] text-black">
                    Payment Method
                  </Text>
                </View>
                <ArrowRightIcon />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/privacy-policy')}
                className="mb-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-[21px] size-[40px] items-center justify-center rounded-full bg-[#CAD6FF]">
                    <LockIcon
                      color={'#2260FF'}
                      width={18.095237731933594}
                      height={20.952381134033203}
                    />
                  </View>
                  <Text className="font-lsRegular text-[20px] leading-[100%] text-black">
                    Privacy Policy
                  </Text>
                </View>
                <ArrowRightIcon />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/settings')}
                className="mb-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-[21px] size-[40px] items-center justify-center rounded-full bg-[#CAD6FF]">
                    <SettingIcon
                      color={'#2260FF'}
                      width={23.809524536132812}
                      height={23.809524536132812}
                    />
                  </View>
                  <Text className="font-lsRegular text-[20px] leading-[100%] text-black">
                    Settings
                  </Text>
                </View>
                <ArrowRightIcon />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/help-center')}
                className="mb-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-[21px] size-[40px] items-center justify-center rounded-full bg-[#CAD6FF]">
                    <AntDesign name="question" size={24} color="#2260FF" />
                  </View>
                  <Text className="font-lsRegular text-[20px] leading-[100%] text-black">Help</Text>
                </View>
                <ArrowRightIcon />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleModal}
                className="mb-[16px] flex-row items-center justify-start">
                <View className="mr-[21px] size-[40px] items-center justify-center rounded-full bg-[#CAD6FF]">
                  <LogoutIcon color={'#2260FF'} />
                </View>
                <Text className="font-lsRegular text-[20px] leading-[100%] text-black">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 justify-end bg-[#2260FF8A] bg-opacity-50">
            <View className="rounded-t-[27px] bg-white p-5">
              <Text className="mb-[21px] text-center font-lsMedium text-[24px] text-[#2260FF]">
                Logout
              </Text>
              <Text className="mb-[16px] text-center font-lsRegular text-[16px]">
                are you sure you want to log out?
              </Text>
              <View className="mx-[30px] mb-[20px] flex-row items-center justify-between gap-[11px]">
                <TouchableOpacity
                  className="h-[41px] rounded-full bg-[#CAD6FF] px-[29px] py-[6px]"
                  onPress={() => setModalVisible(false)}>
                  <Text className="w-[86px] text-center font-lsMedium text-[20px] text-[#2260FF]">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="h-[41px] rounded-full bg-[#2260FF] px-[19px] py-[6px]"
                  onPress={handleLogout}>
                  <Text className="text-center font-lsMedium text-[20px] text-white">
                    Yes, Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
