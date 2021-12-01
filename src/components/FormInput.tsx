import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const InputContainer = styled.div`
  ${tw`w-full relative mb-4`}
`;

const Input = styled.input`
  padding-left: 50px;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  &:focus-visible {
    outline: none;
  }
  ${tw`rounded-sm bg-white m-0 w-full h-full pr-3 py-3`}
`;

const IconContainer = styled.div`
  font-size: 20px;
  width: 50px;
  ${tw`absolute top-0 left-0 h-full flex items-center justify-center text-gray-500`}
`;

interface FormInputProps {
  placeholder?: string;
  type: string;
  defaultValue?: string | number;
  onChange?: () => void;
  Icon: React.ReactNode;
  reference: React.MutableRefObject<HTMLInputElement | null>;
}

export default function FormInput({
  placeholder,
  type,
  onChange,
  defaultValue,
  Icon,
  reference,
}: FormInputProps) {
  return (
    <InputContainer>
      <Input
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={type}
        onChange={onChange}
        ref={reference}
      />
      <IconContainer>{Icon}</IconContainer>
    </InputContainer>
  );
}
