import React from "react";
import RecipeReviewCard from "../../components/atoms/Card/pokemon";
import { ILocalStorageObjeto } from "../../interfaces/localStorage.pokemon";
import "./Pokedex.css";


const Pokedex: React.FC<ILocalStorageObjeto> = ({
  listaID
}: ILocalStorageObjeto) => {
  return (
    <>
      {listaID.map((result, index) => {
        return (
          <RecipeReviewCard
            key={Math.floor(Math.random() * 1051421) + index}
            id={result}
          />
        );
      })}
    </>
  );
};

export default Pokedex;
