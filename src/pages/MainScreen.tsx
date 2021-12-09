import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import PageContent from "../components/PageContent";
import Calend, { CalendarView } from "calend"; // import component
import "calend/dist/styles/index.css"; // import styles

export default function MainScreen() {
  const calendarItems = useSelector((state: RootState) => state.calendar.value);

  const events = {
    "01-11-2021": [
      {
        id: 1,
        startAt: "2021-11-21T18:00:00.000",
        endAt: "2021-11-21T19:00:00.000",
        summary: "test",
        color: "blue",
      },
    ],
    "21-11-2021": [
      {
        id: 2,
        startAt: "2021-11-21T18:00:00.000",
        endAt: "2021-11-21T19:00:00.000",
        summary: "test",
        color: "blue",
      },
    ],
  };
  return (
    <PageContent>
      <span>{JSON.stringify(calendarItems)}</span>
      <Calend
        onEventClick={() => true}
        onNewEventClick={() => true}
        events={events}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.MONTH}
        disabledViews={[CalendarView.THREE_DAYS]}
        onPageChange={() => true}
      />
    </PageContent>
  );
}
