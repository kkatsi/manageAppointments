import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import tw from "twin.macro";
import { useSelector } from "react-redux";
import {
  insertCalendarEvent,
  updateCalendarEvent,
} from "../features/calendar/calendarSlice";
import { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import { IoPersonOutline } from "react-icons/io5";
import { MdEuro, MdOutlineAccessTime } from "react-icons/md";
import DatePicker, { registerLocale } from "react-datepicker";
import Alert from "./Alert";
import el from "date-fns/locale/el";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "./TimePicker";
import { intervalToDuration } from "date-fns";

registerLocale("el", el);

const StyledOverlay = styled(DialogPrimitive.Overlay)`
  inset: 0;
  z-index: 9999999;
  ${tw`bg-gray-600 bg-opacity-60 fixed `}
`;

function Root({ children, ...props }) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content)`
  ${tw`bg-white rounded-md fixed left-1/2 top-1/2`}
  z-index: 1000000000;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  transform: translate(-50%, -50%);
  @media (prefers-reduced-motion) : {
    animation: contentShow 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  &:focus: {
    outline: none;
  }
`;

const StyledTitle = styled(DialogPrimitive.Title)`
  font-size: 17px;
  ${tw`m-0 text-gray-800 font-semibold`}
`;

const StyledDescription = styled(DialogPrimitive.Description)`
  margin: 10px 0 20px;
  font-size: 13px;
  line-height: 1.5;
  ${tw`text-gray-600`}
`;

// Exports
const Dialog = Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = StyledContent;
const DialogTitle = StyledTitle;
const DialogDescription = StyledDescription;
const DialogClose = DialogPrimitive.Close;

// Your app...
const Flex = styled.div`
  ${tw`flex flex-col justify-center mt-6`}
`;

const Button = styled.button`
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  height: 40px;
  width: 250px;
  ${tw`inline-flex items-center mx-auto justify-center rounded-md font-semibold`}
`;

const IconButton = styled.button`
  all: unset;
  font-family: "inherit";
  height: 25px;
  width: 25px;
  top: 25px;
  right: 25px;
  &:focus: {
    box-shadow: 0 0 0 2px black;
  }
  ${tw`rounded-full inline-flex items-center justify-center absolute text-blue-500 hover:bg-blue-300`}
`;

const Fieldset = styled.fieldset`
  all: unset;
  gap: 10px;
  ${tw`flex items-center mb-5`}
`;

const Label = styled.label`
  font-size: 15px;
  ${tw`text-right text-blue-700`}
`;

const Input = styled.input`
  all: unset;
  padding: "0 10px";
  font-size: 15;
  line-height: 1;
  boxshadow: "0 0 0 1px black";
  height: 35px;
  &:focus: {
    box-shadow: 0 0 0 2px black;
  }
  ${tw`w-full flex-1 inline-flex items-center justify-center rounded-sm text-blue-700`}
`;

interface Props {
  start: string;
  end: string;
  id: string;
  title: string;
  description: string;
  price: number;
  startDate: Date;
  handleStartDateChange: (val: Date) => void;
  name: string;
  action: string;
  triggerButtonRef: RefObject<HTMLButtonElement>;
}

const EventDialog = ({
  start,
  end,
  id,
  title,
  description,
  price,
  name,
  startDate,
  handleStartDateChange,
  action,
  triggerButtonRef,
}: Props) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [startingTime, setStartingTime] = useState<string>(start);
  const [endingTime, setEndingTime] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const calendarLoading = useSelector(
    (state: RootState) => state.calendar.isLoading
  );

  useEffect(() => {
    console.log(start, end);
  }, [start, end]);

  useEffect(() => {
    setStartingTime(start);
  }, [start]);

  useEffect(() => {
    setEndingTime(end);
  }, [end]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // console.log(startingTime, endingTime);
      let endDate: Date = new Date();
      //format startDate properly
      const startHours = Number(startingTime?.split(":")[0]);
      const startMinutes = Number(startingTime?.split(":")[1]);
      startDate.setHours(startHours || 0);
      startDate.setMinutes(startMinutes || 0);
      //format endDate properly
      const endHours = Number(endingTime?.split(":")[0]);
      const endMinutes = Number(endingTime?.split(":")[1]);
      endDate.setDate(startDate.getDate());
      endDate.setHours(endHours || 0);
      endDate.setMinutes(endMinutes || 0);
      // console.log(startDate.toISOString());
      if (action === "create") {
        dispatch(
          insertCalendarEvent({
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            description: priceRef.current?.value || "",
            summary: nameRef.current?.value || "",
          })
        )
          .then(() => {
            setOpen(false);
            setSuccess(true);
          })
          .catch((error) => {
            setError(true);
            setErrorMessage(error);
          });
      } else {
        dispatch(
          updateCalendarEvent({
            id: id,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            description: priceRef.current?.value || "",
            summary: nameRef.current?.value || "",
          })
        )
          .then(() => {
            setOpen(false);
            setSuccess(true);
          })
          .catch((error) => {
            setError(true);
            setErrorMessage(error);
          });
      }
    },
    [dispatch, action, startDate, startingTime, endingTime, id]
  );

  const duration = useMemo(() => {
    const durationObj = intervalToDuration({
      start: new Date(
        2021,
        0o1,
        0o1,
        Number(startingTime?.split(":")[0]) || 0,
        Number(startingTime?.split(":")[1]) || 0
      ),
      end: new Date(
        2021,
        0o1,
        0o1,
        Number(endingTime.split(":")[0]) || 0,
        Number(endingTime.split(":")[1]) || 0
      ),
    });

    return { hours: durationObj.hours, minutes: durationObj.minutes };
  }, [startingTime, endingTime]);
  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen((prevOpen) => !prevOpen)}>
        <DialogTrigger asChild>
          <Button style={{ display: "none" }} ref={triggerButtonRef}></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <form action="" onSubmit={handleSubmit}>
            <Fieldset style={{ gap: "5px", marginBottom: "0" }}>
              <Label htmlFor="time">
                <MdOutlineAccessTime size={22} style={{ marginLeft: "auto" }} />
              </Label>
              <DatePicker
                locale="el"
                selected={startDate}
                className="text-blue-700 text-sm w-full bg-blue-50 rounded-md p-2"
                onChange={(newDate: Date) => handleStartDateChange(newDate)}
                dateFormat="EEEE, d MMM"
              />
              <div className="ml-auto">
                <TimePicker
                  value={startingTime}
                  handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStartingTime(e.target.value)
                  }
                />
                <span className="text-blue-700">-</span>
                <TimePicker
                  value={endingTime}
                  handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setEndingTime(e.target.value)
                  }
                />
              </div>
            </Fieldset>
            <Fieldset style={{ justifyContent: "center" }}>
              <small className="text-blue-700 mx-auto">
                {duration.hours !== 0
                  ? duration.hours === 1
                    ? duration.hours + " ώρα"
                    : duration.hours + " ώρες"
                  : ""}{" "}
                {duration.hours !== 0 && duration.minutes !== 0 ? "και " : ""}
                {duration.minutes !== 0 ? duration.minutes + " λεπτά" : ""}
              </small>
            </Fieldset>

            <Fieldset>
              <Label htmlFor="name">
                <IoPersonOutline size={22} style={{ marginLeft: "auto" }} />
              </Label>
              <Input
                id="name"
                autoFocus
                defaultValue={name}
                ref={nameRef}
                placeholder="Προσθήκη ονόματος"
                required
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="username">
                <MdEuro size={22} style={{ marginLeft: "auto" }} />
              </Label>
              <Input
                id="price"
                defaultValue={price === 0 ? undefined : price}
                type="number"
                ref={priceRef}
                placeholder="Προσθήκη ποσού"
                required
              />
            </Fieldset>
            <Flex>
              <Button
                type="submit"
                aria-label="Close"
                className="text-white bg-blue-500"
              >
                {!calendarLoading && "Αποθήκευση"}
                {calendarLoading && (
                  <svg
                    fill="none"
                    className="w-12 h-12 animate-spin"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                )}
              </Button>
              {action === "edit" && (
                <Button className="text-red-600 mt-2">Διαγραφή</Button>
              )}
            </Flex>
          </form>

          <DialogClose asChild>
            <IconButton>
              <IoCloseOutline />
            </IconButton>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <>
        {success && action === "create" && (
          <Alert
            title="Επιτυχημένη καταχώρηση ραντεβού"
            text="Το νέο σας ραντεβού έχει εμφανιστεί στο ημερολόγιο."
            onClose={() => setSuccess(false)}
          />
        )}
        {error && action === "create" && (
          <Alert
            title="Αποτυχημένη καταχώρηση ραντεβού"
            text={errorMessage}
            onClose={() => setError(false)}
          />
        )}
        {success && action === "edit" && (
          <Alert
            title="Επιτυχημένη τροποποίηση ραντεβού"
            text="Το ραντεβού έχει ενημερωθέι και οι νέες πληροφορίες εμφανίζονται στο ημερολόγιο."
            onClose={() => setSuccess(false)}
          />
        )}
        {error && action === "edit" && (
          <Alert
            title="Αποτυχημένη τροποποίηση ραντεβού"
            text={errorMessage}
            onClose={() => setError(false)}
          />
        )}
      </>
    </>
  );
};

export default EventDialog;
