import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function useYearlyIncome(year: string) {
  const [yearlyIncome, setYearly] = useState({});
  const totalData = useSelector((state: RootState) => state.calendar.value);
  const loading = useSelector((state: RootState) => state.calendar.isLoading);

  const calcYearly = useCallback(
    (year: string) => {
      if (totalData.length > 0) {
        const yearData = totalData.filter(
          (event) => new Date(event.start).getFullYear() === Number(year)
        );
        const sortedEvents = yearData.sort(
          (a, b) =>
            new Date(b?.start || "").getMonth() -
            new Date(a?.start || "").getMonth()
        );
        console.log(sortedEvents);
        const finalObject = sortedEvents.reduce((acc, cur) => {
          const m = new Date(cur.start).getMonth();
          let monthName: string;
          switch (m + 1) {
            case 1:
              monthName = "Ιανουάριος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 2:
              monthName = "Φεβρουάριος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 3:
              monthName = "Μάρτιος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 4:
              monthName = "Απρίλιος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 5:
              monthName = "Μάιος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 6:
              monthName = "Ιούνιος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 7:
              monthName = "Ιούλιος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 8:
              monthName = "Αύγουστος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 9:
              monthName = "Σεπτέμβριος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 10:
              monthName = "Οκτώβριος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 11:
              monthName = "Νοέμβριος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;
            case 12:
              monthName = "Δεκέμβριος";
              acc[monthName] = [cur, ...(acc[monthName] || [])];

              break;

            default:
              break;
          }
          return acc;
        }, {});
        return finalObject;
      }
      return {};
    },
    [totalData]
  );

  useEffect(() => {
    if (!loading) setYearly(calcYearly(year));
  }, [loading, calcYearly, year]);

  return { yearlyIncome };
}
