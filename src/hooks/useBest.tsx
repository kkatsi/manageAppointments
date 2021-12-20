import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function useBest() {
  const [best, setBest] = useState(0);

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

  const calcBest = useMemo(() => {
    if (totalData.length > 0) {
      return Number(
        totalData
          .slice()
          .sort((a, b) => Number(b.description) - Number(a.description))[0]
          .description
      );
    }
    return 0;
  }, [totalData]);

  useEffect(() => {
    if (!loading) setBest(calcBest);
  }, [loading, calcBest]);

  return { best };
}
