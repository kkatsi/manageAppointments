import React, { useEffect, useMemo, useState } from "react";
// import styled from "styled-components";
// import tw from "twin.macro";
import Header from "../components/Header";
import PageContent from "../components/PageContent";
import useYearlyIncome from "../hooks/useYearlyIncome";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { motion } from "framer-motion/dist/es/index";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCalendarItems } from "../features/calendar/calendarSlice";

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

const ShadowedText = styled.span`
  text-shadow: 0 0 4px white;
`;

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const MonthlyIncome = ({ events, month }: MonthlyIncomeProps) => {
  const findMonthlyIncome = useMemo(() => {
    return events
      .map((event: Event) => Number(event?.description))
      .reduce((prev, next) => prev + next);
  }, [events]);
  return (
    <motion.div
      variants={item}
      className="flex w-full p-2 bg-primary-400 text-white font-semibold justify-between items-center mb-3 rounded-md"
    >
      <span>{month}</span>
      <ShadowedText>{findMonthlyIncome}€</ShadowedText>
    </motion.div>
  );
};

export default function Income() {
  //handle menu button color
  const [year, setYear] = useState("2021");
  const { yearlyIncome } = useYearlyIncome(year);
  const dispatch = useDispatch();
  useEffect(() => {
    const menuButton = document.querySelector(".menu-button") as HTMLElement;
    menuButton.style.color = "white";
    return () => {
      menuButton.style.color = "initial";
    };
  }, []);

  useEffect(() => {
    dispatch(
      getCalendarItems({
        min: `${year}-01-01 00:00:00`,
        max: `${year}-12-31 23:59:59`,
      })
    );
  }, [dispatch, year]);

  console.log(yearlyIncome);
  return (
    <PageContent>
      <Header year={year} />
      <div
        className="py-5 px-4 w-full h-full flex flex-col justify-center items-center"
        style={{ marginTop: "170px" }}
      >
        <DatePicker
          locale="el"
          showPopperArrow={false}
          className="text-primary-500 border border-primary-500 text-center text-lg font-semibold w-full bg-transparent rounded-md p-2 mb-5"
          selected={new Date(year)}
          onChange={(newDate: Date) => setYear(String(newDate.getFullYear()))}
          showYearPicker
          dateFormat="yyyy"
        />
        {Object.keys(yearlyIncome).length !== 0 && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="show"
            className="flex flex-col w-full"
          >
            {Object.keys(yearlyIncome).map((key, index) => {
              return (
                <Link key={index} to={`/stats/${year}/${key}`}>
                  <MonthlyIncome
                    events={yearlyIncome[key]}
                    month={String(key)}
                  />
                </Link>
              );
            })}
          </motion.div>
        )}
      </div>
    </PageContent>
  );
}
