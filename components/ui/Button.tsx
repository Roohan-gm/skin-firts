// components/ui/Button.tsx
import React, { ReactNode } from 'react';
import { TouchableOpacity, ActivityIndicator, Text, TextStyle } from 'react-native';

export interface ButtonProps {
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;          // styles the wrapper
  textClassName?: string;      // styles the Text node
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  textClassName = '',
  onPress,
}) => {
  const canPress = !disabled && !loading;

  return (
    <TouchableOpacity
      disabled={!canPress}
      onPress={onPress}
      className={`flex-row items-center justify-center h-[45px] ${className}`}
    >
      {loading && <ActivityIndicator size="small" />}
      {!loading && (
        <>
          {leftIcon}
          {title && <Text className={textClassName}>{title}</Text>}
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};