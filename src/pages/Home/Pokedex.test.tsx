import React from "react";
import { render, screen } from "@testing-library/react";
import Pokedex from "./Pokedex";

const listaPokemon = {listaID: [0]}

test("renders Pokédex link", () => {
  render(<Pokedex listaID={listaPokemon.listaID} />);
  const linkElement = screen.getByText(/Pokédex/i);
  expect(linkElement).toBeInTheDocument();
});
