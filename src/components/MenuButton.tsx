import styled from "styled-components";
import tw from "twin.macro";
import { FiMenu } from "react-icons/fi";

const MenuButtonContainer = styled.div`
  z-index: 9999999999;
  ${tw`absolute top-3 left-5 flex items-center cursor-pointer text-gray-800`}
`;

interface Props {
  handleMenu: () => void;
}

export default function MenuButton({ handleMenu }: Props) {
  return (
    <MenuButtonContainer onClick={handleMenu} className="menu-button">
      {" "}
      <FiMenu size={30} className="mr-2" />
      <span className="font-bold">Μενού</span>
    </MenuButtonContainer>
  );
}
