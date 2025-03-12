export default function Header({ score, bestScore, incorrect }: HeaderProps) {
	return (
		<div className="flex justify-between items-center mx-6">
			{/* Title and Instructions */}
			<div className="flex flex-col flex-1 space-y-12">
				<h2 className="text-4xl">Pokemon Memory Game</h2>
				<p>Get points by clicking on an image but don't click on any more than once!</p>
			</div>

			{/* Incorrect Display when User chooses same Pokemon twice */}
			{incorrect && (
				<div className="flex-1 flex justify-center">
					<h2 className="text-center text-4xl text-blue-500">Incorrect, Try Again!</h2>
				</div>
			)}

			{/* Score */}
			<div className="flex flex-col flex-1 space-y-2 text-right">
				<p>Score: {score}</p>
				<p>Best Score: {bestScore}</p>
			</div>
		</div>
	);
}

interface HeaderProps {
	score: number;
	bestScore: number;
	incorrect: boolean;
}
