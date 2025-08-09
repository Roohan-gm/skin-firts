import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { AttachIcon, AudioIcon, CallIcon, SendIcon, VideoCallIcon } from '@/components/icons';
import { useState } from 'react';

interface Message {
  id: string; // Add a unique identifier
  text: string;
  time: string;
  sender: 'other' | 'user';
}

export default function Chat() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const user = JSON.parse(params.user as string);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1', // Unique identifier
      text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      time: '09:00',
      sender: 'other',
    },
    {
      id: '2', // Unique identifier
      text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      time: '09:30',
      sender: 'other',
    },
    {
      id: '3', // Unique identifier
      text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      time: '09:43',
      sender: 'other',
    },
    {
      id: '4', // Unique identifier
      text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '09:55',
      sender: 'user',
    },
  ]);
  const [isTyping, setIsTyping] = useState(true);

  const renderItem = ({ item }: { item: Message }) => (
    <View className={`mb-2 ${item.sender === 'user' ? 'self-end' : 'self-start'} w-[250px] `}>
      <View className={`flex-row ${item.sender === 'other' ? '' : 'flex-row-reverse'}`}>
        <Text
          className={` ${item.sender === 'other' ? 'rounded-r-3xl rounded-tl-3xl bg-[#ECF1FF] ' : 'rounded-l-3xl rounded-tr-3xl  bg-[#CAD6FF]  '} px-4 py-3`}>
          {item.text}
        </Text>
      </View>
      <Text
        className={`font-lsLight text-[12px] text-[#809CFF] ${item.sender === 'other' ? 'text-left' : 'text-right'} p-2`}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between bg-[#2260FF] px-[30px] py-[32px]">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={router.back}>
            <ChevronLeft size={24} color="#ffffff" strokeWidth={3} />
          </TouchableOpacity>
          <Text className="ml-[13px] text-center font-lsSemiBold text-[24px] text-white">
            {user.name}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <View className="h-[23.520000457763672px] w-[23.520000457763672px] items-center justify-center rounded-full bg-white">
            <CallIcon />
          </View>
          <View className="h-[23.520000457763672px] w-[23.520000457763672px] items-center justify-center rounded-full bg-white">
            <VideoCallIcon />
          </View>
        </View>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id} // Use the unique id as the key
        style={{ flex: 1, marginTop: 10 , marginHorizontal: 30 }}
        contentContainerStyle={{ padding: 10 }}
      />
      {isTyping && (
        <Text className='text-left text-[#2260FF] font-lsRegular text-[12px] leading-[100%]content-center px-[30px] py-[10px] bg-transparent'>
          Dr. Olivia is typing...
        </Text>
      )}
      <View className="flex-row justify-between gap-2 bg-[#CAD6FF] px-[18px] py-[18px]">
        <View className="h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
          <AttachIcon />
        </View>
        <View className="flex-row items-center gap-2">
          <View className=" w-[260px] rounded-full bg-white px-[13px] pl-[8px] pr-[11px]">
            <TextInput
              placeholderTextColor="#A9BCFE"
              placeholderClassName="font-lsRegular leading-[100%] text-[#A9BCFE] leading-[100%] text-[#A9BCFE]"
              placeholder="Write Here..."
            />
            <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
              <AudioIcon />
            </TouchableOpacity>
          </View>
          <View className="h-[37px] w-[36px] items-center justify-center rounded-full bg-[#2260FF]">
            <SendIcon color="white" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
