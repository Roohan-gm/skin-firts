import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CrossCheckIcon, RightCheckIcon } from '../icons';

const CalendarWidget = () => {
  const days = [
    { number: 9, day: 'MON', isSelected: false },
    { number: 10, day: 'TUE', isSelected: false },
    { number: 11, day: 'WED', isSelected: true },
    { number: 12, day: 'THU', isSelected: false },
    { number: 13, day: 'FRI', isSelected: true },
    { number: 14, day: 'SAT', isSelected: true },
  ];

  const appointments = [
    {
      time: '9 AM',
      isEmpty: true,
    },
    {
      time: '10 AM',
      doctor: 'Dr. Olivia Turner, M.D.',
      description: 'Treatment and prevention of skin and photodermatitis.',
      isEmpty: false,
    },
    {
      time: '11 AM',
      isEmpty: true,
    },
    {
      time: '12 AM',
      isEmpty: true,
    },
  ];

  return (
    <View className="mt-[15px] bg-[#CAD6FF] py-[16px]">
      {/* Date Pills */}
      <View className="mx-[30px] mb-4 flex-row justify-between ">
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            className={`items-center justify-center gap-[1px] rounded-[18px] px-[7px] py-[12px] ${
              day.isSelected ? 'bg-[#2260FF]' : 'bg-white'
            }`}>
            <Text
              className={`font-lsMedium text-[24px] leading-[100%] ${
                day.isSelected ? 'text-white' : 'text-gray-800'
              } w-[28px] text-center `}>
              {day.number}
            </Text>
            <Text
              className={`w-[34px] text-center font-lsLight text-[12px] leading-[100%] ${
                day.isSelected ? 'text-white' : 'text-gray-500'
              }`}>
              {day.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar Card */}
      <View className="mx-[30px] rounded-[20px] bg-white px-[20px] pt-[11px]">
        <Text className="mb-[3px] text-right text-sm font-medium text-[#2260FF]">
          11 Wednesday - Today
        </Text>

        <View>
          {appointments.map((appointment, index) => (
            <View key={index} className="mb-3 flex-row items-start">
              <View className="flex flex-row ">
                <View className="w-[38px]">
                  <Text className="font-lsLight text-[12px] leading-[100%] text-[#2260FF]">
                    {appointment.time}
                  </Text>
                </View>

                {/* Dotted Line */}
                {appointment.isEmpty && (
                  <View className="flex-1 flex-row items-center">
                    <View className="flex-1 border-t border-dashed  border-[#2260FF]" />
                  </View>
                )}
              </View>
              {/* Appointment Content */}
              {!appointment.isEmpty && (
                <View className="flex-1">
                  <View className="rounded-[13px]  bg-[#CAD6FF] px-[14px] py-[9px]">
                    <View className="mb-1 flex-row items-center justify-between">
                      <Text className="mb-[3px] font-lsMedium text-[14px] leading-[100%] text-[#2260FF]">
                        {appointment.doctor}
                      </Text>
                      <View className="flex-row gap-[3.97px]">
                        <View className="h-[11.029411315917969px] w-[11.029411315917969px] items-center justify-center rounded-full bg-white">
                          <RightCheckIcon color="#2260FF" />
                        </View>
                        <View className="h-[11.029411315917969px] w-[11.029411315917969px] items-center justify-center rounded-full bg-white">
                          <CrossCheckIcon color="#2260FF" />
                        </View>
                      </View>
                    </View>
                    <Text className="text-[12px] leading-[100%] font-lsLight">
                      {appointment.description}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CalendarWidget;
