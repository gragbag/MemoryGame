export default function Header() {
	return (
		<div className="flex justify-between mx-6">
			{/* Title and Instructions */}
			<div className="flex flex-col space-y-12">
				<h2 className="text-4xl">Pokemon Memory Game</h2>
				<p>Get points by clicking on an image but don't click on any more than once!</p>
			</div>

			{/* Score */}
			<div className="flex flex-col space-y-2">
				<p>Score: 0</p>
				<p>Best Score: 0</p>
			</div>
		</div>
	);
}
