import React, { RefObject, useCallback, useRef } from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import tw from "twin.macro";
import { useDispatch } from "react-redux";
import { insertCalendarEvent } from "../features/calendar/calendarSlice";

// const overlayShow = keyframes({
//   '0%': { opacity: 0 },
//   '100%': { opacity: 1 },
// });

// const contentShow = keyframes({
//   '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
//   '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
// });

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

const Modal = ({
  start,
  title,
  description,
  price,
  name,
  action,
  triggerButtonRef,
}: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    if (action === "create") {
      dispatch(
        insertCalendarEvent({
          start: start,
          end: "2021-12-21T19:00:00.000",
          description: priceRef.current?.value || "",
          summary: nameRef.current?.value || "",
        })
      );
    }
  }, [dispatch]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="dialog-trigger" ref={triggerButtonRef}></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <Fieldset>
          <Label htmlFor="name">Όνομα:</Label>
          <Input id="name" defaultValue={name} ref={nameRef} />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="username">Ποσό:</Label>
          <Input
            id="username"
            defaultValue={price}
            type="number"
            ref={priceRef}
          />
        </Fieldset>
        <Flex>
          <DialogClose asChild>
            <Button
              onClick={handleSubmit}
              aria-label="Close"
              className="text-white bg-blue-500"
            >
              Αποθήκευση
            </Button>
          </DialogClose>
          {action === "edit" && (
            <Button className="text-red-600">Διαγραφή</Button>
          )}
        </Flex>
        <DialogClose asChild>
          <IconButton>
            <IoCloseOutline />
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
