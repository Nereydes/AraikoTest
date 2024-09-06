import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Task, addTask, createNewTask, removeTask, updateTask, updateTaskCompletion } from "../services/TaskService";
import { Button, ButtonWithIcon } from "./utils/Button";
import { formatDate } from "../utils/DateUtilities";
import { TaskList } from "./TaskList";
import { TaskMenu } from "./TaskMenu";
import { useContext, useMemo, useState } from "react";
import { ListContext } from "../App";

export const TaskLine = (props: { task: Task }) => {
	const { task } = props;
	const { id, name, isCompleted, creationDate, parentId } = task;

	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [tasksState, setTasksState] = context.tasksState;

	const [isEditing, setIsEditing] = useState(false);
	const subtasks = useMemo(() => tasksState.filter((subtask) => subtask.parentId === task.id), [tasksState, task]);

	const updateTaskName = (newValue: string) => {
		setTasksState((prev) => updateTask(id, "name", newValue, prev));
	};

	const updateCompletion = (isCompleted: boolean) => {
		setTasksState((prev) => updateTaskCompletion(isCompleted, id, prev));
	};

	const deleteTask = () => {
		setTasksState((prev) => removeTask(id, prev));
	};

	const addNewTask = (isSubtask: boolean) => {
		const newTask = createNewTask(tasksState, isSubtask ? id : parentId, isSubtask ? undefined : id);
		setTasksState((prev) => addTask(newTask, prev));
	};

	return (
		<li>
			<Button className=" flex gap-1 items-center" variant="transparent" onPress={() => addNewTask(false)}>
				<PlusIcon className="w-3 h-3" />
				Ajouter une tâche
			</Button>
			<div className="w-1/3 flex gap-5 items-center group/task peer/task p-3 hover:bg-slate-50 rounded-xl transition-colors">
				<input
					type="checkbox"
					checked={isCompleted}
					onChange={(e) => {
						updateCompletion(e.target.checked);
					}}
					aria-label="Is task completed?"
					disabled={subtasks.filter((subtask) => !subtask.isCompleted).length > 0}
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
							updateTaskName(e.target.value);
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
					onPress={() => addNewTask(true)}
				>
					<PlusIcon className="w-3 h-3" />
					Ajouter une sous-tâche
				</Button>
				<span className="hidden group-hover/task:block text-sm text-slate-400 italic">{formatDate(creationDate)}</span>
				<TaskMenu task={task} addSubtask={() => addNewTask(true)} />
				<ButtonWithIcon icon={<TrashIcon className="w-5 h-5 text-red-700" />} label="Supprimer la tâche" variant="transparent" onPress={deleteTask} />
			</div>
			{subtasks.length > 0 && <TaskList tasks={subtasks} />}
		</li>
	);
};
