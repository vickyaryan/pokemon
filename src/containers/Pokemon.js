import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/PokemonActions";
import _ from "lodash";
import { useEffect } from "react";

const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);

  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      console.log('pokeData', pokeData);
      return (
        <>
        <div className="sub-title">
          <h3>weight: {pokeData.weight} cm</h3>
          <h3>height: {pokeData.height} kg</h3>
          <h3>type: {pokeData?.types[0]?.type?.name} </h3>
          </div>
          <div className={"pokemon-wrapper"}>
            <div className={"image"}>
              <h1>Sprites</h1>
              <img src={pokeData.sprites.front_default} alt="" />
              <img src={pokeData.sprites.back_default} alt="" />
              <img src={pokeData.sprites.front_shiny} alt="" />
              <img src={pokeData.sprites.back_shiny} alt="" />
            </div>
            <div className="stat-abi">
              <div className="stats">
                <h1>Stats</h1>
                {pokeData.stats.map((el, i) => {
                  return (
                    <div className="stats-bar" key={i}>
                      <label>{el.stat.name}</label>
                      <progress max="100" value={el.base_stat} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>;
    }

    return <p>error getting pokemon</p>;
  };

  return (
    <div className={"poke"}>
      <h1>{pokemonName}</h1>
      <ShowData />
    </div>
  );
};

export default Pokemon;
