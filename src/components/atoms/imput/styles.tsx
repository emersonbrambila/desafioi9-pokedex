import { styled } from "@mui/material/styles";

export const StySearchFundSection = styled("section")`
  background: transparent url('img/fundo-busca.png') no-repeat padding-box;
  background-size: 100%;
  opacity: 1;
  padding: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .MuiAutocomplete-root{
    border: none;
  }

  .MuiFormControl-root{
    background: transparent;
  }

  .MuiOutlinedInput-root{
    background: #fff;
    border-radius: 30px;
  }

  #pokemon-select-label{
    padding-left: 10px;
  }

  .MuiAutocomplete-endAdornment {
    right: 19px !important;
  }
`;