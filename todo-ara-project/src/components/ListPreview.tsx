import { Button } from "react-aria-components";
import { List } from "../services/ListService";
import { useContext, useMemo } from "react";
import { ListContext } from "../App";
import { generateClassName } from "../utils/StyleUtilities";

export const ListPreview = (props: { list: List }) => {
	const { list } = props;
	const { name, color, tasks, id } = list;

	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [currentListId, setCurrentListId] = context.currentListState;

	const tasksCompletedNumber = useMemo(() => tasks.filter((task) => task.isCompleted).length, [tasks]);
	const isCurrentList = useMemo(() => currentListId === id, [currentListId, id]);

	return (
		<div className="flex flex-col gap-3 w-44">
			<Button
				style={{
					background: `linear-gradient(135deg, ${color}, ${color}50)`,
				}}
				className={generateClassName(
					isCurrentList ? "border border-light" : "",
					"w-40 h-40 rounded-xl flex items-center justify-center text-3xl font-bold hover:brightness-200 transition-colors ring-light"
				)}
				onPress={() => setCurrentListId(list.id)}
			>
				{tasksCompletedNumber}/{tasks.length}
			</Button>
			<span className={generateClassName(isCurrentList ? "text-light underline" : "text-light/60", "w-40 text-center text-sm")}>{name}</span>
		</div>
	);
};
