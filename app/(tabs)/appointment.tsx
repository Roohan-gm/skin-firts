// app/(tabs)/appointment.tsx
import {
  ClockIcon,
  CrossCheckIcon,
  HeartFilledIcon,
  HeartIcon,
  RightCheckIcon,
  ScheduleCalendarIcon,
  StarFilledIcon,
} from '@/components/icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';

type Page = 'Complete' | 'Upcoming' | 'Cancelled';

const doctorList = [
  {
    id: 1,
    name: 'Dr. Olivia Turner, M.D.',
    specialty: 'Dermato-Endocrinology',
    rating: 5,
    comment: 60,
    avatar: require('../../assets/images/olivia-turner.png'),
    schedules: [
      { id: 101, date: 'Sunday, 12 June', time: '9:30 AM - 10:00 AM' },
      { id: 102, date: 'Monday, 13 June', time: '11:00 AM - 11:30 AM' },
    ],
  },
  {
    id: 2,
    name: 'Dr. Alexander Bennett, Ph.D.',
    specialty: 'Dermato-Genetics',
    rating: 4.5,
    comment: 40,
    avatar: require('../../assets/images/alexander-bennett.png'),
    schedules: [
      { id: 101, date: 'Friday, 20 June', time: '2:30 PM - 3:00 PM' },
      { id: 102, date: 'Tuesday, 14 June', time: '11:00 AM - 11:30 AM' },
    ],
  },
  {
    id: 3,
    name: 'Dr. Sophia Martinez, Ph.D.',
    specialty: 'Cosmetic Bioengineering',
    rating: 5,
    comment: 150,
    avatar: require('../../assets/images/sophia-martinez.png'),
    schedules: [
      { id: 101, date: 'Tuesday, 15 June', time: '9:30 AM - 10:00 AM' },
      { id: 102, date: 'Saturday, 19 June', time: '11:00 AM - 11:30 AM' },
    ],
  },
  {
    id: 4,
    name: 'Dr. Michael Davidson, M.D.',
    specialty: 'Nano-Dermatology',
    rating: 4.8,
    comment: 90,
    avatar: require('../../assets/images/michael-davidson.png'),
    schedules: [
      { id: 101, date: 'Wednesday, 15 June', time: '1:30 AM - 2:00 PM' },
      { id: 102, date: 'Monday, 21 June', time: '11:00 AM - 11:30 AM' },
    ],
  },
];

