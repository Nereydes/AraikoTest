import { PlusIcon } from "@heroicons/react/24/outline";
import { Task, TaskRecord, addTask, createNewTask } from "../services/TaskService";
import { TaskLine } from "./TaskLine";
import { Button } from "./utils/Button";
import { useContext } from "react";
import { ListContext } from "../App";

export const TaskList = (props: { tasks: Task[] }) => {
	const { tasks } = props;

	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [tasksState, setTasksState] = context.tasksState;

	return (
		<>
			<ul className="ml-10">
				{tasks
					.sort((a, b) => a.order - b.order)
					.map((task) => (
						<TaskLine key={task.id} task={task} />
					))}
			</ul>
			<Button
				className="ml-12 flex gap-1 items-center"
				variant="transparent"
				onPress={() => {
					const newTask = createNewTask(tasksState, tasks[0].parentId);
					setTasksState((prev) => addTask(newTask, prev));
				}}
			>
				<PlusIcon className="w-3 h-3" />
				Ajouter une tâche
			</Button>
		</>
	);
};
