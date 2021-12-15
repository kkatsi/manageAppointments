import React, { useMemo } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const CustomSelect = styled.select`
  ${tw`p-2 bg-gray-50 rounded-md text-blue-700`}
`;

interface Props {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function TimePicker({ handleChange, value }: Props) {
  const populateTimeOptions = useMemo(() => {
    const timeOptions: string[] = [];

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j = j + 15) {
        timeOptions.push(
          i < 10
            ? `0${i}:${j === 0 ? `0${j}` : j}`
            : `${i}:${j === 0 ? `0${j}` : j}`
        );
      }
    }
    return timeOptions;
  }, []);
  return (
    <CustomSelect defaultValue={value} onChange={handleChange}>
      {populateTimeOptions.map((option, index) => {
        return (
          <option value={option} key={index}>
            {option}
          </option>
        );
      })}
    </CustomSelect>
  );
}
