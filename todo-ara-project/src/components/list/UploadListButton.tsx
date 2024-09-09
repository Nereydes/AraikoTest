import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useListContext } from "../utils/ContextHook";
import { Task } from "../../services/TaskService";
import { addList, createNewList } from "../../services/ListService";
import { generateClassName } from "../../utils/StyleUtilities";
import { Button } from "../utils/Button";

/**
 * Button for importing tasks from a JSON file and adding them to a new list.
 */
export const UploadListButton = (props: { className?: string }) => {
	const {
		listsState: [lists, setLists],
	} = useListContext();

	/**
	 * Handles the change event for a file input element.
	 * This function reads a JSON file, parses its content, and updates the list of tasks.
	 * @param event - The change event from a file input (`<input type="file">`).
	 * @throws Displays an alert if the loaded file is not in the expected JSON format.
	 */
	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const json = e.target?.result as string;
				const tasksFromFile: Task[] = JSON.parse(json);
				const newList = { ...createNewList(lists), tasks: tasksFromFile };
				setLists((prev) => addList(newList, prev));
			} catch (error) {
				console.error("Error loading JSON file :", error);
				alert("Le fichier chargé n'a pas le format désiré.");
			}
		};
		reader.readAsText(file);
	};

	return (
		<Button variant="yellow" size="md" className={generateClassName(props.className, "!p-0")}>
			<label htmlFor="doc" className="cursor-pointer p-3 flex items-center gap-2">
				<ArrowUpTrayIcon className="w-4 h-4" />
				Importer une liste
				<input id="doc" name="doc" type="file" accept=".json" onChange={onFileChange} hidden />
			</label>
		</Button>
	);
};
