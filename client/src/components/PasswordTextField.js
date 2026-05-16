import { FormControl, FormErrorMessage, FormLabel, Input, InputRightElement, Button, InputGroup } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const PasswordTextField = ({ label, type, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ type, name, placeholder });

  return (
    <FormControl isInvalid={meta.error && meta.touched} mb='6'>
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <InputGroup>
        <Field
          as={Input}
          {...field}
          type={showPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
          bg='paper'
          fontFamily='body'
          borderColor='line'
          _hover={{ borderColor: 'ink' }}
          _focusVisible={{ borderColor: 'accent.green', boxShadow: '0 0 0 1px #1F3A2E' }}
        />
        <InputRightElement h='full'>
          <Button
            variant='ghost'
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordTextField;
