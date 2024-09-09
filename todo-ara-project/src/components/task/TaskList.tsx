import { PlusIcon } from "@heroicons/react/24/outline";
import { Task, addTask, createNewTask } from "../../services/TaskService";
import { TaskLine } from "./TaskLine";
import { ButtonWithIcon } from "../utils/Button";
import { useMemo } from "react";
import { updateItem } from "../../services/GenericService";
import { useListContext } from "../utils/ContextHook";

/**
 * Displays a list of all tasks on the same level, sorting them according to their order.
 * Can also add a new task at the end of the list.
 * Calls recursively if there are sub-tasks.
 * @param {Task[]} props.tasks Tasks to display.
 */
export const TaskList = (props: { tasks: Task[] }) => {
	const { tasks } = props;

	const {
		listsState: [lists, setLists],
		currentListState: [currentListId],
	} = useListContext();

	const currentList = useMemo(() => lists.find((list) => list.id === currentListId), [lists, currentListId]);

	return currentList ? (
		<>
			<ul className="ml-2 md:ml-10">
				{tasks
					.sort((a, b) => a.order - b.order)
					.map((task) => (
						<TaskLine key={task.id} task={task} />
					))}
			</ul>
			<ButtonWithIcon
				icon={<PlusIcon className="w-3 h-3" />}
				label="Ajouter une tâche"
				className="ml-2 md:ml-10 flex gap-1 items-center"
				variant="transparent"
				onPress={() => {
					const newTask = createNewTask(currentList.tasks, tasks[0]?.parentId);
					setLists((prev) => updateItem(currentList.id, "tasks", addTask(newTask, currentList.tasks), prev));
				}}
			/>
		</>
	) : null;
};
