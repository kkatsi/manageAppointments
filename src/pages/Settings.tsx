import React, { useCallback } from "react";
import PageContent from "../components/PageContent";
import styled from "styled-components";
import tw from "twin.macro";
import { useDispatch } from "react-redux";
import {
  gapiLogOut,
  //  logoutFirebase
} from "../features/user/userSlice";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import SettingsPhoto from "./SettingsPhoto";

const SettingButton = styled.button`
  max-width: 400px;
  ${tw`w-full mx-auto flex justify-between items-center text-left font-bold mb-5 bg-transparent`}
`;

const CustomLink = styled(Link)`
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

const LinkButton = ({
  to,
  children,
}: {
  to: string;
  children: string | JSX.Element | JSX.Element[];
}) => {
  return (
    <CustomLink to={to} className="text-gray-600">
      {children}
      <MdArrowForwardIos size={18} className="font-bold" />
    </CustomLink>
  );
};
export default function Settings() {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(gapiLogOut());
  }, [dispatch]);
  return (
    <PageContent>
      <SettingsPhoto />
      <LinkButton to="change-name">Αλλαγή Ονόματος</LinkButton>
      <LinkButton to="change-email">Αλλαγή Email</LinkButton>
      <LinkButton to="change-password">Αλλαγή Κωδικού Πρόσβασης</LinkButton>
      <LogoutButton action={handleLogout}>Αποσύνδεση</LogoutButton>
    </PageContent>
  );
}
