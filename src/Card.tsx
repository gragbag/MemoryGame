export default function Card({ name, sprite, onClick, disabled }: CardProps) {
	return (
		<div
			className="max-w-xl rounded-2xl bg-pink-300 flex flex-col items-center justify-center hover:cursor-pointer hover:shadow-lg hover:shadow-blue-500/75 hover:scale-105 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}"
			onClick={disabled ? undefined : onClick}
		>
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
	onClick: () => void;
	disabled: boolean;
}
