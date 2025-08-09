import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  dob: string;
  card: {
    cardNo: string;
    expireDate: string;
    cvv: string;
  };
}

const AddCardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  cardNo: z.string().min(1, 'Card number is required'),
  expireDate: z.string().min(1, 'Expiry date is required'),
  cvv: z.string().min(1, 'CVV is required'),
});

type AddCardSchema = z.infer<typeof AddCardSchema>;

const AddCard = () => {
  const router = useRouter();

  // Mock user data object
  const user: UserData = {
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: require('@/assets/images/john-doe.png'),
    phone: '+1 234 567 8900',
    dob: '15-11-2001',
    card: {
      cardNo: '000 000 000 00',
      expireDate: '04/24',
      cvv: '0000',
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddCardSchema>({
    resolver: zodResolver(AddCardSchema),
    defaultValues: {
      name: user.name,
      cardNo: user.card.cardNo,
      expireDate: user.card.expireDate,
      cvv: user.card.cvv,
    },
  });

  const onSubmit = (data: AddCardSchema) => {
    console.log('Saving card:', data);
    router.back();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-[30px] py-[35px]">
          <View className="flex flex-row items-center justify-start gap-[29px]">
            <TouchableOpacity onPress={router.back}>
              <ChevronLeft width={24} height={24} color="#2260FF" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="w-[226px] text-center font-lsSemiBold text-[24px] font-semibold leading-[100%] text-[#2260FF]">
              Add Card
            </Text>
          </View>

          <View className="mt-[26px] flex-1">
            <View className="">
              <Image
                source={require('@/assets/images/card-mask.png')}
                className="z-10 h-[179px] w-full rounded-[16px]"
              />
              {/* Card Background Image */}
              <Image
                source={require('@/assets/images/card-bg.png')}
                className="absolute h-[179px] w-full rounded-[16px]"
              />
            </View>
            <View className="absolute z-20 w-full px-[26px] mt-[15px]">
              <View className="flex-row justify-end">
                <Image
                  source={require('@/assets/images/rectangle.png')}
                  className="h-[10.799999237060547px] w-[47.5px]"
                />
              </View>

              <Text className="mt-[64.3px] w-[190px] font-lsRegular text-[20px] text-white">
                {user.card.cardNo}
              </Text>
              <View className="mt-[15px] mb-[26px] flex-row items-center justify-between">
                <View>
                  <Text className="w-[103px] font-lsRegular text-[12px] capitalize text-white">
                    Card holder name
                  </Text>
                  <Text className="w-[66px] font-lsBold text-[14px] capitalize text-white">
                    {user.name}
                  </Text>
                </View>
                <View className="ml-[20px] mr-[2px]">
                  <Text className="w-[103px] font-lsRegular text-[12px] capitalize text-white">
                    Expiry date
                  </Text>
                  <Text className="w-[52px] font-lsBold text-[14px] capitalize text-white">
                    {user.card.expireDate}
                  </Text>
                </View>
                <Image
                  source={require('@/assets/images/sim.png')}
                  className="h-[24px] w-[28px] object-contain"
                />
              </View>
            </View>
          </View>

          <View className="flex-1">
            <View className="gap-3 mt-[27px] ">
              <Text className="font-lsMedium text-[20px] font-medium leading-[100%]">
                Card holder name
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder={user.name}
                    placeholderTextColor={'#809CFF'}
                    className="font-regular rounded-full bg-[#ECF1FF] px-[13px] align-middle font-lsRegular text-[20px] leading-[100%] text-[#809CFF]"
                  />
                )}
              />
              {errors.name && <Text className="text-[12px] text-red-500">{errors.name.message}</Text>}
            </View>

            <View className="gap-3 mt-[24px] ">
              <Text className="font-lsMedium text-[20px] font-medium leading-[100%]">
                Card number
              </Text>
              <Controller
                control={control}
                name="cardNo"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder={user.card.cardNo}
                    placeholderTextColor={'#809CFF'}
                    className="font-regular rounded-full bg-[#ECF1FF] px-[13px] align-middle font-lsRegular text-[20px] leading-[100%] text-[#809CFF]"
                  />
                )}
              />
              {errors.cardNo && <Text className="text-[12px] text-red-500">{errors.cardNo.message}</Text>}
            </View>
            <View className="flex-row mt-[25px] gap-[8px]">
              <View className="gap-3">
                <Text className="font-lsMedium text-[20px] font-medium leading-[100%]">
                  Expiry date
                </Text>
                <Controller
                  control={control}
                  name="expireDate"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder={user.card.expireDate}
                      placeholderTextColor={'#809CFF'}
                      className="font-regular w-[162px] rounded-full bg-[#ECF1FF] px-[27px] align-middle font-lsRegular text-[20px] leading-[100%] text-[#809CFF]"
                    />
                  )}
                />
                {errors.expireDate && <Text className="text-[12px] text-red-500">{errors.expireDate.message}</Text>}
              </View>
              <View className="gap-3">
                <Text className="font-lsMedium text-[20px] font-medium leading-[100%]">
                  CVV
                </Text>
                <Controller
                  control={control}
                  name="cvv"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder={user.card.cvv}
                      placeholderTextColor={'#809CFF'}
                      className="font-regular w-[130px]  rounded-full bg-[#ECF1FF] px-[27px] align-middle font-lsRegular text-[20px] leading-[100%] text-[#809CFF]"
                    />
                  )}
                />
                {errors.cvv && <Text className="text-[12px] text-red-500">{errors.cvv.message}</Text>}
              </View>
            </View>

            <Button
              title="Save Card"
              onPress={handleSubmit(onSubmit)}
              textClassName="text-white font-lsMedium text-2xl"
              className=" mt-[105px] rounded-full bg-[#2260FF]"
              disabled={isSubmitting}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCard;