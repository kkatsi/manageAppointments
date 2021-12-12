import React, { RefObject, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import tw from "twin.macro";
import { useSelector } from "react-redux";
import { insertCalendarEvent } from "../features/calendar/calendarSlice";
import { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import Alert from "./Alert";

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
  ${tw`flex flex-col justify-center mt-12`}
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
  gap: 20px;
  ${tw`flex items-center mb-5`}
`;

const Label = styled.label`
  font-size: 15px;
  width: 90px;
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
  title: string;
  description: string;
  price: number;
  name: string;
  action: string;
  triggerButtonRef: RefObject<HTMLButtonElement>;
}

const EventDialog = ({
  start,
  title,
  description,
  price,
  name,
  action,
  triggerButtonRef,
}: Props) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const calendarLoading = useSelector(
    (state: RootState) => state.calendar.isLoading
  );
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (action === "create") {
        dispatch(
          insertCalendarEvent({
            start: start,
            end: "2021-12-21T19:00:00.000",
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
    [dispatch, start, action]
  );
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
            <Fieldset>
              <Label htmlFor="name">Όνομα:</Label>
              <Input id="name" defaultValue={name} ref={nameRef} required />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="username">Ποσό:</Label>
              <Input
                id="username"
                defaultValue={price}
                type="number"
                ref={priceRef}
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
                <Button className="text-red-600">Διαγραφή</Button>
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
        {success && (
          <Alert
            title="Επιτυχημένη καταχώρηση ραντεβού"
            text="Το νέο σας ραντεβού έχει εμφανιστεί στο ημερολόγιο."
            onClose={() => setSuccess(false)}
          />
        )}
        {error && (
          <Alert
            title="Αποτυχημένη καταχώρηση ραντεβού"
            text={errorMessage}
            onClose={() => setError(false)}
          />
        )}
      </>
    </>
  );
};

export default EventDialog;
