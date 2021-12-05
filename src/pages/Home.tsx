import React, { useState, useCallback } from "react";
import Div100vh from "react-div-100vh";
import { Route, Routes } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import MenuButton from "../components/MenuButton";
import Sidebar from "../components/Sidebar";
import About from "./About";
import ChangeEmail from "./ChangeEmail";
import ChangeName from "./ChangeName";
import ChangePassword from "./ChangePassword";
import MainScreen from "./MainScreen";
import Settings from "./Settings";

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
        transform: isOpen ? `translateX(250px)` : "translateX(0)",
        transition: "all .5s",
        maxWidth: "100vw",
      }}
    >
      <Sidebar handleMenu={handleMenu} />
      <MenuButton handleMenu={handleMenu} />
      <Routes>
        <Route path="" element={<MainScreen />} />
        <Route path="about" element={<About />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/change-name" element={<ChangeName />} />
        <Route path="settings/change-email" element={<ChangeEmail />} />
        <Route path="settings/change-password" element={<ChangePassword />} />
      </Routes>
    </MainContainer>
  );
}
