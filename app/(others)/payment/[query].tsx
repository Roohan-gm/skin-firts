import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import dayjs from 'dayjs';
import { ChevronLeft } from 'lucide-react-native';
import { CommentIcon, ProfessionalIcon, StarFilledIcon } from '@/components/icons';

export default function PaymentScreen() {
  const router = useRouter();
  const { doctorInfo, formData } = useLocalSearchParams<{
    doctorInfo: string;
    formData: string;
  }>();

  /* ---------- Parse ---------- */
  const doctor = JSON.parse(doctorInfo!);
  const fd = JSON.parse(formData!);

  /* ---------- Helpers ---------- */
  const displayDate = dayjs(fd.date).format('MMMM D, YYYY');
  const displayTime = fd.time;

  /* ---------- Dummy values ---------- */
  const duration = 30; // minutes
  const fee = 100; // USD

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName=" py-6">
        {/* Header */}
        <View className="bg-[#2260FF] px-[30px] pb-[51px] pt-[32px]">
          <View className=" mb-[55px] flex-row items-center gap-[29px] ">
            <TouchableOpacity onPress={router.back} className="mr-4">
              <ChevronLeft size={24} color="#fff" strokeWidth={2.5} />
            </TouchableOpacity>
            <Text className="w-[226px] text-center font-lsSemiBold text-[24px] text-white">
              Payment
            </Text>
          </View>
          <Text className="mx-auto w-[223px] text-center font-lsBold text-[40px] text-white">
            ${fee}.00
          </Text>
        </View>

        {/* Doctor Card */}
        <View className="mx-[30px] mt-[25px] flex-row items-center rounded-2xl p-4">
          <Image source={doctor.avatar} className="mr-[14px] h-[84px] w-[84px] rounded-full" />
          <View className="flex-1">
            <View className="flex-row justify-between">
              <View>
                <Text className="font-lsMedium text-[16px] text-[#2260FF]">{doctor.name}</Text>
                <Text className="font-lsLight text-[14px] text-black">{doctor.specialty}</Text>
              </View>
              <View className="h-[24.7093505859375px] w-[24.7093505859375px] items-center justify-center rounded-full bg-[#2260FF] ">
                <ProfessionalIcon color="#fff" />
              </View>
            </View>
            <View className="mt-[7px] flex flex-row gap-[5px] ">
              <View className="flex flex-row items-center  rounded-[13px] bg-[#CAD6FF] px-[6px] py-1">
                <StarFilledIcon />
                <Text className="ml-[5.29px] w-[20px] font-lsLight text-[12px] leading-[100%] text-[#2260FF]">
                  {doctor.rating}
                </Text>
              </View>
              <View className="flex flex-row items-center rounded-[13px] bg-[#CAD6FF] px-[6px] py-1">
                <CommentIcon />
                <Text className="ml-[5.29px] w-[21px] font-lsLight text-[12px] leading-[100%] text-[#2260FF] ">
                  {doctor.comment}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="mx-[30px] my-6 h-px bg-[#2260FF]" />

        {/* Details */}

        <View className="mx-[30px] mt-6 space-y-4">
          <Row label="Date / Hour" value={`${displayDate} / ${displayTime}`} />
          <Row label="Duration" value={`${duration} Minutes`} />
          <Row
            label="Booking for"
            value={fd.forWhom === 'yourself' ? 'Yourself' : 'Another Person'}
          />
        </View>

        {/* Divider */}
        <View className="mx-[30px] my-6 h-px bg-[#2260FF]" />

        {/* Price */}
        <View className="mx-[30px]  space-y-2">
          <Row label="Amount" value={`$${fee}.00`} />
          <Row label="Duration" value={`${duration} Minutes`} />
          <Row label="Total" value={`$${fee}.00`} bold />
        </View>

        {/* Divider */}
        <View className="mx-[30px] my-6  h-px bg-[#2260FF]" />

        {/* Payment Method */}
        <View className="mx-[30px] flex-row items-center justify-between">
          <Text className="text-13px] font-lsRegular  text-[#2260FF]">Payment Method</Text>
          <View className="flex-row items-center gap-2">
            <Text className="font-lsMedium text-[13px]">Card </Text>
            <TouchableOpacity>
              <Text className="font-lsRegular text-[14px] text-[#2260FF]">Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pay Now */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/payment-success/[query]',
              params: {
                query: 'appointment',
                doctorInfo: JSON.stringify(doctor),
                formData: JSON.stringify(fd),
              },
            })
          }
          className="mx-[30px] mt-8 rounded-full bg-[#2260FF] py-4">
          <Text className="text-center font-lsMedium text-[24px] text-white">Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Reusable row ---------- */
function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View className="flex-row justify-between">
      <Text className="font-lsRegular text-[13px] text-[#2260FF]">{label}</Text>
      <Text className={`text-[13px] ${bold ? 'font-lsBold' : 'font-lsMedium '}`}>{value}</Text>
    </View>
  );
}
