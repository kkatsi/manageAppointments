import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Div100vh from "react-div-100vh";

const Background = styled.img`
  object-fit: cover;
  z-index: 99;
  ${tw`absolute top-0 left-0 w-screen h-screen`}
`;

export default function LoadingScreen() {
  return (
    <>
      <Background src={require("../assets/bg-light.webp").default} />
      <Div100vh
        className="flex items-center justify-center w-screen absolute top-0 left-0"
        style={{ zIndex: "100" }}
      >
        <div className="flex justify-center items-center space-x-1 text-gray-700">
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

          <div>Loading ...</div>
        </div>
      </Div100vh>
    </>
  );
}
