import React, { JSX, useState } from 'react';
import { router, useRouter } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { ChevronLeft, Heart } from 'lucide-react-native';
import {
  ArroWDownIcon,
  CalendarIcon,
  CategoriesIcon,
  FemaleIcon,
  HeartFilledIcon,
  HeartIcon,
  MagnifinglassIcon,
  MaleIcon,
  ProfessionalIcon,
  StarFilledIcon,
  StarIcon,
} from '@/components/icons';
import AntDesign from '@expo/vector-icons/AntDesign';

type Page = 'A-Z' | 'Star' | 'Heart' | 'Male' | 'Female';
type Doctor = {
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

const doctorList: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Olivia Turner, M.D.',
    specialty: 'Dermato-Endocrinology',
    gender: 'female',
    rating: 5,
    comment: 60,
    avatar: require('../../assets/images/olivia-turner.png'),
    experience: '10 years',
    schedules: [
      { id: 101, date: 'Sunday, 12 June', time: '9:30 AM - 10:00 AM' },
      { id: 102, date: 'Monday, 13 June', time: '11:00 AM - 11:30 AM' },
    ],
  },
  {
    id: 2,
    name: 'Dr. Alexander Bennett, Ph.D.',
    specialty: 'Dermato-Genetics',
    gender: 'male',
    rating: 4.5,
    comment: 40,
    avatar: require('../../assets/images/alexander-bennett.png'),
    experience: '8 years',
    schedules: [
      { id: 101, date: 'Friday, 20 June', time: '2:30 PM - 3:00 PM' },
      { id: 102, date: 'Tuesday, 14 June', time: '11:00 AM - 11:30 AM' },
    ],
  },
  {
    id: 3,
    name: 'Dr. Sophia Martinez, Ph.D.',
    specialty: 'Cosmetic Bioengineering',
    gender: 'female',
    rating: 5,
    comment: 150,
    avatar: require('../../assets/images/sophia-martinez.png'),
    experience: '12 years',
    schedules: [
      { id: 101, date: 'Tuesday, 15 June', time: '9:30 AM - 10:00 AM' },
      { id: 102, date: 'Saturday, 19 June', time: '11:00 AM - 11:30 AM' },
    ],
  },
  {
    id: 4,
    name: 'Dr. Michael Davidson, M.D.',
    specialty: 'Nano-Dermatology',
    gender: 'male',
    rating: 4.8,
    comment: 90,
    avatar: require('../../assets/images/michael-davidson.png'),
    experience: '7 years',
    schedules: [
      { id: 101, date: 'Wednesday, 15 June', time: '1:30 AM - 2:00 PM' },
      { id: 102, date: 'Monday, 21 June', time: '11:00 AM - 11:30 AM' },
    ],
  },
];

type Service = {
  id: number;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    id: 1,
    title: 'Dermato-Endocrinology',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam.',
  },
  {
    id: 2,
    title: 'Cosmetic Bioengineering',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam.',
  },
  {
    id: 3,
    title: 'Dermato-Genetics',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam.',
  },
  {
    id: 4,
    title: 'Solar Dermatology',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam.',
  },
];

const tabs: { key: Page; label: string | JSX.Element }[] = [
  { key: 'A-Z', label: 'A→Z' },
  { key: 'Star', label: <StarIcon width={16} height={16} /> },
  { key: 'Heart', label: <HeartIcon width={16} height={16} /> },
  { key: 'Male', label: <MaleIcon width={16} height={16} /> },
  { key: 'Female', label: <FemaleIcon width={16} height={16} /> },
];

