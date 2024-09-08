import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Button, ButtonWithIcon } from "./utils/Button";
import { useContext } from "react";
import { ListContext } from "../App";
import { Task } from "../services/TaskService";
import { generateClassName } from "../utils/StyleUtilities";
import { addList, createNewList } from "../services/ListService";

export const UploadListButton = (props: { className?: string }) => {
	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [lists, setLists] = context.listsState;

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const json = e.target?.result as string;
				const tasksFromFile: Task[] = JSON.parse(json);
				const newList = createNewList(lists);
				newList.tasks = tasksFromFile;
				setLists((prev) => addList(newList, prev));
			} catch (error) {
				console.error("Erreur lors du chargement du fichier JSON :", error);
				alert("Le fichier chargé n'est pas un JSON valide.");
			}
		};
		reader.readAsText(file);
	};
	return (
		<Button variant="yellow" size="md" className={generateClassName(props.className, "!p-0")}>
			<label htmlFor="doc" className="cursor-pointer p-3 flex items-center gap-2">
				<ArrowUpTrayIcon className="w-4 h-4" />
				Importer une liste
				<input id="doc" name="doc" type="file" accept=".json" onChange={handleFileChange} hidden />
			</label>
		</Button>
	);
};
