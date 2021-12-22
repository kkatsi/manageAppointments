import React from "react";
import Div100vh from "react-div-100vh";

interface Props {
  centerX?: boolean;
  centerY?: boolean;
  div100?: boolean;
  children: JSX.Element[] | JSX.Element;
}

export default function PageContent({
  div100,
  centerX,
  centerY,
  children,
}: Props) {
  return (
    <>
      {!div100 && (
        <div
          className={`${centerX ? "items-center" : "items-start"} ${
            centerY ? "justify-center" : "justify-start"
          } pt-20 pb-10 mx-auto container flex-col flex px-5 min-h-screen content`}
        >
          {children}
        </div>
      )}
      {div100 && (
        <Div100vh
          className={`${centerX ? "items-center" : "items-start"} ${
            centerY ? "justify-center" : "justify-start"
          } pt-20 pb-10 mx-auto container flex-col flex px-5 min-h-screen content`}
        >
          {children}
        </Div100vh>
      )}
    </>
  );
}
