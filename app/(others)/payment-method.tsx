import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { AppleIcon, CreditCardIcon, GoogleIcon, PaypalIcon } from '@/components/icons';

export default function PaymentMethod() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const newCard = () => {
    setSelected('creditCard');
    router.push('/add-card');
  };

  const handleSelection = (option: string) => {
    setSelected(option);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="px-[30px]">
        <View className="flex-row items-center gap-[29px]">
          <TouchableOpacity onPress={router.back}>
            <ChevronLeft size={24} color="#2260FF" strokeWidth={3} />
          </TouchableOpacity>
          <Text className="w-[226px] text-center font-lsSemiBold text-[24px] text-[#2260FF]">
            Payment Method
          </Text>
        </View>

        <View className=" py-[43px]">
          <Text className="mb-[13px] font-lsRegular text-[20px] capitalize">
            credit & debit card
          </Text>
          <TouchableOpacity
            className={`mb-[19px] flex-row items-center justify-between rounded-full px-4 py-[13px] ${
              selected === 'creditCard' ? 'bg-[#ECF1FF]' : 'bg-transparent'
            }`}
            activeOpacity={0.75}
            onPress={newCard}>
            <View className="flex-row items-center gap-[12px]">
              <CreditCardIcon />
              <Text className=" w-[141px] font-lsRegular text-[20px] capitalize text-[#809CFF]">
                {'add new card'}
              </Text>
            </View>

            {/* outer ring */}
            <View className="h-[20] w-[20] items-center justify-center overflow-hidden rounded-full border border-[#2260FF]">
              {/* inner dot */}
              {selected === 'creditCard' ? (
                <View className="h-[12] w-[12] rounded-full border border-[#2260FF] bg-[#2260FF]" />
              ) : (
                <View className="h-[10] w-[10] rounded-full border border-[#2260FF] bg-white" />
              )}
            </View>
          </TouchableOpacity>

          <View className="mt-[44px]">
            <Text className="mb-[13px] font-lsRegular text-[20px] capitalize">
              more payment option
            </Text>
            <TouchableOpacity
              className={`mb-[8px] flex-row items-center justify-between rounded-full px-4 py-[13px] ${
                selected === 'applePay' ? 'bg-[#ECF1FF]' : 'bg-transparent'
              }`}
              activeOpacity={0.75}
              onPress={() => handleSelection('applePay')}>
              <View className="flex-row items-center gap-[12px]">
                <AppleIcon />
                <Text className=" w-[141px] font-lsRegular text-[20px] capitalize text-[#809CFF]">
                  {'apple pay'}
                </Text>
              </View>

              {/* outer ring */}
              <View className="h-[20] w-[20] items-center justify-center overflow-hidden rounded-full border border-[#2260FF]">
                {/* inner dot */}
                {selected === 'applePay' ? (
                  <View className="h-[12] w-[12] rounded-full border border-[#2260FF] bg-[#2260FF]" />
                ) : (
                  <View className="h-[10] w-[10] rounded-full border border-[#2260FF] bg-white" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className={`mb-[8px] flex-row items-center justify-between rounded-full px-4 py-[13px] ${
                selected === 'paypal' ? 'bg-[#ECF1FF]' : 'bg-transparent'
              }`}
              activeOpacity={0.75}
              onPress={() => handleSelection('paypal')}>
              <View className="flex-row items-center gap-[12px]">
                <PaypalIcon />
                <Text className=" w-[141px] font-lsRegular text-[20px] capitalize text-[#809CFF]">
                  {'paypal'}
                </Text>
              </View>

              {/* outer ring */}
              <View className="h-[20] w-[20] items-center justify-center overflow-hidden rounded-full border border-[#2260FF]">
                {/* inner dot */}
                {selected === 'paypal' ? (
                  <View className="h-[12] w-[12] rounded-full border border-[#2260FF] bg-[#2260FF]" />
                ) : (
                  <View className="h-[10] w-[10] rounded-full border border-[#2260FF] bg-white" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className={`mb-[19px] flex-row items-center justify-between rounded-full px-4 py-[13px] ${
                selected === 'googlePay' ? 'bg-[#ECF1FF]' : 'bg-transparent'
              }`}
              activeOpacity={0.75}
              onPress={() => handleSelection('googlePay')}>
              <View className="flex-row items-center gap-[12px]">
                <GoogleIcon />
                <Text className=" w-[141px] font-lsRegular text-[20px] capitalize text-[#809CFF]">
                  {'Google Pay'}
                </Text>
              </View>

              {/* outer ring */}
              <View className="h-[20] w-[20] items-center justify-center overflow-hidden rounded-full border border-[#2260FF]">
                {/* inner dot */}
                {selected === 'googlePay' ? (
                  <View className="h-[12] w-[12] rounded-full border border-[#2260FF] bg-[#2260FF]" />
                ) : (
                  <View className="h-[10] w-[10] rounded-full border border-[#2260FF] bg-white" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}