import { Button } from "react-aria-components";
import { useMemo } from "react";
import { useListContext } from "../utils/ContextHook";
import { List } from "../../services/ListService";
import { generateClassName } from "../../utils/StyleUtilities";

/**
 * Component that displays a preview of the list with its name, color and number of completed tasks.
 * @param {List} props.list List to display.
 */
export const ListPreview = (props: { list: List }) => {
	const { name, color, tasks, id } = props.list;

	const {
		currentListState: [currentListId, setCurrentListId],
	} = useListContext();

	/**
	 * Stores the number of completed tasks and is updated each time the status changes.
	 */
	const tasksCompletedNumber = useMemo(() => tasks.filter((task) => task.isCompleted).length, [tasks]);

	/**
	 * Checks if the previewed list is the same as the selected one. Adjusts the display.
	 */
	const isCurrentList = useMemo(() => currentListId === id, [currentListId, id]);

	return (
		<div className="flex flex-col gap-3 xl:w-44">
			<Button
				style={{
					background: `linear-gradient(135deg, ${color}, ${color}50)`,
				}}
				className={generateClassName(
					isCurrentList ? "border border-light" : "",
					"w-20 h-20 md:w-32 md:h-32 2xl:w-40 2xl:h-40 rounded-xl flex items-center justify-center text-3xl font-bold hover:brightness-200 transition-colors ring-light"
				)}
				onPress={() => setCurrentListId(id)}
			>
				{tasksCompletedNumber}/{tasks.length}
			</Button>
			<span className={generateClassName(isCurrentList ? "text-light underline" : "text-light/60", "xl:w-40 text-center text-sm")}>{name}</span>
		</div>
	);
};
