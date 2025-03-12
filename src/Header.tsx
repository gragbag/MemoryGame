export default function Header({ score, bestScore }: HeaderProps) {
	return (
		<div className="flex justify-between mx-6">
			{/* Title and Instructions */}
			<div className="flex flex-col space-y-12">
				<h2 className="text-4xl">Pokemon Memory Game</h2>
				<p>Get points by clicking on an image but don't click on any more than once!</p>
			</div>

			{/* Score */}
			<div className="flex flex-col space-y-2">
				<p>Score: {score}</p>
				<p>Best Score: {bestScore}</p>
			</div>
		</div>
	);
}

interface HeaderProps {
	score: number;
	bestScore: number;
}
