import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { updateItem } from "../../services/GenericService";
import { Task, updateTaskCompletion, removeTask, createNewTask, addTask, SwapDirection, swapOrder } from "../../services/TaskService";
import { formatDate } from "../../utils/DateUtilities";
import { Button, ButtonWithIcon } from "../utils/Button";
import { useListContext } from "../utils/ContextHook";
import { TaskList } from "./TaskList";
import { TaskMenu } from "./TaskMenu";

/**
 * Displays a task with all its functions.
 * Calls recursively if there are subtasks.
 * @param {Task} props.task Task to display.
 * @returns null if no list is selected.
 */
export const TaskLine = (props: { task: Task }) => {
	const { id, name, isCompleted, creationDate, parentId, order } = props.task;

	const {
		listsState: [lists, setLists],
		currentListState: [currentListId],
	} = useListContext();

	const currentList = useMemo(() => lists.find((list) => list.id === currentListId), [lists, currentListId]);

	/**
	 * Stores subtasks for subsequent display.
	 */
	const subtasks = useMemo(() => currentList?.tasks.filter((subtask) => subtask.parentId === id), [currentList, id]);

	/**
	 * Calculates the number of neighboring tasks to see if the task can change order.
	 */
	const sameLevelTasksNumber = useMemo(
		() => currentList?.tasks.filter((sameLevelTask) => sameLevelTask.parentId === parentId).length || 0,
		[currentList, parentId]
	);

	if (!currentList) {
		return null;
	}

	const updateList = (tasks: Task[]) => {
		setLists((prev) => updateItem(currentList.id, "tasks", tasks, prev));
	};

	const updateTaskName = (newValue: string) => {
		updateList(updateItem(id, "name", newValue, currentList.tasks));
	};

	const updateCompletion = (isCompleted: boolean) => {
		updateList(updateTaskCompletion(isCompleted, id, currentList.tasks));
	};

	const deleteTask = () => {
		updateList(removeTask(id, currentList.tasks));
	};

	const addNewTask = (isSubtask: boolean) => {
		const newTask = createNewTask(currentList.tasks, isSubtask ? id : parentId, isSubtask ? undefined : id);
		updateList(addTask(newTask, currentList.tasks));
	};

	const swapTaskOrder = (direction: SwapDirection) => {
		updateList(swapOrder(id, direction, currentList.tasks));
	};

	return (
		<li className="w-full">
			<ButtonWithIcon icon={<PlusIcon className="w-3 h-3" />} label="Ajouter une tâche" variant="transparent" onPress={() => addNewTask(false)} />
			<div className="ml-2 flex gap-5 items-center group/task">
				<input
					className="accent-yellow h-4 w-4"
					type="checkbox"
					checked={isCompleted}
					onChange={(e) => {
						updateCompletion(e.target.checked);
					}}
					aria-label="Is task completed?"
					disabled={subtasks!.filter((subtask) => !subtask.isCompleted).length > 0}
				/>
				<input
					className="text-lg grow border-none bg-light px-5 py-1 focus-visible:outline-none"
					type="text"
					defaultValue={name}
					placeholder="Nouvelle tâche"
					onBlur={(e) => {
						updateTaskName(e.target.value);
					}}
				/>
				<Button
					className="transition-opacity ml-24 group-hover/task:opacity-100 opacity-0 flex gap-1 items-center"
					variant="yellow"
					onPress={() => addNewTask(true)}
				>
					<PlusIcon className="w-3 h-3" />
					Ajouter une sous-tâche
				</Button>
				<span className="hidden group-hover/task:block text-sm text-slate-400 italic">{formatDate(creationDate)}</span>
				<TaskMenu
					canGoUp={order > 0}
					canGoDown={order < sameLevelTasksNumber - 1}
					deleteTask={deleteTask}
					swapTaskOrder={swapTaskOrder}
					addSubtask={() => addNewTask(true)}
				/>
				<ButtonWithIcon icon={<TrashIcon className="w-5 h-5 text-red-700" />} label="Supprimer la tâche" variant="transparent" onPress={deleteTask} />
			</div>
			{subtasks && subtasks.length > 0 && <TaskList tasks={subtasks} />}
		</li>
	);
};
