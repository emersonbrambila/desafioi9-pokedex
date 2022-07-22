import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IPokemonList } from "../../../interfaces/pokemonList";

const PokemonSelect: React.FC<IPokemonList> = ({
  results,
  previous,
  next,
  count,
  setIdPokemonSelect,
}: IPokemonList) => {
  return (
    <Autocomplete
      id="pokemon-select"
      sx={{
        width: "100%",
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
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="100"
            //certo seria receber o ID porem a API não fornece
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              option.url.split("/")[6]
            }.png`}
            alt=""
          />
          Nome: {option.name} | Código: {option.url.split("/")[6]}
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
          sx={{ backgroundColor: "#ebf2f5" }}
        />
      )}
    />
  );
};

export default PokemonSelect;
