import { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Switch } from 'react-native-switch';

const NotificationSettings = () => {
  const router = useRouter();

  const [settings, setSettings] = useState({
    general: true,
    sound: true,
    callSound: true,
    vibrate: true,
    offers: true,
    payments: true,
    promo: true,
    cashback: true,
  });

  const update = (key: keyof typeof settings) => (val: boolean) =>
    setSettings((s) => ({ ...s, [key]: val }));

  interface RowProps {
    title: string;
    value: boolean;
    onValueChange: (val: boolean) => void;
  }

  const Row = ({ title, value, onValueChange }: RowProps) => (
    <View className="mb-[42px] flex-row items-center justify-between">
      <Text className="font-lsRegular text-[20px] ">{title}</Text>
      
      <Switch
        value={value}
        onValueChange={onValueChange}
        circleSize={22}          // circle diameter
        barHeight={26}           // board height (same as container)
        circleBorderWidth={0}
        backgroundActive="#2260FF"
        backgroundInactive="#CAD6FF"
        circleActiveColor="#fff"
        circleInActiveColor="#fff"
        activeText=""
        inActiveText=""
        containerStyle={{ width: 52, height: 26 }} // lock board size
      />
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 30, paddingVertical: 35 }}>
        {/* Header */}
        <View className="flex-row items-center gap-7">
          <TouchableOpacity onPress={router.back}>
            <ChevronLeft size={24} color="#2260FF" strokeWidth={3} />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-lsSemiBold text-[24px] text-[#2260FF]">
            Notification Settings
          </Text>
        </View>

        {/* Toggles */}
        <View className="mt-10">
          <Row
            title="General Notification"
            value={settings.general}
            onValueChange={update('general')}
          />
          <Row title="Sound" value={settings.sound} onValueChange={update('sound')} />
          <Row title="Sound Call" value={settings.callSound} onValueChange={update('callSound')} />
          <Row title="Vibrate" value={settings.vibrate} onValueChange={update('vibrate')} />
          <Row title="Special Offers" value={settings.offers} onValueChange={update('offers')} />
          <Row title="Payments" value={settings.payments} onValueChange={update('payments')} />
          <Row title="Promo & Discount" value={settings.promo} onValueChange={update('promo')} />
          <Row title="Cashback" value={settings.cashback} onValueChange={update('cashback')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationSettings;
