import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { Field, useField } from "formik"



const TextField = ({label, type, name, placeholder}) => {
    const [field, meta] = useField({type, name, placeholder})

  return (
    <FormControl isInvalid={meta.error && meta.touched} mb='6'>
        <FormLabel noOfLines={1}>{label}</FormLabel>
        <Field
          as={Input}
          {...field}
          type={type}
          name={name}
          placeholder={placeholder}
          bg='paper'
          fontFamily='body'
          borderColor='line'
          _hover={{ borderColor: 'ink' }}
          _focusVisible={{ borderColor: 'accent.green', boxShadow: '0 0 0 1px #1F3A2E' }}
        />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField
