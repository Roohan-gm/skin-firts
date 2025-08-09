import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { RadioItem } from '@/components/ui/Radio';

const reasons = ['Rescheduling', 'Weather Conditions', 'Unexpected Work', 'Others'];

export default function Cancel() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [otherReason, setOtherReason] = useState('');
  const { doctorId, scheduleId } = useLocalSearchParams(); //

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="px-[30px]">
        <View className="flex-row items-center gap-[23px]">
          <TouchableOpacity onPress={router.back}>
            <ChevronLeft size={24} color="#2260FF" strokeWidth={3} />
          </TouchableOpacity>
          <Text className="w-[238px] text-center font-lsSemiBold text-[24px] text-[#2260FF]">
            Cancel Appointment
          </Text>
        </View>

        <View className=" py-9">
          <Text className="mt-4 font-lsLight text-sm leading-[140%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>

          {/* Radio list */}
          <View className="mt-[21px]">
            {reasons.map((r, idx) => (
              <RadioItem
                key={r}
                label={r}
                selected={selectedIndex === idx}
                onPress={() => setSelectedIndex(idx)}
              />
            ))}
          </View>
          {/* Note */}
          <Text className="mb-3 font-lsLight text-sm text-[#809CFF]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>

          {/* TextInput */}
          <TextInput
            className="h-[166px] rounded-[18px] bg-[#ECF1FF] px-4 pt-3 font-lsLight text-[15px] leading-[100%] text-[#2260FF]"
            placeholder="Enter your reason here..."
            placeholderTextColor="#2260FF"
            multiline
            textAlignVertical="top"
            value={otherReason}
            onChangeText={setOtherReason}
          />

          {/* Button */}
          <View className="mx-[30px] mt-8 ">
            <Button
              title="Cancel Appointment"
              onPress={() => {
                // 1. Build the full reason
                const radioReason = reasons[selectedIndex];
                const fullReason =
                  radioReason === 'Others'
                    ? otherReason.trim() || 'Others'
                    : `${radioReason}${otherReason ? `: ${otherReason.trim()}` : ''}`;

                // 2. Send everything back
                router.replace({
                  pathname: '/(tabs)/appointment',
                  params: {
                    deleteDoctorId: doctorId,
                    deleteScheduleId: scheduleId,
                    reason: fullReason, 
                  },
                });
              }}
              className="h-[48px] rounded-full bg-[#2260FF]"
              textClassName="text-white font-lsRegular text-[24px] leading-[100%] "
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
