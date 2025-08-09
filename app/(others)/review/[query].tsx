import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { HeartFilledIcon, HeartIcon, StarFilledIcon, StarIcon } from '@/components/icons';

export default function Review() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hearts, setHearts] = useState(0);
  const [comment, setComment] = useState('');
  const { doctor } = useLocalSearchParams();
  const doctorData = useMemo(
    () => JSON.parse(Array.isArray(doctor) ? doctor[0] : doctor),
    [doctor]
  );

  const Star = ({ filled, onPress }: { filled: boolean; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress}>
      {filled ? <StarFilledIcon width={15} height={15}/> : <StarIcon width={15} height={15}/>}
    </TouchableOpacity>
  );

  const Heart = ({ filled, onPress }: { filled: boolean; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress}>
      {filled ? <HeartFilledIcon width={13} height={13}/> : <HeartIcon width={13} height={13}/>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="flex-row items-center gap-[71px] px-[30px]">
          <TouchableOpacity onPress={router.back}>
            <ChevronLeft size={24} color="#2260FF" strokeWidth={3} />
          </TouchableOpacity>
          <Text className="w-[142px] text-center font-lsSemiBold text-[24px] text-[#2260FF]">
            Review
          </Text>
        </View>

        <View className=" py-9">
          <Text className="mt-4 px-[30px] font-lsLight text-sm leading-[140%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>

          <View className="mt-[13px]">
            <Image
              source={doctorData.avatar}
              className="mx-auto mb-[23.88px] h-[138.37648010253906px] w-[138.37648010253906px] object-contain rounded-full "
            />
            <Text className="mx-auto mb-[15px] w-[289px] font-lsMedium text-[24px] text-center text-[#2260FF]">
              {doctorData.name}
            </Text>
            <Text className="mx-auto mb-[14px] font-lsLight text-[15px]">
              {doctorData.specialty}
            </Text>
            <View className="mx-auto flex-row gap-[2px]">
              <TouchableOpacity
                onPress={() => setHearts((h) => (h ? 0 : 1))}
                className="size-[22px] items-center justify-center rounded-full bg-[#CAD6FF]">
                <Heart filled={hearts === 1} onPress={() => setHearts((h) => (h ? 0 : 1))} />
              </TouchableOpacity>
              <View className="mx-auto flex-row justify-center items-center bg-[#CAD6FF] gap-[11px] rounded-full px-[5.74px]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} filled={i <= rating} onPress={() => setRating(i)} />
                ))}
              </View>
            </View>
          </View>
          {/* TextInput */}
          <TextInput
            className="mx-[30px] mt-[16px] h-[166px] rounded-[18px] bg-[#ECF1FF] px-4 pt-3 font-lsLight text-[15px] leading-[100%] text-[#2260FF]"
            placeholder="Enter your comment here..."
            placeholderTextColor="#2260FF"
            multiline
            textAlignVertical="top"
            value={comment}
            onChangeText={setComment}
          />

          {/* Button */}
          <View className="mx-auto mt-[66px] ">
            <Button
              title="Add Review"
              onPress={async () => {
                const payload = {
                  doctorId: doctorData.id,
                  rating,
                  hearts,
                  comment,
                };
                // fake API
                console.log('POST /reviews', payload);
                await new Promise((res) => setTimeout(res, 1000)); // 1 s delay
                alert('Review saved!');
                router.back();
              }}
              className="h-[48px] rounded-full bg-[#2260FF]"
              textClassName="w-[200px] text-center text-white font-lsRegular text-[24px] leading-[100%] "
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
