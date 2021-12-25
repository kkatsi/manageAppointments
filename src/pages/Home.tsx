import React, { useState, useCallback } from "react";
import { Route, Routes } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
// import DeleteAlert from "../components/DeleteAlert";
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

  const handleMenuClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e.target);
    if (
      document.querySelector(".sidebar")?.contains(e.target as Node) ||
      document.querySelector(".menu-button")?.contains(e.target as Node)
    ) {
      return;
    } else {
      // Clicked outside the box
      setOpen(false);
    }
  }, []);

  // useEffect(() => {
  //   window.addEventListener('click', function(e){
  //     if (document.querySelector('.sidebar')?.contains(e.target)){
  //       return
  //     } else{
  //       // Clicked outside the box

  //     }
  //   });
  //   return () => {
  //     cleanup
  //   }
  // }, [])

  return (
    <MainContainer
      style={{
        transform: isOpen ? `translateX(250px)` : "translateX(0)",
        transition: "all .5s",
        maxWidth: "100vw",
      }}
      onClick={handleMenuClose}
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
