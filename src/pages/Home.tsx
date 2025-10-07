import { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemon";
import { Link } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "name" | "height" | "weight">("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await getPokemonList(151); // full gen 1
    setPokemonList(data);
  }

  const filtered = pokemonList
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let valA: number | string = a[sortBy];
      let valB: number | string = b[sortBy];

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (order === "asc") return valA > valB ? 1 : -1;
      else return valA < valB ? 1 : -1;
    });

  return (
    <div style={{ padding: "2rem", color: "#0044cc" }}>
      <h1 style={{ color: "#0044cc" }}>List</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <input
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #aaa",
          }}
        />

        <label>Sort by:</label>
        <select
          onChange={(e) => setSortBy(e.target.value as any)}
          value={sortBy}
          style={{ padding: "0.4rem" }}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="weight">Weight</option>
        </select>

        <label>Order:</label>
        <select
          onChange={(e) => setOrder(e.target.value as any)}
          value={order}
          style={{ padding: "0.4rem" }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <p style={{ marginLeft: "auto", color: "#555" }}>
          Showing {filtered.length} of {pokemonList.length}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
        }}
      >
        {filtered.map((p) => (
          <Link
            key={p.id}
            to={`/detail/${p.id}`}
            style={{
              textDecoration: "none",
              color: "#0044cc",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={p.sprites.front_default}
              alt={p.name}
              style={{ width: "60px", height: "60px" }}
            />
            <span>
              {p.id}. {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
