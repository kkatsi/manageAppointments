import React, { useCallback, useEffect, useMemo, useState } from "react";
// import styled from "styled-components";
// import tw from "twin.macro";
import Header from "../components/Header";
import PageContent from "../components/PageContent";
import useYearlyIncome from "../hooks/useYearlyIncome";
import DatePicker from "react-datepicker";

interface Event {
  start: string;
  end: string;
  description: string;
  summary: string;
  id: string;
}

interface MonthlyIncomeProps {
  events: [];
  month: string;
}

const MonthlyIncome = ({ events, month }: MonthlyIncomeProps) => {
  const findMonthlyIncome = useMemo(() => {
    return events
      .map((event: Event) => Number(event?.description))
      .reduce((prev, next) => prev + next);
  }, [events]);
  return (
    <div className="flex">
      <span>{month}</span>
      <span>{findMonthlyIncome}</span>
    </div>
  );
};

export default function Income() {
  //handle menu button color
  const [year, setYear] = useState("2021");
  const { yearlyIncome } = useYearlyIncome(year);
  useEffect(() => {
    const menuButton = document.querySelector(".menu-button") as HTMLElement;
    menuButton.style.color = "white";
    return () => {
      menuButton.style.color = "initial";
    };
  }, []);
  console.log(yearlyIncome);
  return (
    <PageContent>
      <Header />
      <div
        className="p-5 w-full flex flex-col justify-center items-center"
        style={{ marginTop: "170px" }}
      >
        <DatePicker
          locale="el"
          showPopperArrow={false}
          className="text-primary-500 border border-primary-500 text-center text-lg font-semibold w-full bg-transparent rounded-md p-2"
          selected={new Date(year)}
          onChange={(newDate: Date) => setYear(String(newDate.getFullYear()))}
          showYearPicker
          dateFormat="yyyy"
        />
        {Object.keys(yearlyIncome).map((key, index) => {
          return (
            <MonthlyIncome
              key={index}
              events={yearlyIncome[key]}
              month={String(key)}
            />
          );
        })}
      </div>
    </PageContent>
  );
}
