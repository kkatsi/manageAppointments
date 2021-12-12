import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const AlertContainer = styled.div`
  z-index: 99999999;
  ${tw`w-screen h-screen absolute top-0 left-0 bg-gray-900 bg-opacity-40 flex justify-center items-center`}
`;

const Card = styled.div`
  max-width: 300px;
  ${tw`rounded-2xl w-2/3 bg-gray-50 `}
`;

const CardBody = styled.div`
  ${tw`py-5 px-2 w-full flex flex-col justify-center items-center`}
`;

const CardTitle = styled.h3`
  ${tw`font-semibold text-gray-800 text-center capitalize`}
`;
const CardText = styled.p`
  ${tw`text-gray-800 text-center text-sm`}
`;

const ButtonsContainer = styled.div`
  ${tw`w-full flex items-center`}
`;

const CardButton = styled.button`
  ${tw`bg-transparent flex-1 text-center font-semibold px-1 py-2 text-blue-400`}
`;

interface Props {
  title: string;
  text: string;
  onClose: () => void;
  secondButtonText?: string;
  onSecondButtonClose?: () => void;
}

export default function Alert({
  title,
  text,
  onClose,
  secondButtonText,
  onSecondButtonClose,
}: Props) {
  return (
    <AlertContainer>
      <Card>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{text}</CardText>
        </CardBody>
        <hr className="w-full h-1" />
        <ButtonsContainer>
          {secondButtonText && (
            <CardButton onClick={onSecondButtonClose}>
              {secondButtonText}
            </CardButton>
          )}
          <CardButton onClick={onClose}>OK</CardButton>
        </ButtonsContainer>
      </Card>
    </AlertContainer>
  );
}
