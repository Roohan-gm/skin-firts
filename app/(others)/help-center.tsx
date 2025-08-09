import { ArroWDownIcon, CustomerServiceIcon, FacebookIcon, InstagramIcon, MagnifinglassIcon, WebIcon, WhatsappIcon } from '@/components/icons';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HelpCenterItem {
  id: number;
  title: string;
  description: string;
  subject: 'PopularTopic' | 'General' | 'Services';
}

const mockFAQData: HelpCenterItem[] = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam.',
    subject: 'PopularTopic',
  },

  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet?',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    subject: 'PopularTopic',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet?',
    description:
      'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
    subject: 'General',
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet?',
    description:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.',
    subject: 'General',
  },
  {
    id: 5,
    title: 'Lorem ipsum dolor sit amet?',
    description:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
    subject: 'Services',
  },
];

interface ContactUsItem {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const mockContactUsData: ContactUsItem[] = [
  {
    id: 1,
    title: 'Customer Service',
    icon: <CustomerServiceIcon />,
  },
  {
    id: 2,
    title: 'Website',
    icon: <WebIcon/>,
  },
  {
    id: 3,
    title: 'Whatsapp',
    icon: <WhatsappIcon />,
  },
  {
    id: 4,
    title: 'Facebook',
    icon: <FacebookIcon  />,
  },
  {
    id: 5,
    title: 'Instagram',
    icon: <InstagramIcon />,
  },
];

type Page = 'FAQ' | 'ContactUs';
type Subject = 'PopularTopic' | 'General' | 'Services';

const HelpCenter = () => {
  const [page, setPage] = useState<Page>('FAQ');
  const [subject, setSubject] = useState<Subject>('PopularTopic');
  const [visibleDescriptions, setVisibleDescriptions] = useState<Record<number, boolean>>({});
  const toggleDescription = (id: number) => {
    setVisibleDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const router = useRouter();

  const tabs: { key: Page; label: string }[] = [
    { key: 'FAQ', label: 'FAQ' },
    { key: 'ContactUs', label: 'Contact Us' },
  ];

  const subs: { key: Subject; label: string }[] = [
    { key: 'PopularTopic', label: 'Popular Topic' },
    { key: 'General', label: 'General' },
    { key: 'Services', label: 'Services' },
  ];

  const renderItemFAQ = ({ item }: { item: HelpCenterItem }) => (
    <TouchableOpacity onPress={() => toggleDescription(item.id)}>
      <View className="mx-[30px] mb-[14px] flex-row items-center justify-between rounded-full bg-[#ECF1FF] px-[14px] py-[10px]">
        <Text className="font-lsExtraLight text-[16px]">{item.title}</Text>
        <ArroWDownIcon />
      </View>
      {visibleDescriptions[item.id] && (
        <Text className="mx-[52px] mb-[14px] text-[13px] font-lsExtraLight">
          {item.description}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderItemContactUs = ({ item }: { item: ContactUsItem }) => (
    <TouchableOpacity className="mx-[30px] mb-[16px] flex-row items-center justify-between">
      <View className="flex-row">
        <View className="size-[40px] items-center justify-center rounded-full bg-[#CAD6FF]">
          {item.icon}
        </View>
        <Text className="ml-[21px] font-lsRegular text-[20px]">{item.title}</Text>
      </View>

      <ArroWDownIcon />
    </TouchableOpacity>
  );

  const filteredFAQData = mockFAQData.filter((item) => item.subject === subject);
  const keyExtractor = (item: HelpCenterItem | ContactUsItem) => item.id.toString();

  return (
    <SafeAreaView>
      <ScrollView className="h-full bg-white">
        <View className="bg-[#2260FF] px-[30px]">
          <View className="mt-[32px] flex flex-row items-center justify-start gap-[64px]">
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft width={24} height={24} color="#ffffff" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="w-[156px] text-center font-lsSemiBold text-[24px] leading-[100%] text-white">
              Help Center
            </Text>
          </View>

          <Text className="mt-[22px] text-center font-lsSemiBold text-[16px] capitalize leading-[100%] text-white">
            How can we help you?
          </Text>
          <View className="mb-[20px] mt-[10px] flex h-[38px] flex-row items-center justify-between rounded-full bg-white pl-[14px]">
            <MagnifinglassIcon />
            <TextInput
              placeholder="Search..."
              placeholderTextColor={'#CAD6FF'}
              style={{ flex: 1, height: 38, paddingLeft: 12, paddingRight: 14 }}
              className="text-sm"
            />
          </View>
        </View>
        <View className="mx-[30px] mt-[14px] flex-row gap-[11px]">
          {tabs.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              onPress={() => setPage((prevPage) => (prevPage === 'FAQ' ? 'ContactUs' : 'FAQ'))}
              className={`flex-1 items-center justify-center rounded-full py-2 ${
                page === key ? 'bg-[#2260FF]' : 'bg-[#CAD6FF]'
              }`}>
              <Text
                className={`font-lsRegular text-[20px] ${
                  page === key ? 'text-white' : 'text-[#2260FF]'
                }`}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {page === 'FAQ' && (
          <>
            <View className="mx-[30px] mt-[20px] flex-row gap-[8px] ">
              {subs.map(({ key, label }) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSubject(key)}
                  className={`flex-1 items-center justify-center rounded-full py-1.5 ${
                    subject === key ? 'bg-[#2260FF]' : 'bg-[#CAD6FF]'
                  }`}>
                  <Text
                    className={`font-lsMedium text-[14px] ${
                      subject === key ? 'text-white' : 'text-[#2260FF]'
                    }`}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <FlatList
              data={filteredFAQData}
              renderItem={renderItemFAQ}
              keyExtractor={keyExtractor}
              scrollEnabled={false}
              className="my-[20px]"
            />
          </>
        )}
        {page === 'ContactUs' && (
          <FlatList
            data={mockContactUsData}
            renderItem={renderItemContactUs}
            keyExtractor={keyExtractor}
            scrollEnabled={false}
            className="my-[20px]"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCenter;
