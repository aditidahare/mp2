import { useEffect, useState, useMemo } from "react";
import { getPokemonList } from "../api/pokemon";
import { Link } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

export default function Gallery() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonList(151);
      setPokemon(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    pokemon.forEach((p) => {
      p.types.forEach((t) => types.add(t.type.name));
    });
    return Array.from(types).sort();
  }, [pokemon]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filtered = useMemo(() => {
    if (selectedTypes.length === 0) return pokemon;
    return pokemon.filter((p) =>
      selectedTypes.every((type) =>
        p.types.map((t) => t.type.name).includes(type)
      )
    );
  }, [pokemon, selectedTypes]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading Pokémon Gallery...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "#0044cc" }}>Gallery</h1>
      <p>
        Pick one or more types (results are the intersection).{" "}
        <i>No filters</i> shows all.
      </p>

      {/* Filter Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {allTypes.map((type) => (
          <label key={type} style={{ textTransform: "capitalize" }}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
              style={{ marginRight: "0.3rem" }}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {filtered.map((p) => (
          <Link
            to={`/detail/${p.id}`}
            key={p.id}
            style={{
              textDecoration: "none",
              color: "#0044cc",
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              background: "#fafafa",
            }}
          >
            <img
              src={p.sprites.front_default}
              alt={p.name}
              style={{ width: "120px", height: "120px" }}
            />
            <h3>#{p.id}</h3>
            <p style={{ fontWeight: "bold" }}>
              {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
