import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getPokemonDetalhes } from "../../../services/api";
import { IDetalhesPokemon } from "../../../interfaces/detalhes.pokemon";
import { ILocalStorageObjeto } from "../../../interfaces/localStorage.pokemon";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export interface IPokemonListlocal {
  id: number;
}

const RecipeReviewCard: React.FC<IPokemonListlocal> = ({
  id,
}: IPokemonListlocal) => {
  const [expanded, setExpanded] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [pokemonDetalhes, setPokemonDetalhes] = useState(
    {} as IDetalhesPokemon
  );

  const consultaLocalHistori = () => {
    const localStorageString = localStorage.getItem("pokemon_favorito");
    return JSON.parse(
      localStorageString === null ? '{"listaID":null}' : localStorageString
    ) as ILocalStorageObjeto;
  };

  const buscaDetalhesPokemon = async (id: number) => {
    const pokemonDetalhesSet = await getPokemonDetalhes(id);
    if (pokemonDetalhesSet !== null) {
      setPokemonDetalhes(pokemonDetalhesSet);
    }
  };

  useEffect(() => {
    const favoritoPokemonLocal = (id: number) => {
      const localStorageObjeto = consultaLocalHistori();
      if (localStorageObjeto.listaID.find((i) => i === id) === id) {
        setFavorito(true);
      }
    };
    return () => {
      buscaDetalhesPokemon(id);
      favoritoPokemonLocal(id);
    };
  }, [id]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoritoClick = (id: number) => {
    const localStorageObjeto = consultaLocalHistori();
    if (
      localStorageObjeto.listaID === null ||
      localStorageObjeto.listaID.length === 0
    ) {
      localStorage.setItem(
        "pokemon_favorito",
        JSON.stringify({ listaID: [id] })
      );
      setFavorito(true);
    } else {
      if (localStorageObjeto.listaID.find((i) => i === id) === id) {
        localStorage.setItem(
          "pokemon_favorito",
          JSON.stringify({
            listaID: localStorageObjeto.listaID.filter((i) => i !== id),
          })
        );
        setFavorito(false);
      } else {
        localStorageObjeto.listaID.push(id);
        localStorage.setItem(
          "pokemon_favorito",
          JSON.stringify({
            listaID: localStorageObjeto.listaID,
          })
        );
        setFavorito(true);
      }
    }
  };

  return (
    <>
      {pokemonDetalhes.name !== undefined ? (
        <>
          <Card sx={{ margin: "10px" }}>
            <CardHeader
              avatar={
                <Avatar
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetalhes.id}.png`}
                  aria-label="recipe"
                />
              }
              title={pokemonDetalhes.name}
              subheader={`Tipo: ${pokemonDetalhes.types[0].type.name}`}
            />
            <CardMedia
              component="img"
              height="194"
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDetalhes.id}.svg`}
              alt={pokemonDetalhes.name}
            />
            <CardActions disableSpacing>
              <IconButton
                aria-label="Adicionar aos Favoritos"
                onClick={() => handleFavoritoClick(pokemonDetalhes.id)}
              >
                {favorito ? (
                  <FavoriteIcon color="secondary" />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Ver mais"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  <b>Mais Detalhes:</b>
                </Typography>
                <Typography>
                  <b>Peso: </b>
                  {`${pokemonDetalhes.weight}`}
                </Typography>
                <Typography>
                  <b>Tamanho: </b>
                  {`${pokemonDetalhes.height}`}
                </Typography>
                {/* <Typography><b></b>{`Lista de tipos: ${pokemonDetalhes.name}`}</Typography> */}
                {/* <Typography><b></b>{`Lista de habilidades: ${pokemonDetalhes.name}`}</Typography> */}
                <Typography>
                  <b>Estatísticas de velocidade: </b>
                  {`${pokemonDetalhes.stats[5].base_stat}`}
                </Typography>
                <Typography>
                  <b>Defesa: </b>
                  {`${pokemonDetalhes.stats[2].base_stat}`}
                </Typography>
                <Typography>
                  <b>Ataque: </b>
                  {`${pokemonDetalhes.stats[1].base_stat}`}
                </Typography>
                <Typography>
                  <b>Hp: </b>
                  {`${pokemonDetalhes.stats[0].base_stat}`}
                </Typography>
                {/* <Typography><b>{`Cada passo de sua evolução: ${pokemonDetalhes.name}`}</Typography>                         */}
              </CardContent>
            </Collapse>
          </Card>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default RecipeReviewCard;
