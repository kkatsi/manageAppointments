import React, { useState, useCallback } from "react";
import Div100vh from "react-div-100vh";
import { Route, Routes } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import MenuButton from "../components/MenuButton";
import Sidebar from "../components/Sidebar";
import About from "./About";
import MainScreen from "./MainScreen";

const MainContainer = styled(Div100vh)`
  ${tw`bg-gray-100`}
`;

export default function Home() {
  const [isOpen, setOpen] = useState(false);

  const handleMenu = useCallback(() => {
    setOpen((prevState: boolean) => !prevState);
  }, []);

  return (
    <MainContainer
      style={{
        transform: isOpen ? `translateX(250px)` : "translateX(0px)",
        transition: "all .5s",
      }}
    >
      <Sidebar handleMenu={handleMenu} />
      <MenuButton handleMenu={handleMenu} />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="about" element={<About />} />
      </Routes>
    </MainContainer>
  );
}
