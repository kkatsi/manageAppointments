import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function useTotalIncome() {
  const [totalIncome, setTotal] = useState(0);
  //   const [totalYearly, setTotal] = useState(0);

  const totalData = useSelector((state: RootState) => state.calendar.value);
  const loading = useSelector((state: RootState) => state.calendar.isLoading);

  const calcTotal = useMemo(() => {
    return totalData.length > 0
      ? totalData
          .map((event) => Number(event.description))
          .reduce((prev, next) => prev + next)
      : 0;
  }, [totalData]);

  useEffect(() => {
    if (!loading) setTotal(calcTotal);
  }, [loading, calcTotal]);

  return { totalIncome };
}
