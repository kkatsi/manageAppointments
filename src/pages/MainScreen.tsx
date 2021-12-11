import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import PageContent from "../components/PageContent";
import Calend, { CalendarView, OnNewEventClickData } from "calend"; // import component
import "calend/dist/styles/index.css"; // import styles
import randomColor from "randomcolor";
import { insertCalendarEvent } from "../features/calendar/calendarSlice";
import Modal from "../components/Dialog";

export default function MainScreen() {
  const calendarItems = useSelector((state: RootState) => state.calendar.value);
  const dispatch = useDispatch();

  const [start, setStart] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [action, setAction] = useState<string>("");

  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const formattedItems = useMemo(() => {
    const result = {};
    const uniqueDates = [
      ...new Set(
        calendarItems.map((item) => new Date(item.start).toLocaleDateString())
      ),
    ];
    const tempCalendarItems = calendarItems.map((item, index) => {
      return {
        id: index,
        startAt: item.start,
        endAt: item.end,
        summary: `${item.summary} (${item.description}€)`,
        color: randomColor({ luminosity: "dark" }),
      };
    });
    for (let i = 0; i < uniqueDates.length; i++) {
      result[uniqueDates[i].replaceAll("/", "-")] = [
        ...tempCalendarItems.filter(
          (item) =>
            new Date(item.startAt).toLocaleDateString() === uniqueDates[i]
        ),
      ];
    }
    return result;
  }, [calendarItems]);

  const handleNewEventClick = useCallback((data: OnNewEventClickData) => {
    console.log(data.day, data.hour, new Date());
    setTitle("Νέο ραντεβού");
    setDescription(
      "Παρακάτω μπορείτε να καταχωρήσετε τις πληροφορίες του νέου ραντεβού για την ώρα που επιλέξατε."
    );
    setAction("create");

    const formatedStartDateString = `${new Date(
      data.day
    ).getUTCFullYear()}-${new Date(data.day).getUTCMonth()}-${
      new Date(data.day).getUTCDate() + 1
    }T${Math.floor(data.hour)}:00:00.000`;

    setStart(formatedStartDateString);
    triggerButtonRef.current?.click();
  }, []);

  // const events = {
  //   "01-11-2021": [
  //     {
  //       id: 1,
  //       startAt: "2021-11-21T18:00:00.000",
  //       endAt: "2021-11-21T19:00:00.000",
  //       summary: "test",
  //       color: "blue",
  //     },
  //   ],
  //   "21-11-2021": [
  //     {
  //       id: 2,
  //       startAt: "2021-11-21T18:00:00.000",
  //       endAt: "2021-11-21T19:00:00.000",
  //       summary: "test",
  //       color: "blue",
  //     },
  //   ],
  // };
  return (
    <PageContent>
      <Calend
        onEventClick={() => alert("existing event click")}
        onNewEventClick={handleNewEventClick}
        events={formattedItems}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.MONTH}
        disabledViews={[CalendarView.THREE_DAYS]}
        onPageChange={() => true}
      />
      <Modal
        start={start}
        title={title}
        description={description}
        price={price}
        action={action}
        name={name}
        triggerButtonRef={triggerButtonRef}
      />
    </PageContent>
  );
}
