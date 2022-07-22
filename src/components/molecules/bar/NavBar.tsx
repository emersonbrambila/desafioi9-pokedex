import React from "react";
import { StyDiv, StyImg, StyNav } from "./styles";

const NavBar: React.FC = () => {
  return (
    <StyNav>
      <StyDiv>
        <StyImg alt="Teste Ímpar" src="img/logo-teste.png" className="logo-NavBar" />
      </StyDiv>
    </StyNav>
  );
};

export default NavBar;
