import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import {
  CallIcon,
  VideoCallIcon,
  ChatIcon,
  HeartFilledIcon,
  ArroWDownIcon,
} from '@/components/icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { z } from 'zod';

dayjs.extend(isToday);

// Zod Schema for form validation
const formSchema = z.object({
  forWhom: z.enum(['yourself', 'other']),
  name: z.string().min(1, 'Full name is required'),
  age: z.string().regex(/^\d+$/, 'Age must be a number').min(1, 'Age is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  problem: z.string().min(1, 'Problem description is required'),
  time: z.string().min(1, 'Time is required'),
  date: z.string().min(1, 'Date is required'),
});


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

const times = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
];

export default function ScheduleDetails() {
  const { doctorInfo } = useLocalSearchParams<{ doctorInfo: string }>();
  const router = useRouter();

  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const doctor = useMemo<UserData>(() => (doctorInfo ? JSON.parse(doctorInfo) : {}), [doctorInfo]);

  /* ---------- states ---------- */
  const [current, setCurrent] = useState(dayjs());
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [time, setTime] = useState<string | null>(null);
  const [forWhom, setForWhom] = useState<'yourself' | 'other'>('yourself');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [problem, setProblem] = useState('');

  /* ---------- Form submission ---------- */
 const handleContinue = () => {
  const payload = {
    forWhom,
    name,
    age,
    gender,
    problem,
    time: time!,
    date,
  };

  const result = formSchema.safeParse(payload);

  if (result.success) {
    router.push({
      pathname: '/my-appointment/[query]',
      params: {
        doctorInfo: JSON.stringify(doctor),
        formData: JSON.stringify(result.data),
      },
    });
  } else {
    /* ZodError.errors is the correct field */
    const messages = result.error.issues.map((issue) => issue.message).join('\n');
    alert(messages);
  }
};

  /* ---------- render ---------- */
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="py-[35px]">
        {/* Header */}
        <View className="flex flex-row items-center justify-start px-[30px]">
          <TouchableOpacity onPress={router.back}>
            <ChevronLeft width={24} height={24} color="#2260FF" strokeWidth={3} />
          </TouchableOpacity>
          <View className="ml-[14px] flex-1 flex-row items-center justify-between gap-[10px]">
            <View className="flex-row gap-1">
              <TouchableOpacity
                onPress={() => {}}
                className=" flex-row items-center gap-[7px] rounded-full bg-[#2260FF] px-2 py-1">
                <Text className="font-lsLight text-[12px] text-white">{doctor.name}</Text>
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

        {/* ---------- Calendar ---------- */}
        <View className="mt-[20px] bg-[#CAD6FF] px-[30px] py-[15px]">
          {/* Month + dropdown arrow */}
          <View className="mb-3 flex-row items-center gap-4">
            <Text className="font-lsMedium text-[14px] text-[#2260FF]">
              {current.format('MMMM YYYY')}
            </Text>
            <TouchableOpacity onPress={() => setShowMonthPicker(!showMonthPicker)}>
              <ArroWDownIcon color="#2260FF" width={16} height={16} />
            </TouchableOpacity>
          </View>

          {/* Month dropdown */}
          {showMonthPicker && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2 max-h-16">
              {Array.from({ length: 12 }, (_, i) => {
                const m = dayjs().month(i);
                return (
                  <TouchableOpacity
                    key={i}
                    className={`mx-1 rounded-full px-3 py-1 ${
                      m.month() === current.month() ? 'bg-[#2260FF]' : 'bg-white'
                    }`}
                    onPress={() => {
                      setCurrent(m);
                      setShowMonthPicker(false);
                    }}>
                    <Text
                      className={`text-xs ${
                        m.month() === current.month() ? 'text-white' : 'text-[#2260FF]'
                      }`}>
                      {m.format('MMM')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          {/* Single horizontal row of 6 days */}
          <View className="mb-2 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => setDate(dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'))}>
              <Text className="text-2xl text-[#2260FF]">‹</Text>
            </TouchableOpacity>

            {useMemo(() => {
              /* start 3 days before today, total 6 days */
              const start = dayjs(date).subtract(2, 'day');
              return Array.from({ length: 6 }, (_, i) => start.add(i, 'day'));
            }, [date]).map((item) => {
              const iso = item.format('YYYY-MM-DD');
              const isSelected = iso === date;
              return (
                <TouchableOpacity
                  key={iso}
                  className="h-[60.586666107177734px] w-[37.86666488647461px] items-center justify-center rounded-full"
                  style={{
                    backgroundColor: isSelected ? '#2260FF' : 'white',
                  }}
                  onPress={() => setDate(iso)}>
                  <Text
                    className={`font-lsMedium text-[24px] ${
                      isSelected ? 'text-white' : 'text-[#809CFF]'
                    }`}>
                    {item.date()}
                  </Text>
                  <Text
                    className={`font-lsLight text-[12px] ${
                      isSelected ? 'text-white' : 'text-[#A9BCFE]'
                    }`}>
                    {item.format('ddd').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              onPress={() => setDate(dayjs(date).add(1, 'day').format('YYYY-MM-DD'))}>
              <Text className="text-2xl text-[#2260FF]">›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available time */}
        <Text className="mx-[30px] mt-[20px] font-lsMedium text-[14px] text-[#2260FF]">
          Available Time
        </Text>
        <View className=" border-b-2 pb-5 border-[#2260FF] mx-[30px] mt-2 flex-row flex-wrap gap-2">
          {times.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTime(t)}
              className={`rounded-full border px-3 py-2 ${
                time === t ? 'border-[#2260FF] bg-[#2260FF]' : 'border-[#CAD6FF] bg-white'
              }`}>
              <Text className={`text-xs ${time === t ? 'text-white' : 'text-[#2260FF]'}`}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Patient Details */}
        <Text className="mx-[30px] mt-[30px] font-lsMedium text-[14px] text-[#2260FF]">
          Patient Details
        </Text>
        <View className="mx-[30px] mt-3">
          {/* For whom */}
          <View className="mb-4 flex-row gap-4">
            {(['yourself', 'other'] as const).map((who) => (
              <TouchableOpacity
                key={who}
                onPress={() => setForWhom(who)}
                className={`flex-1 rounded-full border py-2 ${
                  forWhom === who ? 'border-[#2260FF] bg-[#2260FF]' : 'border-[#CAD6FF] bg-white'
                }`}>
                <Text
                  className={`text-center text-sm capitalize ${
                    forWhom === who ? 'text-white' : 'text-[#2260FF]'
                  }`}>
                  {who === 'yourself' ? 'Yourself' : 'Another Person'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mb-[11px] gap-3">
            <Text className="font-lsLight  text-[12px] leading-[100%]">Full name</Text>
            <View className="relative">
              <TextInput
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#809CFF"
                className=" rounded-[13px] bg-[#ECF1FF] px-[13px] py-3 pr-12 font-lsMedium  text-[12px] leading-[100%] text-[#809CFF]"
              />
            </View>
          </View>

          <View className="mb-[11px] gap-3">
            <Text className="font-lsLight text-[12px] leading-[100%]">Age</Text>
            <View className="relative">
              <TextInput
                placeholder="30"
                value={age}
                onChangeText={setAge}
                placeholderTextColor="#809CFF"
                className="rounded-[13px] bg-[#ECF1FF] px-[13px] py-3 pr-12 font-lsMedium  text-[14px] leading-[100%] text-[#809CFF]"
              />
            </View>
          </View>

          <View className="mb-4 flex-row gap-2">
            {(['Female', 'Male', 'Other'] as const).map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => setGender(g)}
                className={`flex-1 rounded-full border py-2 ${
                  gender === g ? 'border-[#2260FF] bg-[#2260FF]' : 'border-[#CAD6FF] bg-white'
                }`}>
                <Text
                  className={`text-center text-sm ${
                    gender === g ? 'text-white' : 'text-[#2260FF]'
                  }`}>
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mb-[11px] gap-3">
            <Text className="font-lsLight text-[12px] leading-[100%]">Describe your problem</Text>
            <View className="relative">
              <TextInput
                placeholder="Describe your problem"
                value={problem}
                onChangeText={setProblem}
                placeholderTextColor="#809CFF"
                textAlignVertical="top"
                multiline
                className="h-[107px] rounded-[13px] border-2 border-[#CAD6FF] bg-white px-[13px] py-3  pr-12 font-lsMedium text-[14px] leading-[100%] text-[#809CFF]"
              />
            </View>
          </View>

          {/* Continue */}
          <TouchableOpacity
            disabled={!time}
            className={`mt-6 rounded-full py-3 ${time ? 'bg-[#2260FF]' : 'bg-gray-300'}`}
            onPress={handleContinue}>
            <Text className="text-center font-lsMedium text-xl text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}