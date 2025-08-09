import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { format } from 'date-fns';

interface MessageData {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface UserMessage {
  id: string;
  name: string;
  avatar: string;
  lastMessage: MessageData;
}

const Message = () => {
  const router = useRouter();

  // Mock user messages data
  const userMessages: UserMessage[] = [
    {
      id: 'user456',
      name: 'Jane Smith',
      avatar: require('assets/images/michael-davidson.png'),
      lastMessage: {
        id: 'msg1',
        senderId: 'user456',
        content: 'Hey John, how are you?',
        timestamp: new Date('2023-10-05T14:49:00'),
      },
    },
    {
      id: 'user789',
      name: 'Alice Johnson',
      avatar: require('assets/images/olivia-turner.png'),
      lastMessage: {
        id: 'msg2',
        senderId: 'user789',
        content: 'Can we meet tomorrow?',
        timestamp: new Date('2023-10-05T15:30:00'),
      },
    },
    {
      id: 'user101',
      name: 'Bob Lee',
      avatar: require('assets/images/alexander-bennett.png'),
      lastMessage: {
        id: 'msg3',
        senderId: 'user101',
        content: 'Sent you a file, check it out.',
        timestamp: new Date('2023-10-05T16:15:00'),
      },
    },
  ];

  const handleUserPress = (user: UserMessage) => {
    router.push({
      pathname: '/chat/[query]',
      params: { user: JSON.stringify(user) },
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={userMessages}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="px-[30px] py-[35px]">
            <View className="flex flex-row items-center justify-start gap-[81px]">
              <TouchableOpacity onPress={router.back}>
                <ChevronLeft width={24} height={24} color="#2260FF" strokeWidth={3} />
              </TouchableOpacity>
              <Text className="w-[121px] text-center font-lsSemiBold text-[24px] font-semibold leading-[100%] text-[#2260FF]">
                Messages
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleUserPress(item)}
            className="my-[9px] flex-row items-center justify-between px-[30px]">
            <View className="flex-row items-center">
              <Image
                source={
                  typeof item.avatar === 'string'
                    ? { uri: item.avatar } // remote URL
                    : item.avatar // local require(...)
                }
                className="h-[45px] w-[45px] rounded-full"
              />
              <View className="ml-[10px]">
                <Text className="font-lsSemiBold text-[16px] leading-[100%]">{item.name}</Text>
                <Text className="font-lsRegular text-[14px] leading-[100%] text-[#CAD6FF]">
                  {item.lastMessage.content}
                </Text>
              </View>
            </View>
            <Text className="text-[12px] text-[#2260FF]">
              {format(item.lastMessage.timestamp, 'h:mm a')}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Message;
