import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import tw from "twin.macro";

const DeleteContainer = styled(motion.div)`
  ${tw`bg-white text-red-600 font-semibold text-center py-2 fixed w-full bottom-0 rounded-t-2xl`}
`;

export default function DeleteAlert() {
  return (
    <DeleteContainer initial={{ y: 50 }} animate={{ y: 0 }}>
      <span>Χωρίς σύνδεση στο διαδίκτυο</span>
    </DeleteContainer>
  );
}
