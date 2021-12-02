import React from "react";
import styled from "styled-components";
import Div100vh from "react-div-100vh";
import tw from "twin.macro";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { Link, LinkProps, useResolvedPath, useMatch } from "react-router-dom";
import { FiInfo, FiInbox } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";

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

const BottomContainer = styled.div`
  ${tw`w-full flex flex-col mt-auto`}
`;

const BottomLink = styled(Link)`
  ${tw`w-full flex items-center justify-start px-3 py-2 text-gray-600 bg-gray-100 rounded-md`}
`;

interface Props {
  handleMenu: () => void;
}

export default function Sidebar({ handleMenu }: Props) {
  const profilePic = useSelector(
    (state: RootState) => state.user.value.photoURL
  );
  const name = useSelector((state: RootState) => state.user.value.displayName);

  return (
    <SideBarContainer>
      <ProfileImage src={profilePic} />
      <Name className="dark:text-white">{name}</Name>
      <Menu>
        <MenuItem>
          <CustomMenuLink to="/" onClick={handleMenu}>
            <FiInbox size={18} className="mr-2" />
            Tasks
          </CustomMenuLink>
        </MenuItem>
        <MenuItem>
          <CustomMenuLink to="/about" onClick={handleMenu}>
            <FiInfo size={18} className="mr-2" />
            About
          </CustomMenuLink>
        </MenuItem>
      </Menu>
      <BottomContainer>
        <BottomLink to="/settings" onClick={handleMenu}>
          <IoMdSettings size={18} className="mr-2" /> Ρυθμίσεις
        </BottomLink>
      </BottomContainer>
    </SideBarContainer>
  );
}
