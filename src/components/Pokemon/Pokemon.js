
import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
// import { toFirstCharUppercase } from "../../util/constants";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent
} from "@material-ui/core";

import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import AOS from 'aos';
import 'aos/dist/aos.css'; 

import './Pokemon.css';

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="poke-card">
              <CardHeader className="title"
                avatar={
                  <Avatar aria-label="recipe">
                    <img src={front_default} alt="poke icon" />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={species.name}
              />
              <CardMedia data-aos="zoom-in-down"
                title="Paella dish" className="animate">
                <img style={{ width: "200px", height: "200px", margin: "0 auto" }} src={fullImageUrl} alt="pokemon" />
              </CardMedia>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {"Species: "}
                  <Link href={species.url}>{species.name} </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">Height: {height} </Typography>
                <Typography variant="body2" color="textSecondary" component="p">Weight: {weight} </Typography>
                <Typography variant="body2" color="textSecondary" component="p"> Types:</Typography>
                {types.map((typeInfo) => {
                  const { type } = typeInfo;
                  const { name } = type;
                  return <Button className="btn" key={name} variant="contained"> {`${name}`}</Button>;
                })}
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <div className="container">        
            <Button color="primary" variant="contained" onClick={() => history.push("/")}>
              back to pokedex
            </Button>
        </div>
      )}
    </>
  );
};

export default Pokemon;
