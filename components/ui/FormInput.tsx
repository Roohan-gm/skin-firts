import { TextInput, Text, View, TextInputProps, TouchableOpacity } from 'react-native';
import { ReactNode, forwardRef} from 'react';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: ReactNode;
}

export const FormInput = forwardRef<TextInput, Props>(
  ({ label, error, rightIcon, ...rest }, ref) => (
    <View className="gap-3">
      <Text className="font-lsMedium text-[20px] leading-[100%]">{label}</Text>
      <View className="relative">
        <TextInput
          ref={ref}
          placeholderTextColor="#809CFF"
          className="font-regular rounded-[13px] bg-[#ECF1FF] px-[13px] py-3 pr-12 font-lsRegular text-[20px] leading-[100%] text-[#809CFF]"
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-[12px] text-red-500">{error}</Text>}
    </View>
  ),
);