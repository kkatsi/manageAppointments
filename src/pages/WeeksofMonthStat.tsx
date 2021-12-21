import LineChart from "../components/LineChart";
import PageContent from "../components/PageContent";
import useMonthlyGraph from "../hooks/useMonthlyGraph";
import styled from "styled-components";
import tw from "twin.macro";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import useMedian from "../hooks/useMedian";
import useWorst from "../hooks/useWorst";
import useBest from "../hooks/useBest";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { getCalendarItems } from "../features/calendar/calendarSlice";

const Heading = styled.div`
  ${tw`w-full flex justify-between items-center mb-8 font-bold text-primary-500`}
`;

const Stat = styled.div`
  ${tw`w-full flex justify-between items-center mb-3`}
`;

const ShadowedText = styled.span`
  text-shadow: 0 0 4px pink;
  ${tw`text-lg font-semibold text-primary-500`}
`;

export default function WeeksofMonthStat() {
  let { year, month } = useParams();
  let navigate = useNavigate();
  const { graphData } = useMonthlyGraph();
  const { median } = useMedian();
  const { worst } = useWorst();
  const { best } = useBest();

  const monthNumber = useMemo(() => {
    switch (month) {
      case "Ιανουάριος":
        return "1";
      case "Φεβρουάριος":
        return "2";
      case "Μάρτιος":
        return "3";
      case "Απρίλιος":
        return "4";
      case "Μάιος":
        return "5";
      case "Ιούνιος":
        return "6";
      case "Ιούλιος":
        return "7";
      case "Αύγουστος":
        return "8";
      case "Σεπτέμβριος":
        return "9";
      case "Οκτώβριος":
        return "10";
      case "Νοέμβριος":
        return "11";
      case "Δεκέμβριος":
        return "12";
      default:
        return "";
    }
  }, [month]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getCalendarItems({
        min: `${year}-${monthNumber}-1`,
        max: `${year}-${monthNumber}-31`,
      })
    );
  }, [dispatch, monthNumber, year]);
  return (
    <PageContent>
      <Heading onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} />
        <span>Μηνιαία Έσοδα</span>
      </Heading>
      <h1 className="text-primary-500 font-semibold text-center w-full text-xl">
        {year}
      </h1>
      <h2 className="text-primary-500 mb-5 text-center w-full text-lg">
        {month}
      </h2>
      <Stat>
        <span>Μέσος όρος εσόδων ανά ημέρα</span>
        <ShadowedText>{median}€</ShadowedText>
      </Stat>
      <Stat>
        <span>Περισσότερα έσοδα σε μια μέρα</span>
        <ShadowedText>{best}€</ShadowedText>
      </Stat>
      <Stat>
        <span>Λιγότερα έσοδα σε μια μέρα</span>
        <ShadowedText>{worst}€</ShadowedText>
      </Stat>
      <LineChart data={graphData} />
    </PageContent>
  );
}
