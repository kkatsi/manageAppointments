import React from "react";
import Div100vh from "react-div-100vh";

interface Props {
  centerX?: boolean;
  centerY?: boolean;
  children: JSX.Element;
}

export default function PageContent({ centerX, centerY, children }: Props) {
  return (
    <Div100vh
      className={`${centerX ? "items-center" : "items-start"} ${
        centerY ? "justify-center" : "justify-start"
      } py-20 mx-auto container flex-col flex px-2`}
    >
      {children}
    </Div100vh>
  );
}
