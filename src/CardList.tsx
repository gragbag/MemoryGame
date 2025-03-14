import Card from "./Card";
import Header from "./Header";
import { useEffect, useState } from "react";

export default function CardList() {
	const [pokemonList, setPokemonList] = useState<PokemonCard[]>([]);
	const [randomPokemon, setRandomPokemon] = useState<PokemonCard[]>([]);
	const [score, setScore] = useState<number>(0);
	const [bestScore, setBestScore] = useState<number>(0);
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [incorrect, setIncorrect] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			if (pokemonList.length == 0) {
				const pokemonData = await fetchPokemonData();
				setPokemonList(pokemonData);
				setRandomPokemon(fetchRandomPokemon(pokemonData, selected));
			} else {
				setRandomPokemon(fetchRandomPokemon(pokemonList, selected));
			}

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

	if (loading) {
		return <h2 className="text-center text-4xl text-blue-500 pt-50">Loading...</h2>;
	}

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

const fetchPokemonData = async () => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
	const data = await response.json();
	const pokemonList: Pokemon[] = data.results;

	const pokemonCardList: PokemonCard[] = [];

	const pokemonData = await Promise.all(
		pokemonList.map(async (pokemon) => {
			const response = await fetch(pokemon.url);
			return response.json();
		})
	);

	for (let i = 0; i < pokemonList.length; i++) {
		const pokemon = pokemonList[i];
		const name: string = pokemon.name;

		const sprite: string = pokemonData[i].sprites.front_default;

		pokemonCardList.push({ name, sprite });
	}

	return pokemonCardList;
};

const fetchRandomPokemon = (pokemonList: PokemonCard[], alreadySelected: Set<string>): PokemonCard[] => {
	const randomIndices: number[] = getRandomList(pokemonList.length);
	const randomPokemon: PokemonCard[] = [];

	let newPokemonCount: number = 0;
	for (let i = 0; i < randomIndices.length; i++) {
		const pokemon = pokemonList[randomIndices[i]];
		const name: string = pokemon.name;
		const sprite: string = pokemon.sprite;

		if (!alreadySelected.has(name)) {
			newPokemonCount++;
		}

		randomPokemon.push({ name, sprite });
	}

	if (newPokemonCount == 0) {
		let replacementIndex = 0;
		while (replacementIndex < pokemonList.length && alreadySelected.has(pokemonList[replacementIndex].name)) {
			replacementIndex++; //Select the first new pokemon in the list
		}

		const pokemon = pokemonList[replacementIndex];
		const name: string = pokemon.name;
		const sprite: string = pokemon.sprite;

		randomPokemon[Math.floor(Math.random() * randomPokemon.length)] = { name, sprite }; //Replace a random index with the new pokemon
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
