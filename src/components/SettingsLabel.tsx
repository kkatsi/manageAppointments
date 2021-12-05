import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const CustomLabel = styled.label`
  ${tw`text-primary-600 bg-transparent text-sm px-1`}
`;

interface Props {
  children: string;
}

export default function SettingsLabel({ children }: Props) {
  return <CustomLabel>{children}</CustomLabel>;
}
