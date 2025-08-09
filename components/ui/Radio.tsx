import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface RadioProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const RadioItem: React.FC<RadioProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    className={`mb-[19px] flex-row items-center rounded-full px-3 py-3 ${
      selected ? 'bg-[#CAD6FF]' : 'bg-transparent'
    }`}
    activeOpacity={0.75}
    onPress={onPress}>
    {/* outer ring */}
    <View className="h-[20] w-[20] items-center justify-center rounded-full border border-[#2260FF] overflow-hidden">
      {/* inner dot */}
      {selected ? (
        <View className="border h-[12] w-[12] rounded-full border-[#2260FF] bg-[#2260FF]" />
      ) : (
        <View className="h-[10] w-[10] rounded-full border border-[#2260FF] bg-white" />
      )}
    </View>
    <Text className="ml-[9px] font-lsLight text-[16px] text-black">{label}</Text>
  </TouchableOpacity>
);
