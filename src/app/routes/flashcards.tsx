import { createFileRoute } from "@tanstack/react-router";
import { FlashcardsPage } from "../pages/FlashcardsPage";

export const Route = createFileRoute("/flashcards")({
	component: FlashcardsPage,
});
