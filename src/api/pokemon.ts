import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 50, offset = 0) {
  const { data } = await axios.get(`${BASE_URL}/pokemon`, {
    params: { limit, offset },
  });
  const results = await Promise.all(
    data.results.map(async (p: any) => {
      const details = await axios.get(p.url);
      return details.data;
    })
  );
  return results;
}

export async function getPokemonByName(name: string) {
  const { data } = await axios.get(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
  return data;
}
