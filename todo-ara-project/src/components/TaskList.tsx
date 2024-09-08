import { PlusIcon } from "@heroicons/react/24/outline";
import { Task, TaskRecord, addTask, createNewTask } from "../services/TaskService";
import { TaskLine } from "./TaskLine";
import { Button, ButtonWithIcon } from "./utils/Button";
import { useContext, useMemo } from "react";
import { ListContext } from "../App";
import { updateItem } from "../services/GenericService";

export const TaskList = (props: { tasks: Task[] }) => {
	const { tasks } = props;

	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [listsState, setListsState] = context.listsState;
	const [currentListId] = context.currentListState;

	const currentList = useMemo(() => listsState.find((list) => list.id === currentListId), [listsState, currentListId]);

	return currentList ? (
		<>
			<ul className="ml-10">
				{tasks
					.sort((a, b) => a.order - b.order)
					.map((task) => (
						<TaskLine key={task.id} task={task} />
					))}
			</ul>
			<ButtonWithIcon
				icon={<PlusIcon className="w-3 h-3" />}
				label="Ajouter une tâche"
				className="ml-10 flex gap-1 items-center"
				variant="transparent"
				onPress={() => {
					const newTask = createNewTask(currentList.tasks, tasks[0]?.parentId);
					setListsState((prev) => updateItem(currentListId, "tasks", addTask(newTask, currentList.tasks), prev));
				}}
			/>
		</>
	) : null;
};
