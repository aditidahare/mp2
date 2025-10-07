import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(res.data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const prevId = Number(id) > 1 ? Number(id) - 1 : 151;
  const nextId = Number(id) < 151 ? Number(id) + 1 : 1;

  if (loading) return <p style={{ padding: "2rem" }}>Loading Pokémon...</p>;
  if (!pokemon) return <p>No Pokémon found</p>;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ color: "#0044cc" }}>
        #{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: "200px", height: "200px" }}
      />
      <p><b>Height:</b> {pokemon.height}</p>
      <p><b>Weight:</b> {pokemon.weight}</p>

      <p>
        <b>Types:</b>{" "}
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
      <p>
        <b>Abilities:</b>{" "}
        {pokemon.abilities.map((a) => a.ability.name).join(", ")}
      </p>

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "2rem" }}>
        <button
          onClick={() => navigate(`/detail/${prevId}`)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0044cc",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ⬅ Previous
        </button>
        <button
          onClick={() => navigate(`/detail/${nextId}`)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0044cc",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Next ➡
        </button>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/" style={{ color: "#0044cc", textDecoration: "none" }}>
          ← Back to List
        </Link>
      </div>
    </div>
  );
}
