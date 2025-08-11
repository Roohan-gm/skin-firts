import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CheckCircle2, ChevronLeft } from 'lucide-react-native'; // ✅ green check icon
import dayjs from 'dayjs';
import { CalendarIcon, ClockIcon } from '@/components/icons';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const { doctorInfo, formData } = useLocalSearchParams<{
    doctorInfo: string;
    formData: string;
  }>();

  /* ---------- Parse ---------- */
  const doctor = JSON.parse(doctorInfo!);
  const fd = JSON.parse(formData!);

  const displayDate = dayjs(fd.date).format('MMMM D, YYYY');
  const displayTime = fd.time;

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#2260FF] px-[30px] ">
      <ScrollView contentContainerClassName="flex-1 items-center justify-center">
        
          
       
        {/* Icon */}
        <CheckCircle2 size={172} color="#fff" strokeWidth={2} />

        {/* Heading */}
        <Text className="mt-[32px] text-center font-lsRegular text-[40px] text-white">
          Congratulation
        </Text>
        <Text className="mt-[14px] text-center font-lsMedium  text-[24px] text-white">
          Payment is Successfully
        </Text>

        {/* Sub-text */}
        <View className="mt-[64px] rounded-[20px] border border-white px-[14px] py-[25px]">
          <Text className=" text-center font-lsLight text-[16px] text-white">
            You have successfully booked an appointment with
          </Text>
          <Text className="mt-[22px] text-center font-lsBlack text-[20px] text-white">
            {doctor.name}
          </Text>

          {/* Date & Time */}
          <View className="mt-[10px] flex-row items-center justify-center gap-[16px]">
            <View className="flex-row items-center gap-[6px]">
              <CalendarIcon color="#fff" size={18} />
              <Text className="font-lsMedium text-[13px] text-white">{displayDate}</Text>
            </View>

            <View className="flex-row items-center gap-[6px]">
              <ClockIcon color="#fff" width={18} height={18} />
              <Text className="font-lsMedium text-[13px] text-white">{displayTime}</Text>
            </View>
          </View>
        </View>

        {/* Done button */}
        <TouchableOpacity
          className="absolute bottom-10 mx-auto w-full max-w-[280px] rounded-full bg-white py-4"
          onPress={() => router.replace('/home')} // ← or any home route
        >
          <Text className="text-center font-lsMedium text-[18px] text-[#2260FF]">Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
