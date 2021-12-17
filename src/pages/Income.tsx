import React, { useEffect } from "react";
import Header from "../components/Header";
import PageContent from "../components/PageContent";

export default function Income() {
  //handle menu button color
  useEffect(() => {
    const menuButton = document.querySelector(".menu-button") as HTMLElement;
    menuButton.style.color = "white";
    return () => {
      menuButton.style.color = "initial";
    };
  }, []);
  return (
    <PageContent>
      <Header />
    </PageContent>
  );
}