export default function Appointment() {
  const router = useRouter();
  const [page, setPage] = useState<Page>('Upcoming');
  const [hearts, setHearts] = useState<Record<number, boolean>>({});
  const [data, setData] = useState(doctorList);
  const params = useLocalSearchParams();

  useEffect(() => {
    const { deleteDoctorId, deleteDoctorScheduleId } = params;
    if (deleteDoctorId && deleteDoctorScheduleId) {
      setData((prev) =>
        prev
          .map((doc) =>
            doc.id === Number(deleteDoctorId)
              ? {
                  ...doc,
                  schedules: doc.schedules.filter((s) => s.id !== Number(deleteDoctorScheduleId)),
                }
              : doc
          )
          .filter((doc) => doc.schedules.length > 0)
      );

      router.setParams({ deleteDoctorId: undefined, deleteDoctorScheduleId: undefined });
    }
  }, [params, router]);

  const tabs: { key: Page; label: string }[] = [
    { key: 'Complete', label: 'Complete' },
    { key: 'Upcoming', label: 'Upcoming' },
    { key: 'Cancelled', label: 'Cancelled' },
  ];

  const renderItemComplete = ({ item }: { item: (typeof doctorList)[0] }) => (
    <View className="mb-[25px] rounded-[12px] bg-[#CAD6FF] px-[23px] pb-[13px]">
      <View className="flex-row">
        <Image
          source={item.avatar}
          className="mt-[17px] h-[63.96755599975586px] w-[63.62352752685547px] rounded-full"
        />
        <View className="ml-[14.38px] mt-[37px] flex-1">
          <Text className="font-lsMedium text-[16px] text-[#2260FF]">{item.name}</Text>
          <Text className="font-lsLight text-[14px]">{item.specialty}</Text>
          <View className="mb-[9px] mt-1 flex-row gap-[7px]">
            <View className="h-[18px] flex-row items-center rounded-[13px] bg-white pl-[9px]">
              <StarFilledIcon />
              <Text className="ml-[5px] w-[20px] font-lsLight text-[12px] text-[#2260FF]">
                {item.rating}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setHearts((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
              className="h-[19px] items-center justify-center rounded-full bg-white px-[5px] py-[6px]">
              {hearts[item.id] ? <HeartFilledIcon /> : <HeartIcon width={12} height={10} />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-row gap-[8px] ">
        <TouchableOpacity className="rounded-full bg-white px-[20px] py-1">
          <Text className="font-lsRegular text-[20px] text-[#2260FF]">Re-Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/review/query',
              params: { doctorId: item.id, doctor: JSON.stringify(item) },
            })
          }
          className="rounded-full bg-[#2260FF] px-[13px] py-1">
          <Text className="font-lsRegular text-[20px] text-white">Add Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItemUpcoming = ({ item }: { item: (typeof doctorList)[0] }) => (
    <View className="mb-[25px] rounded-[12px]  bg-[#CAD6FF] px-[23px] pb-[13px] pt-[12px]">
      <View className="mb-[5.8px] flex-row items-center">
        <Image
          source={item.avatar}
          className="h-[63.96755599975586px] w-[63.62352752685547px] rounded-full"
        />
        <View className="ml-[11.25px]  flex-1">
          <Text className="font-lsMedium text-[16px] text-[#2260FF]">{item.name}</Text>
          <Text className="font-lsLight text-[14px]">{item.specialty}</Text>
        </View>
      </View>
      <View className="mb-[9px] mt-1 flex-row gap-[7px]">
        <View className="h-[18px] flex-row items-center rounded-[13px] bg-white pl-[10px]">
          <ScheduleCalendarIcon color={'#2260FF'} />
          <Text className="ml-[7px] w-[83px] font-lsLight text-[12px] text-[#2260FF]">
            {item.schedules[0].date}
          </Text>
        </View>
        <View className="h-[19px] flex-row items-center justify-center rounded-full bg-white px-[5px]">
          <ClockIcon />
          <Text className="ml-[7px] w-[102px] font-lsLight text-[12px] text-[#2260FF]">
            {item.schedules[0].time}
          </Text>
        </View>
      </View>
      <View className="flex-row gap-[12px] ">
        <TouchableOpacity className="rounded-full bg-[#2260FF] px-[57px] py-1">
          <Text className="font-lsRegular text-[20px] text-white">Details</Text>
        </TouchableOpacity>
        <View className="flex-row gap-[9.76px]">
          <TouchableOpacity
            onPress={() => {}}
            className="items-center justify-center rounded-full bg-white p-2">
            <RightCheckIcon height={17} width={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/cancel/query',
                params: { doctorId: item.id, scheduleId: item.schedules[0].id },
              })
            }
            className="items-center justify-center rounded-full bg-white p-2">
            <CrossCheckIcon height={17} width={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItemCanceled = ({ item }: { item: (typeof doctorList)[0] }) => (
    <View className="mb-[25px] rounded-[12px]  bg-[#CAD6FF] px-[23px] pb-[18px] pt-[12px]">
      <View className="mb-[9.03px] flex-row items-center">
        <Image
          source={item.avatar}
          className="h-[63.96755599975586px] w-[63.62352752685547px] rounded-full"
        />
        <View className="ml-[11.25px]  flex-1">
          <Text className="font-lsMedium text-[16px] text-[#2260FF]">{item.name}</Text>
          <Text className="font-lsLight text-[14px]">{item.specialty}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/review/query',
            params: { doctorId: item.id, doctor: JSON.stringify(item) },
          })
        }
        className="items-center rounded-full bg-[#2260FF] px-[57px] py-1">
        <Text className="font-lsRegular text-[20px] text-white">Add Review</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-7 py-9">
        <View className="flex-row items-center gap-[50px]">
          <TouchableOpacity onPress={router.back}>
            <ChevronLeft size={24} color="#2260FF" strokeWidth={3} />
          </TouchableOpacity>
          <Text className="w-[184px] text-center font-lsSemiBold text-[24px] text-[#2260FF]">
            All Appointments
          </Text>
        </View>

        {/* Segmented Control */}
        <View className="mt-9 flex-row gap-2">
          {tabs.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              onPress={() => setPage(key)}
              className={`flex-1 items-center justify-center rounded-[18px] py-1.5 ${
                page === key ? 'bg-[#2260FF]' : 'bg-[#CAD6FF]'
              }`}>
              <Text
                className={`font-lsRegular text-[16px] ${
                  page === key ? 'text-white' : 'text-[#2260FF]'
                }`}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={data}
          renderItem={
            page === 'Upcoming'
              ? renderItemUpcoming
              : page === 'Complete'
                ? renderItemComplete
                : renderItemCanceled
          }
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          className="my-[37px]"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
