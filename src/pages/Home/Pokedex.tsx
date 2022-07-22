import React from "react";
import RecipeReviewCard from "../../components/atoms/Card/pokemon";
import { ILocalStorageObjeto } from "../../interfaces/localStorage.pokemon";
import { styled } from "@mui/material/styles";

import "./Pokedex.css";

const StyDiv = styled("div")``;
const StyImg = styled("img")`
  width: 100%;
  margin-top: 50px;
`;
const StyTypo = styled("p")`
  color: #ccc;
  text-align: center;
`;

const Pokedex: React.FC<ILocalStorageObjeto> = ({
  listaID
}: ILocalStorageObjeto) => {
  return (
    <>
      <div className="contentCards">
        {listaID.length ? listaID.map((result, index) => {
          return (
            <RecipeReviewCard
              key={Math.floor(Math.random() * 1051421) + index}
              id={result}
            />
          );
        }) : (
          <>
            <StyDiv>
              <StyImg alt="" src="img/animation_200_l5wtbbom.gif"/>
              <StyTypo>Busque seu pokemon</StyTypo>
            </StyDiv>
          </>
        )}
      </div>
    </>
  );
};

export default Pokedex;
