import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import PageContent from "../components/PageContent";
import Kalend, {
  CalendarView,
  OnEventClickData,
  OnNewEventClickData,
} from "kalend"; // import component
import "kalend/dist/styles/index.css"; // import styles
import randomColor from "randomcolor";
import EventDialog from "../components/EventDialog";
import Div100vh from "react-div-100vh";
import { getCalendarItems } from "../features/calendar/calendarSlice";

export default function MainScreen() {
  const calendarItems = useSelector((state: RootState) => state.calendar.value);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCalendarItems({}));
  }, []);

  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const formattedItems = useMemo(() => {
    const result = {};
    const uniqueDates = [
      ...new Set(
        calendarItems.map((item) => {
          const unformattedDate = new Date(item.start).toLocaleDateString();
          let [first, second, ...rest] = unformattedDate.split("/");
          first = first.length === 1 ? `0${first}` : first;
          second = second.length === 1 ? `0${second}` : second;
          const restDate = rest.join("/");
          return first + "/" + second + "/" + restDate;
        })
      ),
    ];

    const tempCalendarItems = calendarItems.map((item, index) => {
      return {
        id: item.id,
        startAt: item.start,
        endAt: item.end,
        summary: `${item.summary} (${item.description}€)`,
        color: randomColor({ luminosity: "dark", hue: "pink" }),
      };
    });
    for (let i = 0; i < uniqueDates.length; i++) {
      result[uniqueDates[i].replaceAll("/", "-")] = [
        ...tempCalendarItems.filter((item) => {
          const unformattedDate = new Date(item.startAt).toLocaleDateString();
          let [first, second, ...rest] = unformattedDate.split("/");
          first = first.length === 1 ? `0${first}` : first;
          second = second.length === 1 ? `0${second}` : second;
          const restDate = rest.join("/");
          const endResult = first + "/" + second + "/" + restDate;
          return endResult === uniqueDates[i];
        }),
      ];
    }
    return result;
  }, [calendarItems]);

  const handleNewEventClick = useCallback((data: OnNewEventClickData) => {
    // console.log(data.day, data.hour, new Date());
    setTitle("Νέο ραντεβού");
    setDescription(
      "Παρακάτω μπορείτε να καταχωρήσετε τις πληροφορίες του νέου ραντεβού για την ώρα που επιλέξατε."
    );
    setName("");
    setPrice(0);
    setAction("create");
    const hour = Math.floor(data.hour);
    const formattedStartDateString = `${
      hour < 10 ? `0${hour}:00` : `${hour}:00`
    }`;
    const formattedEndDateString = `${
      hour + 1 < 10 ? `0${hour + 1}:00` : `${hour + 1}:00`
    }`;
    setStart(formattedStartDateString);
    setEnd(formattedEndDateString);
    setStartDate(new Date(data.day));
    triggerButtonRef.current?.click();
  }, []);

  const handleExistingEventClick = useCallback((data: OnEventClickData) => {
    setTitle("Τροποποίηση ραντεβού");
    const text = data.summary;
    const price = text.split("(")[1].split("€)")[0];
    setPrice(Number(price));
    const name = text.split(" (")[0];
    setName(name);
    setAction("edit");
    setId(data.id);
    setDescription(
      "Παρακάτω μπορείτε να τροποποιήσετε τις πληροφορίες του ραντεβού που έχετε επιλέξει ή να το διαγράψετε."
    );
    setStartDate(new Date(data.startAt));
    // console.log(new Date(data.startAt).getHours());
    //format startTime
    const startHours = new Date(data.startAt).getHours();
    const startMinutes = new Date(data.startAt).getMinutes();
    const startString = `${
      startHours < 10
        ? `0${startHours}:${startMinutes === 0 ? `00` : startMinutes}`
        : `${startHours}:${startMinutes === 0 ? `00` : startMinutes}`
    }`;
    setStart(startString);
    //format endTime
    const endHours = new Date(data.endAt).getHours();
    const endMinutes = new Date(data.endAt).getMinutes();
    const endString = `${
      endHours < 10
        ? `0${endHours}:${endMinutes === 0 ? `00` : endMinutes}`
        : `${endHours}:${endMinutes === 0 ? `00` : endMinutes}`
    }`;
    setEnd(endString);
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
    <PageContent div100>
      <Kalend
        onEventClick={handleExistingEventClick}
        onNewEventClick={handleNewEventClick}
        events={formattedItems}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.MONTH}
        disabledViews={[CalendarView.THREE_DAYS]}
        onPageChange={() => true}
      />
      <EventDialog
        start={start}
        end={end}
        id={id}
        title={title}
        startDate={startDate}
        handleStartDateChange={(val: Date) => setStartDate(val)}
        description={description}
        price={price}
        action={action}
        name={name}
        triggerButtonRef={triggerButtonRef}
      />
    </PageContent>
  );
}
