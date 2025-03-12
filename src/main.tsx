import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CardList from "./CardList";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<div className="min-h-screen bg-linear-to-b from-red-500 to-gray-200 pokemon-font">
			<CardList />
		</div>
	</StrictMode>
);
