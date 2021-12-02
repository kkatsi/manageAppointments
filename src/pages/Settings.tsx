import React, { useCallback } from "react";
import PageContent from "../components/PageContent";
import styled from "styled-components";
import tw from "twin.macro";
import { useDispatch } from "react-redux";
import { logoutFirebase } from "../features/user/userSlice";
import { MdArrowForwardIos } from "react-icons/md";

const SettingButton = styled.button`
  max-width: 350px;
  ${tw`w-full mx-auto flex justify-between items-center text-left font-bold px-3 bg-transparent`}
`;

export default function Settings() {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logoutFirebase());
  }, [dispatch]);
  return (
    <PageContent>
      <SettingButton onClick={handleLogout} className="text-pink-600 ">
        Αποσύνδεση
        <MdArrowForwardIos size={18} className="font-bold" />
      </SettingButton>
    </PageContent>
  );
}
