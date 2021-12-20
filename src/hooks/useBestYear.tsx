import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Event {
  start: string;
  end: string;
  description: string;
  summary: string;
  id: string;
}

interface ResultObj {
  year: Event[];
}

export default function useBestYear() {
  const [bestYearIncome, setBestIncome] = useState(0);
  const [bestYear, setBestYear] = useState(0);
  const [totalYears, setTotalYears] = useState<number[]>([]);
  const [totalYearsIncome, setTotalYearsIncome] = useState<number[]>([]);

  const totalData = useSelector((state: RootState) => state.calendar.value);
  const loading = useSelector((state: RootState) => state.calendar.isLoading);

  const calcBest: {
    income: number;
    year: number;
    totalYears: number[];
    totalYearsIncome: number[];
  } = useMemo(() => {
    if (totalData.length > 0) {
      const years = [
        ...new Set(
          totalData.map((event) => new Date(event.start).getFullYear())
        ),
      ];
      let result: ResultObj | {} = {};
      for (let i = 0; i < years.length; i++) {
        result[years[i]] = [
          ...totalData.filter(
            (event) => new Date(event.start).getFullYear() === years[i]
          ),
        ];
      }
      console.log(result);
      const temp: number[] = [];
      for (const [key, value] of Object.entries(result)) {
        console.log(key);
        if (Array.isArray(value)) {
          const val = value
            .map((event) => Number(event.description))
            .reduce((prev, next) => prev + next);
          temp.push(val);
        }
      }
      const res = temp
        .sort((a, b) => b - a)
        .map((income, index) => {
          return { income: income, index: index + 1 };
        })[0];
      return {
        year: years[res.index],
        income: res.income,
        totalYears: years,
        totalYearsIncome: temp,
      };
    }
    return { year: 0, income: 0, totalYears: [], totalYearsIncome: [] };
  }, [totalData]);

  useEffect(() => {
    if (!loading) {
      setBestIncome(calcBest.income);
      setBestYear(calcBest.year);
      setTotalYears(calcBest.totalYears);
      setTotalYearsIncome(calcBest.totalYearsIncome);
    }
  }, [loading, calcBest]);

  return { bestYearIncome, bestYear, totalYears, totalYearsIncome };
}
