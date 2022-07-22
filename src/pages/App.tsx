import React, { useEffect, useState } from "react";
import CountrySelect from "../components/atoms/imput/autoCompleteImput";
import NavBar from "../components/molecules/bar/NavBar";
import Pokedex from "./Home/Pokedex";
import "./App.css";
import { getAllPokemonList } from "../services/api";
import { IPokemonList } from "../interfaces/pokemonList";
import { StySection } from "./styles";
import { ILocalStorageObjeto } from "../interfaces/localStorage.pokemon";

const App: React.FC = () => {
  const [listaPokemon, setListaPokemon] = useState({
    count: 0,
    next: "",
    previous: "",
    results: [
      {
        name: "Não Listado",
        url: "",
      },
    ],
  } as unknown as IPokemonList);
  const [idPokemonSelecionado, setIdPokemonSelecionado] = useState({
    listaID: [0],
  });
  const [idPokemonSelect, setIdPokemonSelect] = useState(0);

  const carregarListaPokemon = async () => {
    setListaPokemon(await getAllPokemonList());
  };

  const consultaLocalHistori = () => {
    
    if (localStorage.getItem("pokemon_favorito") === null) {
      localStorage.setItem(
        "pokemon_favorito",
        JSON.stringify({ listaID: [] })
      );
    }
    const localStorageString = localStorage.getItem("pokemon_favorito")
    setIdPokemonSelecionado(
      JSON.parse(
        localStorageString === null ? '{"listaID":null}' : localStorageString
      ) as ILocalStorageObjeto
    );
  };

  useEffect(() => {
    return () => {
      carregarListaPokemon();
      consultaLocalHistori();
    };
  }, []);

  useEffect(() => {
    if (idPokemonSelect !== 0) {
      const novo = idPokemonSelecionado;
      novo.listaID.push(idPokemonSelect);
      setIdPokemonSelecionado(novo);
      setIdPokemonSelect(0);
    }
    return () => {
      if (idPokemonSelect !== 0) {
        setIdPokemonSelect(0);
      }
    };
  }, [idPokemonSelecionado, idPokemonSelect]);

  return (
    <>
      <NavBar />
      {listaPokemon.count !== 0 ? (
        <>
          <CountrySelect
            results={listaPokemon.results}
            setIdPokemonSelect={setIdPokemonSelect}
          />
        </>
      ) : (
        ""
      )}
      {idPokemonSelecionado.listaID[0] !== 0 ? (
        <>
          <StySection>
            <Pokedex listaID={idPokemonSelecionado.listaID} />
          </StySection>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default App;