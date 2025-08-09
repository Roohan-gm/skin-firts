import { useRouter } from 'expo-router';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

// Define the type for termsObject items
type TermItem = {
  id: string;
  content: string;
};

const termsObject: TermItem[] = [
  { id: '1', content: 'Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex nisi laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget rutrum pharetra, lectus nisl posuere risus, vel facilisis nisi tellus ac turpis' },
  { id: '2', content: 'Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex nisi laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget rutrum pharetra, lectus nisl posuere risus, vel facilisis nisi tellus.' },
  { id: '3', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam.' },
  { id: '4', content: 'Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt. Aenean arcu metus, bibendum at rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros semper ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices ex placerat. Mauris ut lacinia justo, sed suscipit tortor. Nam egestas nulla posuere neque.' },
];

const PrivacyPolicy = () => {
  const router = useRouter();

  // Render each term item with TypeScript types
  const renderTermItem = ({ item, index }: { item: TermItem; index: number }) => (
    <View className="mt-[10px] flex-row">
      <Text className="font-lsExtraLight text-[14px] ">
        {index + 1}.{' '} 
      </Text>
      <Text className="font-lsExtraLight text-[14px] ">
       {item.content}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="px-[30px] py-[35px]">
          {/* Header with Back Button and Title */}
          <View className="flex flex-row items-center justify-start gap-[59px]">
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft width={24} height={24} color="#2260FF" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="w-[167px] text-center font-lsSemiBold text-[24px] font-semibold leading-[100%] text-[#2260FF]">
              Privacy Policy
            </Text>
          </View>

          {/* Last Updated */}
          <Text className="mb-[5px] mt-[28px] h-[21px] font-lsMedium text-[12px] leading-[100%] text-[#A9BCFE]">
            last update: 14/08/2024
          </Text>

          {/* Privacy Policy Text */}
          <Text className="font-lsExtraLight text-[14px] font-light leading-[100%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue
            lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut
            feugiat diam. Fusce a scelerisque neque, sed accumsan metus. Nunc auctor tortor in dolor
            luctus, quis euismod urna tincidunt. Aenean arcu metus, bibendum at rhoncus at, volutpat
            ut lacus. Morbi pellentesque malesuada eros semper ultrices. Vestibulum lobortis enim
            vel neque auctor, a ultrices ex placerat. Mauris ut lacinia justo, sed suscipit tortor.
            Nam egestas nulla posuere neque tincidunt porta.
          </Text>

          {/* Terms & Conditions Header */}
          <Text className="mt-[14px] h-[23px] font-lsMedium text-[20px] capitalize text-[#2260FF]">
            terms & conditions
          </Text>

          {/* Terms List using FlatList */}
          <View className="mt-[10px]">
            <FlatList
              data={termsObject}
              renderItem={renderTermItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false} // Disable FlatList scrolling to work inside ScrollView
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;