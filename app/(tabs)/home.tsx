import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BellIcon,
  CategoriesIcon,
  CommentIcon,
  DoctorIcon,
  HeartFilledIcon,
  HeartIcon,
  MagnifinglassIcon,
  SettingIcon,
  StarFilledIcon,
} from '@/components/icons';
import ScheduleCard from '@/components/ui/ScheduleCard';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const doctorList = [
  {
    id: 1,
    name: 'Dr. Olivia Turner, M.D.',
    specialty: 'Dermato-Endocrinology',
    rating: 5,
    comment: 60,
    avatar: require('../../assets/images/olivia-turner.png'),
  },
  {
    id: 2,
    name: 'Dr. Alexander Bennett, Ph.D.',
    specialty: 'Dermato-Genetics',
    rating: 4.5,
    comment: 40,
    avatar: require('../../assets/images/alexander-bennett.png'),
  },
  {
    id: 3,
    name: 'Dr. Sophia Martinez, Ph.D.',
    specialty: 'Cosmetic Bioengineering',
    rating: 5,
    comment: 150,
    avatar: require('../../assets/images/sophia-martinez.png'),
  },
  {
    id: 4,
    name: 'Dr. Michael Davidson, M.D.',
    specialty: 'Nano-Dermatology',
    rating: 4.8,
    comment: 90,
    avatar: require('../../assets/images/michael-davidson.png'),
  },
];

const DoctorCard = ({ avatar, name, specialty, rating, comment }: (typeof doctorList)[0]) => (
  <View className="mb-2 rounded-[16px] bg-[#CAD6FF] pl-[12.42px] pr-[9px] pt-2 shadow-sm ">
    <View className="flex-row gap-[10.33px]">
      <Image source={avatar} className="size-[57.24774932861328px] rounded-full" />
      <View className="flex-1">
        <View className=" pt=[9px] rounded-[13px] bg-white pb-[4px] pl-[14px] pr-[17px]">
          <Text className="font-lsMedium text-[14px] leading-[100%] text-[#2260FF]">{name}</Text>
          <Text className="font-lsLight text-[12px] leading-[100%] text-black">{specialty}</Text>
        </View>
        <View className="mb-[5px] mt-1 flex-row items-center justify-between">
          <View className="flex flex-row gap-[6px]">
            <View className="flex h-[18px] flex-row  items-center rounded-[13px] bg-white px-[6px]">
              <StarFilledIcon />
              <Text className="ml-[5.29px] w-[20px] font-lsLight text-[12px] leading-[100%] text-[#2260FF]">
                {rating}
              </Text>
            </View>
            <View className="flex h-[18px] flex-row items-center rounded-[13px] bg-white px-[6px]">
              <CommentIcon />
              <Text className="ml-[5.29px] w-[21px] font-lsLight text-[12px] leading-[100%] text-[#2260FF] ">
                {comment}
              </Text>
            </View>
          </View>
          <View className="flex flex-row gap-1">
            <View className="size-[19px] items-center justify-center rounded-full bg-white">
              <AntDesign name="question" size={13} color="#2260FF" />
            </View>
            <View className="size-[19px] items-center justify-center rounded-full bg-white">
              <HeartFilledIcon />
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <ScrollView className="py-[13.29px]">
        <View className="flex flex-row justify-between px-[32px]">
          <View className="flex flex-row items-center gap-[10.25px]">
            <Image
              source={require('assets/images/john-doe.png')}
              className="h-[40.97261047363281px] w-[40.75225067138672px] rounded-full"
            />
            <View>
              <Text className="font-lsLight text-[12px] leading-[100%] text-[#2260FF]">
                Hi, Welcome Back
              </Text>
              <Text className="font-lsRegular text-[14px] leading-[100%] text-[#000000]">
                John Doe
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/notification')}
            className="mt-[26px] flex flex-row items-center gap-1">
            <View className="flex size-6 flex-row items-center justify-center rounded-full bg-[#CAD6FF]">
              <BellIcon width={14} height={17} />
            </View>
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              className="flex size-6 flex-row items-center justify-center rounded-full bg-[#CAD6FF]">
              <SettingIcon width={17} height={17} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View className="mt-[22.06px] flex-row gap-3 px-[30px]">
          <View className="flex flex-row gap-[9px]">
            <TouchableOpacity
              onPress={() => router.push('/sort-by')}
              className="flex items-center justify-center">
              <DoctorIcon width={15} height={18} />
              <Text className="font-lsLight text-[12px] leading-[100%] text-[#2260FF]">
                Doctors
              </Text>
            </TouchableOpacity>
            <View className="flex items-center justify-center">
              <HeartIcon width={15} height={17} />
              <Text className="font-lsLight text-[12px] leading-[100%] text-[#2260FF]">
                Favorite
              </Text>
            </View>
          </View>
          <View className="flex h-[33px] flex-1 flex-row items-center justify-between rounded-full bg-[#CAD6FF] pr-[7px]">
            <View className="ml-[3px] flex size-[26px] items-center justify-center rounded-full bg-white">
              <CategoriesIcon />
            </View>
            <MagnifinglassIcon width={15} height={18} />
          </View>
        </View>
        <ScheduleCard />

        <View className="mx-[30px] my-[15px]">
          {doctorList.map((doc) => (
            <DoctorCard key={doc.id} {...doc} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
