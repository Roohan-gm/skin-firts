// CalendarStrip.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);

interface Props {
  selected: string; // e.g. "2025-08-12"
  onSelect: (date: string) => void;
}

export default function CalendarStrip({ selected, onSelect }: Props) {
  const [current, setCurrent] = useState(dayjs()); // displayed month

  /* ---------- Build a 7-column grid ---------- */
  const firstDay = current.startOf('month');
  const daysInMonth = current.daysInMonth();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => firstDay.date(i + 1));

  // pad ONLY after last day so blanks appear at the END
  const trailingBlanks = (7 - (((daysInMonth % 7) + ((firstDay.day() + 6) % 7)) % 7)) % 7;
  const days = [...monthDays, ...Array(trailingBlanks).fill(null)];

  const goPrev = () => setCurrent(current.subtract(1, 'month'));
  const goNext = () => setCurrent(current.add(1, 'month'));

  return (
    <View className="mb-[20px] mt-[21px]">
      {/* Month label */}
      <View className="mb-5 flex-row items-center justify-between px-2">
        <TouchableOpacity onPress={goPrev}>
          <Text className="text-xl text-[#2260FF]">‹</Text>
        </TouchableOpacity>

        <Text className="font-lsMedium text-[14px] text-[#2260FF]">
          {current.format('MMMM YYYY')}
        </Text>

        <TouchableOpacity onPress={goNext}>
          <Text className="text-xl text-[#2260FF]">›</Text>
        </TouchableOpacity>
      </View>
      
      {/* Week labels */}
      <View className="mb-2 flex-row justify-between px-2">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
          <Text
            key={d}
            className="w-8 rounded-full bg-[#2260FF] px-3 py-1 text-center font-lsLight text-[12px] text-white">
            {d}
          </Text>
        ))}
      </View>

      {/* Date grid */}
      <FlatList
        data={days}
        keyExtractor={(d, idx) => (d ? d.format('YYYY-MM-DD') : `blank-${idx}`)}
        numColumns={7}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        contentContainerStyle={{ paddingVertical: 5 }}
        className="gap-4 rounded-[20px] bg-white p-2"
        scrollEnabled={false}
        renderItem={({ item }) => {
          if (!item) {
            // placeholder keeps row height identical
            return <View className="h-8 w-8" />;
          }
          const iso = item.format('YYYY-MM-DD');
          const isSel = iso === selected;
          const isTod = item.isToday();
          return (
            <TouchableOpacity
              className="h-8 w-8 items-center justify-center rounded-full bg-white p-2"
              style={{
                backgroundColor: isSel ? '#2260FF' : isTod ? '#CAD6FF' : 'transparent',
              }}
              onPress={() => onSelect(iso)}>
              <Text
                className={`font-lsRegular text-sm ${
                  isSel ? 'text-white' : isTod ? 'text-[#2260FF]' : 'text-black'
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
