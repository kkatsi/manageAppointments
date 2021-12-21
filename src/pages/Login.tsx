import React, {
  useCallback,
  // useEffect, useRef, useState
} from "react";
import styled from "styled-components";
import tw from "twin.macro";
// import FormInput from "../components/FormInput";
import PageContent from "../components/PageContent";
// import { FaEnvelope, FaLock } from "react-icons/fa";
import {
  useDispatch,
  //  useSelector
} from "react-redux";
import {
  gapiLogin,
  //  loginFirebase
} from "../features/user/userSlice";

const Background = styled.img`
  object-fit: cover;
  z-index: -1;
  ${tw`absolute top-0 left-0 w-full h-full`}
`;

const Button = styled.button`
  max-width: 350px;
  ${tw`text-white bg-gradient-to-r from-gray-700 via-pink-500 to-pink-300 rounded-full w-full py-2 mt-3`}
`;

const Header = styled.h1`
  ${tw`text-4xl text-pink-700 text-center font-light mb-5`}
`;

export default function Login() {
  const dispatch = useDispatch();

  const oAuthLogin = useCallback(() => {
    dispatch(gapiLogin());
  }, [dispatch]);
  return (
    <PageContent centerX={true} centerY={true} div100>
      <Background src={require("../assets/bg-light.webp").default} />
      <Header>Καλώς Ορίσατε.</Header>
      {/* <Form onSubmit={handleLogin}>
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
        </Form> */}
      <Button
        type="submit"
        className="relative flex justify-center items-center"
        onClick={oAuthLogin}
        // disabled={loginLoading}
      >
        {/* {!loginLoading ? "Είσοδος" : <Spinner />} */}
        Είσοδος με λογαριασμό Google
      </Button>
    </PageContent>
  );
}
