import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { CommentIcon, HeartFilledIcon, StarFilledIcon } from '@/components/icons';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';
import { RightCheckIcon, CrossCheckIcon } from './../../../components/icons/index';

export default function MyAppointment() {
  const router = useRouter();
  const { doctorInfo, formData } = useLocalSearchParams();

  /* ---------- Parse the params ---------- */
  const doctor = JSON.parse(doctorInfo as string);
  const fd = JSON.parse(formData as string);

  /* ---------- Helpers ---------- */
  const displayDate = dayjs(fd.date).format('MMMM D, YYYY');
  const displayDay = dayjs(fd.date).format('ddd').toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-[30px] py-[35px]">
        {/* Header */}
        <View className="flex flex-row items-center justify-start gap-[34px]">
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft width={24} height={24} color="#2260FF" strokeWidth={3} />
          </TouchableOpacity>
          <Text className="w-[235px] text-center font-lsSemiBold text-[24px] text-[#2260FF]">
            Your appointment
          </Text>
        </View>

        {/* Card */}
        <View className="mt-4 rounded-[16px] bg-[#CAD6FF] pl-[12.42px] pr-[9px] pt-2 shadow-sm">
          <View className="flex-row gap-[10.33px]">
            <Image source={doctor.avatar} className="size-[57.24774932861328px] rounded-full" />

            <View className="flex-1">
              <View className="rounded-[13px] bg-white pb-[4px] pl-[14px] pr-[17px]">
                <Text className="font-lsMedium text-[14px] text-[#2260FF]">{doctor.name}</Text>
                <Text className="font-lsLight text-[12px] text-black">{doctor.specialty}</Text>
              </View>

              <View className="mb-[5px] mt-1 flex-row items-center justify-between">
                {/* Rating / Comments */}
                <View className="flex-row gap-[6px]">
                  <View className="flex h-[18px] flex-row items-center rounded-[13px] bg-white px-[6px]">
                    <StarFilledIcon />
                    <Text className="ml-[5.29px] w-[20px] font-lsLight text-[12px] text-[#2260FF]">
                      {doctor.rating}
                    </Text>
                  </View>
                  <View className="flex h-[18px] flex-row items-center rounded-[13px] bg-white px-[6px]">
                    <CommentIcon />
                    <Text className="ml-[5.29px] w-[21px] font-lsLight text-[12px] text-[#2260FF]">
                      {doctor.comment}
                    </Text>
                  </View>
                </View>

                {/* Icons */}
                <View className="flex-row gap-1">
                  <View className="size-[19px] items-center justify-center rounded-full bg-white">
                    <HeartFilledIcon width={13} height={13} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="my-4 h-[1px] bg-[#2260FF]" />
        <View className="mt-1  justify-between py-4">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="rounded-full bg-[#2260FF] py-1 pl-[15px] pr-[37px] font-lsMedium text-[14px] text-white">
              {displayDate}
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="h-[26.220338821411133px] w-[26.220338821411133px] items-center justify-center rounded-full bg-[#2260FF]">
                <RightCheckIcon color="#fff" height={16} width={16} />
              </View>
              <View className="h-[26.220338821411133px] w-[26.220338821411133px] items-center justify-center rounded-full bg-[#2260FF]">
                <CrossCheckIcon color="#fff" height={16} width={16} />
              </View>
            </View>
          </View>
          <View>
            <Text className="pl-[15px] font-lsLight text-[12px] text-black">
              {displayDay}, {fd.time}
            </Text>
          </View>
        </View>
        {/* Divider */}
        <View className="my-4 h-[1px] bg-[#2260FF]" />

        {/* Appointment Details */}
        <View className="mt-3 gap-2 px-[20px]">
          <View className="flex-row items-center justify-between">
            <Text className="font-lsLight text-[12px] text-black">Booking For </Text>
            <Text className='font-lsMedium text-[12px]'>{fd.forWhom === 'yourself' ? 'Yourself' : 'Another Person'}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-lsLight text-[12px] text-black">Full Name </Text>
            <Text className='font-lsMedium text-[12px]'>{fd.name}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-lsLight text-[12px] text-black">Age </Text>
            <Text className='font-lsMedium text-[12px]'>{fd.age}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-lsLight text-[12px] text-black">Gender </Text>
            <Text className='font-lsMedium text-[12px]'>{fd.gender}</Text>
          </View>
        </View>
        <View className="my-4 h-[1px] bg-[#2260FF]" />
        <View className="mt-3 gap-2 px-[20px]">
          <Text className="font-lsLight text-[12px]">Problem</Text>
          <Text className="font-lsMedium text-[12px] text-black">{fd.problem}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
