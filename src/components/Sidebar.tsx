import React, { useCallback } from "react";
import styled from "styled-components";
import Div100vh from "react-div-100vh";
import tw from "twin.macro";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, LinkProps, useResolvedPath, useMatch } from "react-router-dom";
import { IoIosCalendar } from "react-icons/io";
import { IoStatsChartOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { gapiLogOut } from "../features/user/userSlice";

const SideBarContainer = styled(Div100vh)`
  width: 250px;
  z-index: 100;
  transform: translateX(-250px);
  overflow-y: hidden;
  ${tw`absolute flex flex-col items-center px-5 py-16`};
`;

const ProfileImage = styled.img`
  object-fit: cover;
  object-position: center;
  ${tw`rounded-full w-20 h-20 border-4 border-primary-500 self-start`}
`;

const Name = styled.h2`
  ${tw`text-3xl font-bold self-start text-gray-800 py-5`}
`;

const Menu = styled.ul`
  ${tw`flex w-full flex-col p-1`}
`;
const MenuItem = styled.li`
  ${tw`flex-1 text-indigo-100 text-sm mb-2`}
`;

const MenuLink = styled(Link)`
  border-radius: 5px;
  ${tw`w-full flex items-center px-3 py-2`}
`;

const CustomMenuLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <MenuLink
      className={
        match ? "bg-primary-500 text-white" : "bg-transparent text-primary-500"
      }
      to={to}
      {...props}
    >
      {children}
    </MenuLink>
  );
};

const SettingButton = styled.button`
  max-width: 400px;
  ${tw`w-full mx-auto flex justify-between items-center text-left font-bold mb-5 bg-transparent`}
`;

const LogoutButton = ({
  action,
  children,
}: {
  action: () => void;
  children: string | JSX.Element | JSX.Element[];
}) => {
  return (
    <SettingButton onClick={action} className="text-pink-600">
      {children}
      <MdArrowForwardIos size={18} className="font-bold" />
    </SettingButton>
  );
};

const BottomContainer = styled.div`
  ${tw`w-full flex flex-col mt-auto`}
`;

interface Props {
  handleMenu: () => void;
}

export default function Sidebar({ handleMenu }: Props) {
  const profilePic = useSelector(
    (state: RootState) => state.user.value.photoURL
  );
  const name = useSelector((state: RootState) => state.user.value.displayName);
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(gapiLogOut());
  }, [dispatch]);
  return (
    <SideBarContainer>
      <ProfileImage src={profilePic} />
      <Name className="dark:text-white">{name}</Name>
      <Menu>
        <MenuItem>
          <CustomMenuLink to="/" onClick={handleMenu}>
            <IoIosCalendar size={18} className="mr-2" />
            Ραντεβού
          </CustomMenuLink>
        </MenuItem>
        <MenuItem>
          <CustomMenuLink to="/income" onClick={handleMenu}>
            <FaRegMoneyBillAlt size={18} className="mr-2" />
            Έσοδα
          </CustomMenuLink>
        </MenuItem>
        <MenuItem>
          <CustomMenuLink to="/stats" onClick={handleMenu}>
            <IoStatsChartOutline size={18} className="mr-2" />
            Στατιστικά
          </CustomMenuLink>
        </MenuItem>
      </Menu>
      <BottomContainer>
        <LogoutButton action={handleLogout}>Αποσύνδεση</LogoutButton>
      </BottomContainer>
    </SideBarContainer>
  );
}