const renderItemHeart = ({ item }: { item: Doctor }) => (
  <View className="px- mb-[15px] flex-row gap-[9px]  rounded-[17px] bg-[#CAD6FF] p-[7px] px-[11px] pb-[11.42px] pt-[12px]">
    <Image source={item.avatar} className="h-[107px] w-[107px] rounded-full" />
    <View className="flex-1 justify-center gap-[6px] ">
      <View className="mb-[4px] flex-row items-center justify-between">
        <View className="flex-row items-center gap-[2.88px]">
          <View className="h-[17.445068359375px] w-[17.445068359375px] items-center justify-center rounded-full bg-[#2260FF]">
            <ProfessionalIcon />
          </View>
          <Text className="font-lsRegular text-[12px] text-[#2260FF]">Professional Doctor</Text>
        </View>
      </View>
      <View className="w-full flex-row items-center  justify-between rounded-[13px] bg-white  px-[10px] py-[5px]">
        <View>
          <Text className="font-lsMedium text-[14px] text-[#2260FF]">{item.name}</Text>
          <Text className="font-lsLight text-[12px]">{item.specialty}</Text>
        </View>
        <HeartFilledIcon width={18} height={16} color="#2260FF" />
      </View>
      <TouchableOpacity className=" rounded-full bg-[#2260FF] px-2 ">
        <Text className="py-1 text-center font-lsRegular text-[15px] text-white">
          Make Appointment
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const renderItemAZ = ({ item }: { item: Doctor }) => (
  <View className="mb-[15px] flex-row  gap-[9px] rounded-[17px] bg-[#CAD6FF] px-[11px] pb-[11.42px] pt-[12px]">
    <Image source={item.avatar} className="h-[107px] w-[107px] rounded-full" />
    <View className=" justify-center gap-[18px] ">
      <View className="">
        <Text className="font-lsMedium text-[15px] text-[#2260FF]">{item.name}</Text>
        <Text className="font-lsLight text-[13px]">{item.specialty}</Text>
      </View>

      <View className="flex-row gap-[10px] ">
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/doctor-info/[query]',
              params: { doctorId: item.id, doctorInfo: JSON.stringify(item) },
            });
          }}
          className="px- rounded-full bg-[#2260FF] px-2 ">
          <Text className="font-lsRegular text-[15px] text-white">Info</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1">
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white p-2">
            <CalendarIcon size={12} color={'#2260FF'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <AntDesign name="exclamation" size={14} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <AntDesign name="question" size={14} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <HeartIcon width={14} height={14} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const renderItemMale = ({ item }: { item: Doctor }) => (
  <View className="mb-[15px] flex-row  gap-[9px] rounded-[17px] bg-[#CAD6FF] px-[11px] pb-[11.42px] pt-[12px]">
    <Image source={item.avatar} className="h-[107px] w-[107px] rounded-full" />
    <View className=" justify-center gap-[18px] ">
      <View className="">
        <Text className="font-lsMedium text-[15px] text-[#2260FF]">{item.name}</Text>
        <Text className="font-lsLight text-[13px]">{item.specialty}</Text>
      </View>

      <View className="flex-row gap-[10px] ">
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/doctor-info/[query]',
              params: { doctorId: item.id, doctorInfo: JSON.stringify(item) },
            });
          }}
          className="px- rounded-full bg-[#2260FF] px-2 ">
          <Text className="font-lsRegular text-[15px] text-white">Info</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1">
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white p-2">
            <CalendarIcon size={12} color={'#2260FF'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <AntDesign name="exclamation" size={14} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <AntDesign name="question" size={14} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <HeartIcon width={14} height={14} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const renderItemStar = ({ item }: { item: Doctor }) => (
  <View className="px- mb-[15px] flex-row gap-[9px]  rounded-[17px] bg-[#CAD6FF] p-[7px] px-[11px] pb-[11.42px] pt-[12px]">
    <Image source={item.avatar} className="h-[107px] w-[107px] rounded-full" />
    <View className="flex-1 justify-center gap-[6px] ">
      <View className="mb-[4px] flex-row items-center justify-between">
        <View className="flex-row items-center gap-[2.88px]">
          <View className="h-[17.445068359375px] w-[17.445068359375px] items-center justify-center rounded-full bg-[#2260FF]">
            <ProfessionalIcon />
          </View>
          <Text className="font-lsRegular text-[12px] text-[#2260FF]">Professional Doctor</Text>
        </View>
        <View className="flex-row items-center gap-[5px] rounded-full bg-white px-2 py-1">
          <StarFilledIcon />
          <Text className="w-[20px] font-lsLight text-[12px] text-[#2260FF]">{item.rating}</Text>
        </View>
      </View>
      <View className="w-full rounded-[13px] bg-white  px-[10px] py-[5px]">
        <Text className="font-lsMedium text-[15px] text-[#2260FF]">{item.name}</Text>
        <Text className="font-lsLight text-[13px]">{item.specialty}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/doctor-info/[query]',
              params: { doctorId: item.id, doctorInfo: JSON.stringify(item) },
            });
          }}
          className="px- rounded-full bg-[#2260FF] px-2 ">
          <Text className="font-lsRegular text-[15px] text-white">Info</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1">
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white p-2">
            <CalendarIcon size={12} color={'#2260FF'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <AntDesign name="exclamation" size={14} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <AntDesign name="question" size={14} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <HeartIcon width={14} height={14} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const renderItemFemale = ({ item }: { item: Doctor }) => (
  <View className="mb-[15px] flex-row  gap-[9px] rounded-[17px] bg-[#CAD6FF] px-[11px] pb-[11.42px] pt-[12px]">
    <Image source={item.avatar} className="h-[107px] w-[107px] rounded-full" />
    <View className=" justify-center gap-[18px] ">
      <View className="">
        <Text className="font-lsMedium text-[15px] text-[#2260FF]">{item.name}</Text>
        <Text className="font-lsLight text-[13px]">{item.specialty}</Text>
      </View>

      <View className="flex-row gap-[10px] ">
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/doctor-info/[query]',
              params: { doctorId: item.id, doctorInfo: JSON.stringify(item) },
            });
          }}
          className="px- rounded-full bg-[#2260FF] px-2 ">
          <Text className="font-lsRegular text-[15px] text-white">Info</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1">
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white p-2">
            <CalendarIcon size={12} color={'#2260FF'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <AntDesign name="exclamation" size={14} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <AntDesign name="question" size={14} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement functionality
            }}
            className="size-[21px] items-center justify-center rounded-full bg-white ">
            <HeartIcon width={14} height={14} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

