import React from "react";
import { StyDiv, StyImg, StyNav } from "./styles";

const NavBar: React.FC = () => {
  return (
    <StyNav>
      <StyDiv><StyImg 
      alt="PokeApi Logo" src="img/pokeapi.png" className="logo-NavBar" /></StyDiv>
    </StyNav>
  );
};

export default NavBar;
