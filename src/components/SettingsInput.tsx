import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const CustomInput = styled.input`
  &:focus-visible {
    outline: none;
  }
  ${tw`px-1 text-gray-800 bg-transparent font-semibold border-b-2 border-b-pink-600`}
`;

interface Props {
  type: string;
  defaultValue?: string;
  reference: React.MutableRefObject<HTMLInputElement | null>;
  autoFocus?: boolean;
}

export default function SettingsInput({
  type,
  defaultValue,
  reference,
  autoFocus,
}: Props) {
  return (
    <CustomInput
      ref={reference}
      type={type}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
    />
  );
}