export default function ShortBy() {
  const router = useRouter();
  const [page, setPage] = useState<Page>('A-Z');
  const [heartSegment, setHeartSegment] = useState<'doctors' | 'services'>('doctors');
  // right after ShortBy() declaration
  const [openService, setOpenService] = useState<Record<number, boolean>>({});
  const toggleService = (id: number) => {
    setOpenService((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // inside ShortBy (just before return)
  const renderServiceCard = ({ item }: { item: Service }) => {
    const isOpen = openService[item.id] ?? false;
    return (
      <>
        <TouchableOpacity
          onPress={() => toggleService(item.id)}
          className="mb-3 flex-row items-center justify-between rounded-full bg-[#2260FF] px-4 py-3">
          <View className="flex-1 flex-row items-center gap-2">
            <HeartFilledIcon width={24} height={24} color="#fff" />
            <Text className="font-lsSemiBold text-[16px] text-white">{item.title}</Text>
          </View>

          <View
            className="size-[24px] items-center justify-center rounded-full bg-white"
            style={isOpen ? { transform: [{ rotate: '180deg' }] } : undefined}>
            <ArroWDownIcon color="#2260FF" />
          </View>
        </TouchableOpacity>

        {isOpen && (
          <>
            <View className="mt-2 rounded-[17px] bg-[#CAD6FF] p-4">
              <Text className="text-center font-lsExtraLight text-[13px]">
                {item.description}
              </Text>
            </View>
            <TouchableOpacity className="mt-3 rounded-full bg-[#CAD6FF] py-1 mb-2">
              <Text className="font-lsMedium text-[20px] text-center text-[#2260FF]">Looking doctors</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  };

  // Determine the title based on the selected tab
  const title = {
    'A-Z': 'Doctors',
    Heart: 'Favorite',
    Star: 'Rating',
    Male: 'Male',
    Female: 'Female',
  }[page];

  // Filter the doctor list based on the selected tab
  const filteredDoctors = doctorList.filter((doctor) => {
    if (page === 'Male') return doctor.gender === 'male';
    if (page === 'Female') return doctor.gender === 'female';
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-7 py-9">
        <View className="flex-row items-center gap-[50px]">
          <View className="flex flex-row items-center gap-[84px]">
            <TouchableOpacity onPress={router.back}>
              <ChevronLeft size={24} color="#2260FF" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="w-[121px] text-center font-lsSemiBold text-[24px] text-[#2260FF]">
              {title}
            </Text>
          </View>

          <View className="flex flex-row gap-2">
            <View className="flex h-[21.277587890625px] w-[21.277587890625px] items-center justify-center rounded-full bg-[#CAD6FF]">
              <MagnifinglassIcon height={12} width={10} />
            </View>
            <View className="flex h-[21.277587890625px] w-[21.277587890625px] items-center justify-center rounded-full bg-[#CAD6FF]">
              <CategoriesIcon
                height={7.36531925201416}
                width={11.457162857055664}
                color="#2260FF"
              />
            </View>
          </View>
        </View>

        <View className="mt-9 flex-row items-center gap-2">
          <Text className="font-lsLight text-[12px]">Sort by</Text>
          {tabs.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              onPress={() => setPage(key)}
              className={` flex-shrink-0 items-center justify-center rounded-[18px] px-2 py-2 ${
                page === key ? 'bg-[#2260FF]' : 'bg-[#CAD6FF]'
              }`}>
              {page === key ? (
                // Apply white color to the icon and text when the tab is active
                typeof label === 'string' ? (
                  <Text className="font-lsRegular text-[16px] text-white">{label}</Text>
                ) : (
                  <View className="flex items-center justify-center">
                    {React.cloneElement(label, { color: 'white' })}
                  </View>
                )
              ) : // Apply the default color to the icon and text when the tab is not active
              typeof label === 'string' ? (
                <Text className="font-lsRegular text-[16px] text-[#2260FF]">{label}</Text>
              ) : (
                label
              )}
            </TouchableOpacity>
          ))}
        </View>

        {page === 'Heart' && (
          <View className="mt-6 flex-row gap-[11px] rounded-full p-1 ">
            {(['doctors', 'services'] as const).map((seg) => (
              <TouchableOpacity
                key={seg}
                onPress={() => setHeartSegment(seg)}
                className={`flex-1 items-center rounded-full py-3 ${
                  heartSegment === seg ? 'bg-[#2260FF]' : 'bg-[#CAD6FF]'
                }`}>
                <Text
                  className={`font-lsRegular text-[20px] ${
                    heartSegment === seg ? 'text-white' : 'text-[#2260FF]'
                  }`}>
                  {seg.charAt(0).toUpperCase() + seg.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ========= Doctors ========= */}
        {page !== 'Heart' && (
          <FlatList
            data={filteredDoctors}
            renderItem={
              {
                'A-Z': renderItemAZ,
                Star: renderItemStar,
                Male: renderItemMale,
                Female: renderItemFemale,
              }[page] as any
            }
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            className="my-8"
          />
        )}

        {/* ========= Heart Doctors ========= */}
        {page === 'Heart' && heartSegment === 'doctors' && (
          <FlatList
            data={filteredDoctors}
            renderItem={renderItemHeart as any}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            className="my-8"
          />
        )}

        {/* ========= Heart Services ========= */}
        {page === 'Heart' && heartSegment === 'services' && (
          <FlatList
            data={services}
            renderItem={renderServiceCard as any}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            className="my-8"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
