import { PlusIcon } from "@heroicons/react/24/outline";
import { Task, TaskRecord, addTaskRecursively, createNewTask, sortTasks } from "../services/TaskService";
import { TaskLine } from "./TaskLine";
import { Button } from "./utils/Button";
import { useContext } from "react";
import { ListContext } from "../App";

export const TaskList = (props: { tasks: TaskRecord; parentId?: string }) => {
	const { tasks, parentId } = props;

	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [tasksState, setTasksState] = context.tasksState;

	const addSubtask = () => {
		const newTask = createNewTask(tasksState);
		setTasksState((prev) => addTaskRecursively(newTask, parentId, prev));
	};

	return (
		<>
			<ul className="ml-10">
				{Object.entries(sortTasks(tasks)).map(([id, task]) => (
					<TaskLine key={id} id={id} task={task} />
				))}
			</ul>
			<Button className="ml-12 flex gap-1 items-center" variant="green" onPress={addSubtask}>
				<PlusIcon className="w-3 h-3" />
				Ajouter une tâche
			</Button>
		</>
	);
};
