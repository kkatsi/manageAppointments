import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import FormInput from "../components/FormInput";
import PageContent from "../components/PageContent";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginFirebase } from "../features/user/userSlice";
import { RootState } from "../app/store";

const Background = styled.img`
  object-fit: cover;
  z-index: -1;
  ${tw`absolute top-0 left-0 w-full h-full`}
`;

const Form = styled.form`
  min-width: 300px;
  ${tw`flex flex-col items-center justify-center my-4`}
`;

const Button = styled.button`
  ${tw`text-white bg-gradient-to-r from-gray-700 via-pink-500 to-pink-300 rounded-full w-full py-2 mt-3`}
`;

const Header = styled.h1`
  ${tw`text-4xl text-pink-700 text-center font-light mb-5`}
`;

const Spinner = () => (
  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
);

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      setLoginLoading(true);
      dispatch(
        loginFirebase({
          email: emailRef.current?.value || "",
          password: passwordRef.current?.value || "",
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isLoading) setLoginLoading(false);
  }, [isLoading]);

  return (
    <PageContent centerX={true} centerY={true}>
      <>
        <Background src={require("../assets/bg-light.webp").default} />
        <Header>Καλώς Ορίσατε.</Header>
        <Form onSubmit={handleLogin}>
          <FormInput
            type="text"
            placeholder="Email"
            reference={emailRef}
            Icon={<FaEnvelope />}
          />
          <FormInput
            type="password"
            placeholder="Password"
            reference={passwordRef}
            Icon={<FaLock />}
          />
          <Button
            type="submit"
            className="relative flex justify-center items-center"
            disabled={loginLoading}
          >
            {!loginLoading ? "Είσοδος" : <Spinner />}
          </Button>
        </Form>
      </>
    </PageContent>
  );
}
