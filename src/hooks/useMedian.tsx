import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function useMedian() {
  const [median, setMedian] = useState(0);

  const totalData = useSelector((state: RootState) => state.calendar.value);
  const loading = useSelector((state: RootState) => state.calendar.isLoading);

  // const monthNumber = useMemo(() => {
  //   switch (month) {
  //     case "Ιανουάριος":
  //       return "1";
  //     case "Φεβρουάριος":
  //       return "2";
  //     case "Μάρτιος":
  //       return "3";
  //     case "Απρίλιος":
  //       return "4";
  //     case "Μάιος":
  //       return "5";
  //     case "Ιούνιος":
  //       return "6";
  //     case "Ιούλιος":
  //       return "7";
  //     case "Αύγουστος":
  //       return "8";
  //     case "Σεπτέμβριος":
  //       return "9";
  //     case "Οκτώβριος":
  //       return "10";
  //     case "Νοέμβριος":
  //       return "11";
  //     case "Δεκέμβριος":
  //       return "12";
  //     default:
  //       return "";
  //   }
  // }, [month]);

  const findMedian = useCallback((values: number[]) => {
    if (values.length === 0) throw new Error("No inputs");

    values.sort(function (a, b) {
      return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2) return values[half];

    return (values[half - 1] + values[half]) / 2.0;
  }, []);

  const calcMedian = useMemo(() => {
    // const yearEvents = totalData.filter(
    //   (event) => new Date(event.start).getFullYear() === Number(year)
    // );
    // const monthEvents = yearEvents.filter(
    //   (event) => new Date(event.start).getMonth() + 1 === Number(monthNumber)
    // );

    if (totalData.length > 0) {
      const valuesArray = totalData.map((event) => Number(event.description));
      console.log(valuesArray);
      return findMedian(valuesArray);
    }
    return 0;
  }, [totalData, findMedian]);

  useEffect(() => {
    if (!loading) setMedian(calcMedian);
  }, [loading, calcMedian]);

  return { median };
}
