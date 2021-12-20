import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface GraphObject {
  x: string;
  y: number;
}

export default function useMonthlyGraph() {
  const [graphData, setGraphData] = useState<GraphObject[]>([{ x: "", y: 0 }]);

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

  const calcTerms: GraphObject[] = useMemo(() => {
    const result: GraphObject[] = [];

    console.log(totalData);

    if (totalData.length > 0) {
      for (let i = 0; i < 4; i++) {
        const weekEvents = totalData.filter(
          (event) =>
            new Date(event.start).getDate() > 7 * i &&
            (i !== 3
              ? new Date(event.start).getDate() <= 7 * (i + 1)
              : new Date(event.start).getDate() <= 31)
        );

        console.log(weekEvents);

        const eventsPrices = weekEvents.map((event) =>
          Number(event.description)
        );

        console.log(eventsPrices);

        let eventsSum: number = 0;

        if (eventsPrices.length > 0)
          eventsSum = eventsPrices.reduce((prev, next) => prev + next);

        result.push({
          x: `${i + 1}η Εβδομάδα`,
          y: eventsSum,
        });
      }
      console.log(result);
      return result;
    }

    return [{ x: "", y: 0 }];
  }, [totalData]);

  useEffect(() => {
    if (!loading) setGraphData(calcTerms);
  }, [loading, calcTerms]);

  return { graphData };
}
