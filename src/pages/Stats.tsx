import PageContent from "../components/PageContent";
import styled from "styled-components";
import tw from "twin.macro";
import useTotalIncome from "../hooks/useTotalIncome";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getCalendarItems } from "../features/calendar/calendarSlice";
import useTotalEvents from "../hooks/useTotalEvents";
import useBestYear from "../hooks/useBestYear";
import { RadialChart } from "react-vis";
import randomColor from "randomcolor";

const Stat = styled.div`
  ${tw`w-full flex justify-between items-center mb-3`}
`;

const ShadowedText = styled.span`
  text-shadow: 0 0 4px pink;
  ${tw`text-lg font-semibold text-primary-500`}
`;

export default function Stats() {
  const { totalIncome } = useTotalIncome();
  const { totalEvents } = useTotalEvents();
  const { bestYearIncome, bestYear, totalYears, totalYearsIncome } =
    useBestYear();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCalendarItems({}));
  }, [dispatch]);
  console.log(bestYearIncome);

  const pieData = useMemo(() => {
    return totalYearsIncome.map((income, index) => {
      return {
        angle: income,
        label: String(totalYears[index]),
        color: randomColor({ luminosity: "light", alpha: 0.5 }),
      };
    });
  }, [totalYears, totalYearsIncome]);

  return (
    <PageContent>
      <h1 className="w-full text-center mb-5 text-primary-500 font-semibold text-xl">
        Διαχρονικά Δεδομένα
      </h1>
      <Stat>
        <span>Συνολικά έσοδα μέχρι σήμερα</span>
        <ShadowedText>{totalIncome}€</ShadowedText>
      </Stat>
      <Stat>
        <span>Συνολικά ραντεβου μέχρι σήμερα</span>
        <ShadowedText>{totalEvents}</ShadowedText>
      </Stat>
      <Stat>
        <span>Έτος με τα περισσότερα έσοδα</span>
        <div className="flex items-center">
          <ShadowedText>{bestYear}&nbsp;</ShadowedText>
          <ShadowedText style={{ fontSize: ".95rem" }}>
            ({bestYearIncome}€)
          </ShadowedText>
        </div>
      </Stat>
      <span className="w-full my-3 text-lg text-center text-primary-500 font-semibold">
        Μερίδιο εσόδων
      </span>
      <RadialChart
        data={pieData}
        width={window.innerWidth - 30}
        height={400}
        showLabels={true}
        colorType="literal"
      />
    </PageContent>
  );
}
