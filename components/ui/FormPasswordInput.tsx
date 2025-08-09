import { useState } from 'react';
import {  TouchableOpacity } from 'react-native';
import { FormInput } from './FormInput';
import { Eye } from 'lucide-react-native';
import { EyeCrossIcon } from '../icons';

export const FormPasswordInput = (
  props: React.ComponentProps<typeof FormInput>
) => {
  const [show, setShow] = useState(false);
  return (
    <FormInput
      {...props}
      secureTextEntry={!show}
      rightIcon={
        <TouchableOpacity onPress={() => setShow(!show)}>
          {show ? <Eye size={22} color="black" /> : <EyeCrossIcon />}
        </TouchableOpacity>
      }
    />
  );
};