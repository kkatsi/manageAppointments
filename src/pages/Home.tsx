import React, { useState, useCallback } from "react";
import { Route, Routes } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import MenuButton from "../components/MenuButton";
import Sidebar from "../components/Sidebar";
import About from "./About";
import Income from "./Income";
// import ChangeEmail from "./ChangeEmail";
// import ChangeName from "./ChangeName";
// import ChangePassword from "./ChangePassword";
import MainScreen from "./MainScreen";
import Stats from "./Stats";
import WeeksofMonthStat from "./WeeksofMonthStat";
// import Settings from "./Settings";

const MainContainer = styled.div`
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
        <Route path="income" element={<Income />} />
        <Route path="stats" element={<Stats />} />
        <Route path="stats/:year/:month" element={<WeeksofMonthStat />} />
        {/* <Route path="settings" element={<Settings />} />
        <Route path="settings/change-name" element={<ChangeName />} />
        <Route path="settings/change-email" element={<ChangeEmail />} />
        <Route path="settings/change-password" element={<ChangePassword />} /> */}
      </Routes>
    </MainContainer>
  );
}
