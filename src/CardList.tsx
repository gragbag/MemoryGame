import Card from "./Card";
import Header from "./Header";
import { useEffect, useState } from "react";

export default function CardList() {
	const [randomPokemon, setRandomPokemon] = useState<PokemonCard[]>([]);
	const [score, setScore] = useState<number>(0);
	const [bestScore, setBestScore] = useState<number>(0);
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [incorrect, setIncorrect] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			const pokemonData: PokemonCard[] = await fetchRandomPokemon(selected);
			setRandomPokemon(pokemonData);

			setLoading(false);
		};

		fetchData();
	}, [score]);

	const updateScore = (name: string) => {
		if (selected.has(name)) {
			setScore(0);
			setSelected(new Set());
			setIncorrect(true);
			return;
		}

		setScore((prevScore: number) => prevScore + 1);
		if (score + 1 > bestScore) {
			setBestScore(score + 1);
		}

		setSelected((prevSet) => {
			const newSet = new Set(prevSet);
			newSet.add(name);
			return newSet;
		});

		setIncorrect(false);
	};

	return (
		<>
			<Header score={score} bestScore={bestScore} incorrect={incorrect} />
			<div className="flex flex-wrap gap-12 mt-12 mx-12 justify-center">
				{randomPokemon.map((pokemon, index) => (
					<Card key={index} name={pokemon.name} sprite={pokemon.sprite} onClick={() => updateScore(pokemon.name)} disabled={loading} />
				))}
			</div>
		</>
	);
}

const fetchRandomPokemon = async (alreadySelected: Set<string>): Promise<PokemonCard[]> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
	const data = await response.json();
	const pokemonList: Pokemon[] = data.results;

	const randomIndices: number[] = getRandomList(pokemonList.length);
	const randomPokemon: PokemonCard[] = [];

	let newPokemonCount: number = 0;
	for (let i = 0; i < randomIndices.length; i++) {
		const pokemon = pokemonList[randomIndices[i]];
		const name: string = pokemon.name;

		const pokemonResponse = await fetch(pokemon.url);
		const pokemonData = await pokemonResponse.json();
		const sprite: string = pokemonData.sprites.front_default;

		if (!alreadySelected.has(name)) {
			newPokemonCount++;
		}

		randomPokemon.push({ name, sprite });
	}

	if (newPokemonCount == 0) {
		let replacementIndex = 0;
		while (replacementIndex < pokemonList.length && alreadySelected.has(pokemonList[replacementIndex].name)) {
			replacementIndex++;
		}

		const pokemon = pokemonList[replacementIndex];
		const name: string = pokemon.name;

		const pokemonResponse = await fetch(pokemon.url);
		const pokemonData = await pokemonResponse.json();
		const sprite: string = pokemonData.sprites.front_default;

		randomPokemon[Math.floor(Math.random() * randomPokemon.length)] = { name, sprite };
	}

	return randomPokemon;
};

const getRandomList = (upperLimit: number): number[] => {
	const indices: number[] = [];
	let i;
	while (indices.length < 12) {
		i = Math.floor(Math.random() * upperLimit);
		if (indices.indexOf(i) === -1) {
			indices.push(i);
		}
	}
	return indices;
};

interface Pokemon {
	name: string;
	url: string;
}

interface PokemonCard {
	name: string;
	sprite: string;
}
