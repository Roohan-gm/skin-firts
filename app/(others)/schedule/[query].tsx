import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  CalendarIcon,
  CallIcon,
  ChatIcon,
  ClockIcon,
  CommentIcon,
  HeartFilledIcon,
  ProfessionalIcon,
  StarFilledIcon,
  VideoCallIcon,
} from '@/components/icons';
import { ChevronLeft } from 'lucide-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import CalendarStrip from '@/utils/calendar';

type UserData = {
  id: number;
  name: string;
  specialty: string;
  gender: 'male' | 'female';
  rating: number;
  comment: number;
  experience?: string;
  avatar: any;
  schedules: { id: number; date: string; time: string }[];
};

export default function Schedule() {
  const [pickedDate, setPickedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const { doctorInfo } = useLocalSearchParams<{ doctorInfo: string }>();
  const parsedUser = useMemo<UserData>(
    () =>
      doctorInfo
        ? JSON.parse(doctorInfo)
        : {
            id: 0,
            name: 'Unknown Doctor',
            specialty: 'Unknown Specialty',
            gender: 'male',
            rating: 0,
            comment: 0,
            avatar: null,
            schedules: [],
          },
    [doctorInfo]
  );

  const router = useRouter();

  useEffect(() => {
    if (!doctorInfo) {
      router.replace('/some-default-route');
    }
  }, [doctorInfo, router]);

  // Validate avatar to ensure it's a string
  const avatarSource =
    typeof parsedUser.avatar === 'string' && parsedUser.avatar
      ? { uri: parsedUser.avatar }
      : (parsedUser.avatar ?? require('@/assets/images/doctor.png'));

  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName=" py-[35px]">
        <View className="flex flex-row items-center justify-start px-[30px]">
          <TouchableOpacity onPress={router.back}>
            <ChevronLeft width={24} height={24} color="#2260FF" strokeWidth={3} />
          </TouchableOpacity>
          <View className="ml-[14px] flex-1 flex-row items-center justify-between gap-[10px]">
            <View className="flex-row gap-1">
              <TouchableOpacity
                onPress={() => {}}
                className=" flex-row items-center gap-[7px] rounded-full bg-[#2260FF] px-2 py-1">
                <CalendarIcon size={12} color={'#ffffff'} />
                <Text className="font-lsLight text-[12px] text-white">Schedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // Implement functionality
                }}
                className="size-[21px] items-center justify-center rounded-full bg-[#2260FF] ">
                <CallIcon color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // Implement functionality
                }}
                className="size-[21px] items-center justify-center rounded-full bg-[#2260FF] ">
                <VideoCallIcon color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // Implement functionality
                }}
                className="size-[21px] items-center justify-center rounded-full bg-[#2260FF] p-2">
                <ChatIcon size={13} color={'#ffffff'} />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-[2px]">
              <TouchableOpacity
                onPress={() => {
                  // Implement functionality
                }}
                className="size-[21px] items-center justify-center rounded-full bg-[#CAD6FF] ">
                <AntDesign name="question" size={14} color="#2260FF" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // Implement functionality
                }}
                className="size-[21px] items-center justify-center rounded-full bg-[#CAD6FF] ">
                <HeartFilledIcon width={14} height={14} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mx-[30px] mt-[20px] items-center justify-between gap-[14px] rounded-[17px] bg-[#CAD6FF] px-[21px] py-[18px]">
          <View className="mb-[14px] flex-row items-center gap-[9.37px]">
            <Image
              source={avatarSource}
              className="h-[140px] w-[139.24705505371094px] rounded-full"
            />
            <View className="flex-1  gap-[6px]">
              <View className="flex-row items-center gap-[6px] rounded-full bg-[#2260FF] px-1 py-1 ">
                <View className="size-[21px] items-center justify-center rounded-full bg-[#CAD6FF]">
                  <ProfessionalIcon color="#2260FF" />
                </View>
                <View>
                  <Text className="font-lsRegular text-[12px] leading-[100%] text-white">
                    15 years
                  </Text>
                  <Text className="font-lsLight text-[12px] leading-[100%] text-white">
                    experience
                  </Text>
                </View>
              </View>
              <Text className=" rounded-[18px] bg-[#2260FF] p-3 font-lsLight text-[12px] leading-[100%] text-white">
                <Text className="font-lsSemiBold">Focus:</Text> The impact of hormonal imbalances on
                skin conditions, specializing in acne, hirsutism, and other skin disorders.
              </Text>
            </View>
          </View>
          <View className="w-full items-center justify-center rounded-[13px] bg-white px-[10px] py-[5px] text-center">
            <Text className="font-lsMedium text-[15px] text-[#2260FF]">{parsedUser.name}</Text>
            <Text className="font-lsLight text-[13px]">{parsedUser.specialty}</Text>
          </View>
          <View className="w-full  flex-row items-center justify-between gap-[10px]">
            <View className="flex flex-row gap-[5px]">
              <View className="flex flex-row items-center  rounded-[13px] bg-white px-[6px] py-1">
                <StarFilledIcon />
                <Text className="ml-[5.29px] w-[20px] font-lsLight text-[12px] leading-[100%] text-[#2260FF]">
                  {parsedUser.rating}
                </Text>
              </View>
              <View className="flex flex-row items-center rounded-[13px] bg-white px-[6px] py-1">
                <CommentIcon />
                <Text className="ml-[5.29px] w-[21px] font-lsLight text-[12px] leading-[100%] text-[#2260FF] ">
                  {parsedUser.comment}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-center rounded-full bg-white px-[5px] py-1">
              <ClockIcon />
              <Text className="ml-[5px] font-lsLight text-[12px] text-[#2260FF]">
                Mon-Sat / {parsedUser.schedules[0]?.time}
              </Text>
            </View>
          </View>
        </View>

        <View className="mx-[30px]">
          <Text className="mt-[34px] font-lsMedium text-[14px] text-[#2260FF]">Profile</Text>
          <Text className="font-lsLight text-[12px] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </View>
        <View className="mt-[20px] h-full w-full bg-[#CAD6FF] px-[30px] ">
          <CalendarStrip selected={pickedDate} onSelect={setPickedDate} doctor={parsedUser} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
