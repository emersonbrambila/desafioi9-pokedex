import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { StySearchFundSection } from "./styles";
import { IPokemonList } from "../../../interfaces/pokemonList";

const PokemonSelect: React.FC<IPokemonList> = ({
  results,
  previous,
  next,
  count,
  setIdPokemonSelect,
}: IPokemonList) => {

  return (
    <StySearchFundSection>
      <Autocomplete
        id="pokemon-select"
        sx={{
          width: "1440px",
        }}
        options={results}
        onChange={(e, value) => {
          setIdPokemonSelect(
            value?.url.split("/")[6] ? parseInt(value?.url.split("/")[6]) : 0
          );
        }}
        autoHighlight
        getOptionLabel={(option) => `${option.name} ${option.url.split("/")[6]}`}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{
              "& > img": { mr: 2, flexShrink: 0 },
              "& .pokemonName": {
                fontSize: "20px",
                fontWeight: "bold",
                color: "#ccc",
                textTransform: "capitalize"
              }
            }}
            {...props}
          >
            <img
              loading="lazy"
              width="100"
              //certo seria receber o ID porem a API não fornece
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${option.url.split("/")[6]
                }.png`}
              alt=""
            />
            <span className="pokemonName">{option.name}</span>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            color="warning"
            {...params}
            label="Busque seu Pokémon"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            sx={{ backgroundColor: "#fff" }}
          />
        )}
      />
    </StySearchFundSection>
  );
};

export default PokemonSelect;
