import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Task, addTaskRecursively, createNewTask, deleteTaskRecursively, findParentTaskId, updateTaskRecursively } from "../services/TaskService";
import { Button, ButtonWithIcon } from "./utils/Button";
import { formatDate } from "../utils/DateUtilities";
import { TaskList } from "./TaskList";
import { TaskMenu } from "./TaskMenu";
import { useContext, useState } from "react";
import { ListContext } from "../App";

export const TaskLine = (props: { task: Task; id: string }) => {
	const { id, task } = props;
	const { name, isCompleted, creationDate, subtasks } = task;

	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [tasksState, setTasksState] = context.tasksState;

	const [isEditing, setIsEditing] = useState(false);

	const updateTaskProperty = (newValue: string | boolean, propertyName: string, taskId: string) => {
		setTasksState((prev) => updateTaskRecursively(taskId, propertyName, newValue, prev));
	};

	const deleteTask = () => {
		setTasksState((prev) => deleteTaskRecursively(id, prev));
	};

	const addSubtask = (isSubtask: boolean) => {
		const newTask = createNewTask(tasksState, id);
		setTasksState((prev) => addTaskRecursively(newTask, isSubtask ? id : findParentTaskId(id, prev), prev));
	};

	return (
		<li>
			<Button className=" flex gap-1 items-center" variant="transparent" onPress={() => addSubtask(false)}>
				<PlusIcon className="w-3 h-3" />
				Ajouter une tâche
			</Button>
			<div className="w-1/3 flex gap-5 items-center group/task peer/task p-3 hover:bg-slate-50 rounded-xl transition-colors">
				<input
					type="checkbox"
					defaultChecked={isCompleted}
					onChange={(e) => {
						updateTaskProperty(e.target.checked, "isCompleted", id);
					}}
					aria-label="Is task completed?"
				/>
				{isEditing ? (
					<input
						autoFocus
						className="text-lg grow border-none bg-slate-300"
						type="text"
						defaultValue={name}
						placeholder="Nouvelle tâche"
						onBlur={(e) => {
							setIsEditing(false);
							updateTaskProperty(e.target.value, "name", id);
						}}
					/>
				) : (
					<span className="text-lg cursor-text grow" onClick={() => setIsEditing(true)}>
						{name}
					</span>
				)}
				<Button
					className="transition-opacity ml-24 group-hover/task:opacity-100 opacity-0 flex gap-1 items-center"
					variant="yellow"
					onPress={() => addSubtask(true)}
				>
					<PlusIcon className="w-3 h-3" />
					Ajouter une sous-tâche
				</Button>
				<span className="hidden group-hover/task:block text-sm text-slate-400 italic">{formatDate(creationDate)}</span>
				<TaskMenu task={task} taskId={id} />
				<ButtonWithIcon icon={<TrashIcon className="w-5 h-5 text-red-700" />} label="Supprimer la tâche" variant="transparent" onPress={deleteTask} />
			</div>
			{subtasks && <TaskList tasks={subtasks} parentId={id} />}
			{/* <div className="w-full group/newTask h-5 flex items-end">
				<Button className="transition-opacity ml-24 group-hover/newTask:opacity-100 opacity-0 flex gap-1 items-center" variant="yellow" onPress={addSubtask}>
					<PlusIcon className="w-3 h-3" />
					Ajouter une sous-tâche
				</Button>
			</div> */}
		</li>
	);
};
