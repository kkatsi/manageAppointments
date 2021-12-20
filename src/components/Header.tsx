import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import useTotalIncome from "../hooks/useTotalIncome";

const HeaderContainer = styled.div`
  height: 250px;
  ${tw`w-full absolute p-5 top-0 left-0 flex flex-col justify-end bg-primary-400 text-white`}
`;

const TotalIncome = styled.h1`
  ${tw`font-light text-lg`}
`;

const CongratsText = styled.h2`
  ${tw`text-xl font-bold`}
`;

const ShadowedText = styled.span`
  text-shadow: 0 0 4px white;
  ${tw`text-xl font-semibold`}
`;

export default function Header({ year }: { year: string }) {
  const { totalYearly } = useTotalIncome();
  return (
    <HeaderContainer>
      <CongratsText>Συγχαρητήρια!</CongratsText>
      <TotalIncome>
        Έχεις βγάλει <ShadowedText>{totalYearly}€</ShadowedText> μέσα στο {year}
        !
      </TotalIncome>
    </HeaderContainer>
  );
}
