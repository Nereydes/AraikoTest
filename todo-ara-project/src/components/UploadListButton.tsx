import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ButtonWithIcon } from "./utils/Button";
import { useContext } from "react";
import { ListContext } from "../App";
import { Task } from "../services/TaskService";

export const UploadListButton = (props: { className?: string }) => {
	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [, setTasks] = context.tasksState;

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const json = e.target?.result as string;
				const tasksFromFile: Task[] = JSON.parse(json);
				setTasks(tasksFromFile);
			} catch (error) {
				console.error("Erreur lors du chargement du fichier JSON :", error);
				alert("Le fichier chargé n'est pas un JSON valide.");
			}
		};
		reader.readAsText(file);
	};
	return (
		<ButtonWithIcon {...props} icon={<ArrowUpTrayIcon className="w-5 h-5" />} label="Importer une liste" variant="yellow">
			<input type="file" accept=".json" onChange={handleFileChange} />
		</ButtonWithIcon>
	);
};
