// CalendarStrip.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useRouter } from 'expo-router';
dayjs.extend(isToday);

interface Props {
  selected: string; // e.g. "2025-08-12"
  onSelect: (date: string) => void;
  doctor: any;
}

export default function CalendarStrip({ selected, onSelect, doctor }: Props) {
  const [current, setCurrent] = useState(dayjs());

  const router = useRouter();
  /* ---------- build 6-week grid (42 cells) ---------- */
  const start = current.startOf('month').startOf('week').add(1, 'day'); // Monday
  const cells: dayjs.Dayjs[] = Array.from({ length: 35 }, (_, i) => start.add(i, 'day'));

  const goPrev = () => setCurrent(current.subtract(1, 'month'));
  const goNext = () => setCurrent(current.add(1, 'month'));

  return (
    <View className="mb-5  mt-[21px]">
      {/* Month label */}
      <View className="mb-5 flex-row items-center justify-between px-2">
        <TouchableOpacity onPress={goPrev} className='p-4'>
          <Text className="mb-3 text-2xl text-[#2260FF]">‹</Text>
        </TouchableOpacity>

        <Text className="mb-3 font-lsMedium text-[14px] text-[#2260FF]">
          {current.format('MMMM YYYY')}
        </Text>

        <TouchableOpacity onPress={goNext} className='p-4'>
          <Text className="mb-3 text-2xl text-[#2260FF]">›</Text>
        </TouchableOpacity>
      </View>

      {/* Week labels */}
      <View className="mb-2 flex-row justify-between px-2">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
          <Text
            key={d}
            className=" rounded-full bg-[#2260FF] px-3 py-1 text-center font-lsLight text-[12px] text-white">
            {d}
          </Text>
        ))}
      </View>

      {/* Date grid */}
      <FlatList
        data={cells}
        keyExtractor={(d) => d.format('YYYY-MM-DD')}
        numColumns={7}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        contentContainerStyle={{ paddingVertical: 5 }}
        className="gap-4 rounded-[20px] bg-white p-2"
        scrollEnabled={false}
        renderItem={({ item }) => {
          const inMonth = item.month() === current.month();
          const iso = item.format('YYYY-MM-DD');

          return (
            <TouchableOpacity
              className="h-8 w-8 items-center justify-center rounded-full bg-white p-2"
              style={{
                backgroundColor:
                  item.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
                    ? '#CAD6FF'
                    : 'transparent',
              }}
              onPress={() =>
                router.push({
                  pathname: '/(others)/schedule-details/[query]',
                  params: {
                    doctorInfo: JSON.stringify(doctor),
                    selectedDate: iso,
                  },
                })
              }>
              <Text
                className={`font-lsRegular text-sm ${
                  inMonth ? (item.isToday() ? 'text-[#2260FF]' : 'text-black') : 'text-gray-400' // out-of-month
                }`}>
                {item.date()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
