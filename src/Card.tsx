export default function Card({ name, sprite }: CardProps) {
	return (
		<div className="max-w-xl rounded-2xl bg-pink-300 flex flex-col items-center justify-center hover:cursor-pointer hover:shadow-lg hover:shadow-blue-500/75 hover:scale-105">
			{/* Image */}
			<img src={sprite} alt={name} className="w-full h-64 object-cover" />

			{/* Name */}
			<h2 className="text-2xl pb-6">{name}</h2>
		</div>
	);
}

interface CardProps {
	name: string;
	sprite: string;
}
