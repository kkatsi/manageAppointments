import styled from "styled-components";
import tw from "twin.macro";
import { FiMenu } from "react-icons/fi";

const MenuButtonContainer = styled.div`
  ${tw`absolute top-3 left-3 flex items-center cursor-pointer`}
`;

interface Props {
  handleMenu: () => void;
}

export default function MenuButton({ handleMenu }: Props) {
  return (
    <MenuButtonContainer onClick={handleMenu}>
      {" "}
      <FiMenu size={30} className="mr-2" />
      <span className="font-bold">Μενού</span>
    </MenuButtonContainer>
  );
}