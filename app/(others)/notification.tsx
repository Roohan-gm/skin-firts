import { useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, ChevronLeft, Circle } from 'lucide-react-native';
import { CalendarIcon } from '@/components/icons';

// Define the type for a notification item
type NotificationItem = {
  id: string;
  title: string;
  content: string;
  time: string;
  date: string;
  unread: boolean;
};

// Define the type for the grouped data
type GroupedData = { [key: string]: NotificationItem[] };

// Mock data for the notification screen
const mockData: NotificationItem[] = [
  {
    id: '1',
    title: 'Scheduled Appointment',
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    time: '2 M',
    date: 'Today',
    unread: true,
  },
  {
    id: '2',
    title: 'Scheduled Change',
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    time: '2 H',
    date: 'Today',
    unread: false,
  },
  {
    id: '3',
    title: 'Medical Notes',
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    time: '3 H',
    date: 'Today',
    unread: true,
  },
  {
    id: '4',
    title: 'Scheduled Appointment',
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    time: '1 D',
    date: 'Yesterday',
    unread: false,
  },
  {
    id: '5',
    title: 'Medical History Update',
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    time: '5 D',
    date: '15 April',
    unread: true,
  },
];

// Function to group data by date
const groupDataByDate = (data: NotificationItem[]): GroupedData => {
  return data.reduce<GroupedData>((result, item) => {
    if (!result[item.date]) {
      result[item.date] = [];
    }
    result[item.date].push(item);
    return result;
  }, {});
};

const groupedData = groupDataByDate(mockData);

// Render each term item with TypeScript types
const renderTermItem = ({ item }: { item: NotificationItem }) => (
  <View
    className={`flex-row items-start px-[30px] py-[12px] ${item.unread ? 'bg-[#CAD6FF]' : 'bg-white'}  mb-2`}>
    <View className="mr-3 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#2260FF]">
      <CalendarIcon color="white" />
    </View>
    <View className="flex-1">
      <Text className="font-lsMedium text-[20px]">{item.title}</Text>
      <Text className="font-lsExtraLight text-[12px]">{item.content}</Text>
    </View>
    <Text className="font-lsLight text-[12px]">{item.time}</Text>
  </View>
);

const NotificationScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        <View className="flex flex-row items-center justify-between px-[30px] py-4">
          <View className="flex flex-row items-center gap-[76px] py-4">
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color="#2260FF" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="font-lsSemiBold text-[24px] text-[#2260FF]">Notification</Text>
          </View>

          <View className="flex-row items-center rounded-full bg-[#CAD6FF] px-2 py-1">
            <Text className="w-[35px] font-lsRegular text-[14px] ">News</Text>
            <Circle color={'#2260FF'} fill={'#2260FF'} width={7} height={7} />
          </View>
        </View>

        <FlatList
          data={Object.keys(groupedData).sort(
            (a, b) => new Date(b).getTime() - new Date(a).getTime()
          )}
          renderItem={({ item }) => (
            <View className="mb-4">
              <View className="flex-row items-center justify-between px-[30px] py-2">
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'regular',
                    backgroundColor: '#CAD6FF',
                    paddingBlock: 10,
                    paddingHorizontal: 20,
                    borderRadius: 999,
                    color: '#2260FF',
                  }}>
                  {item}
                </Text>
                {item === 'Today' && (
                  <Text className=" mb-2 text-right font-lsSemiBold text-[14px] text-[#2260FF]">
                    Mark all
                  </Text>
                )}{' '}
              </View>
              <FlatList
                data={groupedData[item]}
                renderItem={renderTermItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 20 }}
              />
            </View>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
