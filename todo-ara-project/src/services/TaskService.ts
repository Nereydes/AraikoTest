import { findItemById, generateNewId, updateItem } from "./GenericService";

/**
 * Represents a task.
 * @property id - A unique identifier.
 * @property parentId - An optional ID of the parent task (if any).
 * @property name - The name of the task.
 * @property isCompleted - A boolean indicating whether the task is completed.
 * @property creationDate - The timestamp of when the task was created.
 * @property order - The order of the task within the list.
 */
export interface Task {
	id: string;
	parentId?: string;
	name: string;
	isCompleted: boolean;
	creationDate: number;
	order: number;
}

/**
 * Represents the possible directions for swapping items.
 * @type ASC - Indicates ascending order.
 * @type DESC - Indicates descending order.
 */
export type SwapDirection = "ASC" | "DESC";

/**
 * Creates a new task with a unique ID and default properties.
 * @param allTasks - The existing array of tasks to ensure the generated ID is unique.
 * @param parentId - An optional ID of the parent task.
 * @param nextTaskId - An optional ID of the task to determine the order.
 * @returns A new `Task` object with a unique `id`, default `name`, current timestamp for `creationDate`, and other properties.
 */
export const createNewTask = (allTasks: Task[], parentId?: string, nextTaskId?: string): Task => {
	const tasks = [...allTasks];
	const sameLevelTasks = tasks.filter((task) => task.parentId === parentId);
	let order = sameLevelTasks.length;
	if (nextTaskId) {
		const previousTask = findItemById(nextTaskId, allTasks);
		if (previousTask) {
			order = previousTask.order;
		}
	}
	return {
		id: generateNewId(allTasks),
		name: "Nouvelle tâche",
		creationDate: new Date().getTime(),
		isCompleted: false,
		parentId,
		order,
	};
};

/**
 * Updates the order of tasks at the same level as the specified task based on the action (add or delete).
 * @param task - The task whose order change will affect other tasks at the same level.
 * @param allTasks - The existing array of tasks.
 * @param action - The action to perform: "add" to increase order for tasks with the same parent, "delete" to decrease order.
 * @returns A new array of tasks with updated order values for tasks at the same level.
 */
const updateSameLevelTasksOrder = (task: Task, allTasks: Task[], action: "add" | "delete") => {
	let tasks = [...allTasks];
	const sameLevelTasks = tasks.filter((filteredTask) => task.parentId === filteredTask.parentId);
	for (const sameLevelTask of sameLevelTasks) {
		if (sameLevelTask.order >= task.order) {
			const newOrder = action === "add" ? sameLevelTask.order + 1 : sameLevelTask.order - 1;
			tasks = updateItem(sameLevelTask.id, "order", newOrder, tasks);
		}
	}
	return tasks;
};

/**
 * Adds a new task to the array of tasks and updates the order of other tasks at the same level.
 * @param task - The task to add.
 * @param allTasks - The existing array of tasks.
 * @returns A new array of tasks with the added task and updated order for tasks at the same level.
 */
export const addTask = (task: Task, allTasks: Task[]) => {
	let tasks = updateSameLevelTasksOrder(task, allTasks, "add");
	if (task.parentId) {
		tasks = updateTaskCompletion(false, task.parentId, tasks);
	}
	tasks.push(task);
	return tasks;
};

/**
 * Removes a task from the array of tasks and updates the order of other tasks at the same level.
 * @param taskId - The ID of the task to remove.
 * @param allTasks - The existing array of tasks.
 * @returns A new array of tasks with the specified task removed and order adjusted for other tasks.
 */
export const removeTask = (taskId: string, allTasks: Task[]) => {
	const task = findItemById(taskId, allTasks);
	const taskIndex = allTasks.findIndex((task) => task.id === taskId);
	if (!task || taskIndex === -1) {
		return allTasks;
	}
	let tasks = updateSameLevelTasksOrder(task, allTasks, "delete");
	const subtasks = tasks.filter((subtask) => subtask.parentId === taskId);
	const sameLevelTasks = tasks.filter((filteredTask) => task.parentId === filteredTask.parentId);
	for (let i = 0; i < subtasks.length; i++) {
		tasks = updateItem(subtasks[i].id, "parentId", task.parentId, tasks);
		tasks = updateItem(subtasks[i].id, "order", sameLevelTasks.length + i, tasks);
	}
	tasks.splice(taskIndex, 1);
	return tasks;
};

/**
 * Swaps the order of a task with another task at the same level based on the specified direction.
 * @param taskId - The ID of the task to swap.
 * @param direction - The direction to swap: "ASC" to move up, "DESC" to move down.
 * @param allTasks - The existing array of tasks.
 * @returns A new array of tasks with the order of the specified task swapped with another task at the same level.
 */
export const swapOrder = (taskId: string, direction: SwapDirection, allTasks: Task[]) => {
	let tasks = [...allTasks];
	const task = findItemById(taskId, tasks);
	if (!task) {
		return tasks;
	}
	const taskToSwap = tasks.find((taskFind) => {
		if (taskFind.parentId === task.parentId) {
			if (direction === "ASC" && taskFind.order === task.order - 1) {
				return true;
			}
			if (direction === "DESC" && taskFind.order === task.order + 1) {
				return true;
			}
		}
		return false;
	});
	if (!taskToSwap) {
		return tasks;
	}
	tasks = updateItem(task.id, "order", direction === "ASC" ? task.order - 1 : task.order + 1, tasks);
	tasks = updateItem(taskToSwap.id, "order", direction === "ASC" ? taskToSwap.order + 1 : taskToSwap.order - 1, tasks);
	return tasks;
};

/**
 * Updates the completion status of a task and its parent task if applicable.
 * @param isCompleted - The new completion status of the task.
 * @param taskId - The ID of the task to update.
 * @param allTasks - The existing array of tasks.
 * @returns A new array of tasks with the updated completion status for the specified task and its parent task.
 */
export const updateTaskCompletion = (isCompleted: boolean, taskId: string, allTasks: Task[]): Task[] => {
	let tasks = [...allTasks];
	const task = findItemById(taskId, tasks);
	if (!task) {
		return tasks;
	}
	tasks = updateItem(task.id, "isCompleted", isCompleted, tasks);
	if (task.parentId) {
		tasks = updateParentTaskCompletion(task.parentId, tasks);
	}
	return tasks;
};

/**
 * Recursively updates the completion status of a parent task based on the completion status of its subtasks.
 * The function will traverse up the hierarchy, updating each parent task until the topmost parent is reached.
 * @param parentId - The ID of the parent task to update.
 * @param tasks - The existing array of tasks.
 * @returns A new array of tasks with the updated completion status for the parent task and its ancestors.
 */
const updateParentTaskCompletion = (parentId: string, tasks: Task[]): Task[] => {
	const parentTask = findItemById(parentId, tasks);
	if (!parentTask) return tasks;
	const sameLevelTasks = tasks.filter((sameLevelTask) => sameLevelTask.parentId === parentId);
	const allSameLevelTasksCompleted = sameLevelTasks.every((task) => task.isCompleted);
	tasks = updateItem(parentTask.id, "isCompleted", allSameLevelTasksCompleted, tasks);
	if (parentTask.parentId) {
		tasks = updateParentTaskCompletion(parentTask.parentId, tasks);
	}
	return tasks;
};

/**
 * Converts an array of tasks into a JSON URL that can be used to download the tasks as a JSON file.
 * @param tasks - The array of tasks to convert to JSON.
 * @returns A URL representing the JSON file that contains the tasks data.
 */
export const getJSONUrlFromTasksList = (tasks: Task[]) => {
	const tasksJson = JSON.stringify(tasks, null, 2);
	const blob = new Blob([tasksJson], { type: "application/json" });
	return URL.createObjectURL(blob);
};

/* export const sortTasks = (tasks: TaskRecord): TaskRecord => {
	const sortedTasks: TaskRecord = {};
	let currentTaskEntry = Object.entries(tasks).find(([, task]) => !task.previousTaskId);
	while (currentTaskEntry) {
		const [taskId, currentTask] = currentTaskEntry;
		sortedTasks[taskId] = currentTask;
		currentTaskEntry = Object.entries(tasks).find(([, task]) => task.previousTaskId === taskId);
	}
	return sortedTasks;
};

const generateRandomString = (length: number = 15): string => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
};

const doesTaskIdExist = (id: string, tasks: TaskRecord): boolean => {
	for (const [taskId, task] of Object.entries(tasks)) {
		if (taskId === id || (task.subtasks && doesTaskIdExist(id, task.subtasks))) {
			return true;
		}
	}
	return false;
};

const generateNewId = (allTasks: TaskRecord) => {
	let id = "";
	do {
		id = generateRandomString();
	} while (doesTaskIdExist(id, allTasks));
	return id;
};

export const createNewTask = (allTasks: TaskRecord, previousTaskId?: string): { key: string; task: Task } => {
	return {
		key: generateNewId(allTasks),
		task: {
			name: "Nouvelle tâche",
			creationDate: new Date(),
			isCompleted: false,
			previousTaskId,
		},
	};
};

export const updateTaskRecursively = (taskId: string, propertyName: string, newValue: string | boolean, tasks?: TaskRecord): TaskRecord => {
	const sameLevelTasks = { ...tasks };
	for (const id in sameLevelTasks) {
		if (id === taskId) {
			sameLevelTasks[id] = {
				...sameLevelTasks[id],
				[propertyName]: newValue,
			};
		} else if (sameLevelTasks[id].subtasks) {
			sameLevelTasks[id].subtasks = updateTaskRecursively(taskId, propertyName, newValue, sameLevelTasks[id].subtasks);
		}
	}
	return sameLevelTasks;
};

export const deleteTaskRecursively = (taskId: string, tasks?: TaskRecord) => {
	const sameLevelTasks = { ...tasks };
	for (const id in sameLevelTasks) {
		if (id === taskId) {
			delete sameLevelTasks[id];
		} else if (sameLevelTasks[id].subtasks) {
			sameLevelTasks[id].subtasks = deleteTaskRecursively(taskId, sameLevelTasks[id].subtasks);
		}
	}
	return sameLevelTasks;
};

export const addTaskRecursively = (newTask: { key: string; task: Task }, parentId?: string, tasks?: TaskRecord) => {
	const sameLevelTasks = { ...tasks };
	if (!parentId) {
		sameLevelTasks[newTask.key] = newTask.task;
	} else {
		for (const id in sameLevelTasks) {
			if (id === parentId) {
				sameLevelTasks[id] = {
					...sameLevelTasks[id],
					subtasks: { ...sameLevelTasks[id].subtasks, [newTask.key]: newTask.task },
				};
				const nextTask = Object.entries(sameLevelTasks[id].subtasks || {}).find(([_, task]) => task.previousTaskId === newTask.task.previousTaskId);
				if (nextTask) {
					sameLevelTasks[id].subtasks![nextTask[0]].previousTaskId = newTask.key;
				}
			} else if (sameLevelTasks[id].subtasks) {
				sameLevelTasks[id].subtasks = addTaskRecursively(newTask, parentId, sameLevelTasks[id].subtasks);
			}
		}
	}
	return sameLevelTasks;
};

export const findParentTaskId = (taskId: string, tasks: TaskRecord): string | undefined => {
	const searchParentId = (tasks: Record<string, Task>, parentId: string | undefined = undefined): string | undefined => {
		for (const id in tasks) {
			const task = tasks[id];
			if (task.subtasks) {
				if (task.subtasks[taskId]) {
					return id;
				}
				const foundParentId = searchParentId(task.subtasks, id);
				if (foundParentId) {
					return foundParentId;
				}
			}
		}
		return undefined;
	};

	return searchParentId(tasks);
};

export const changeTaskOrder = (direction: "ASC" | "DESC", taskId: string, tasks?: TaskRecord): TaskRecord => {
	const sameLevelTasks = { ...tasks };
	const parentId = findParentTaskId(taskId, sameLevelTasks);
	if (!parentId) {
		const taskToUpdate = sameLevelTasks[taskId];
		const nextTask = Object.entries(sameLevelTasks).find(([, task]) => task.previousTaskId === taskId);
		if (direction === "ASC") {
			let previousTask;
			const previousTaskId = sameLevelTasks[taskId].previousTaskId;
			if (previousTaskId) {
				previousTask = sameLevelTasks[previousTaskId];
				sameLevelTasks[taskId].previousTaskId = previousTask.previousTaskId;
				sameLevelTasks[previousTaskId].previousTaskId = taskId;
				if (nextTask) {
					sameLevelTasks[nextTask[0]].previousTaskId = previousTaskId;
				}
			}
		} else if (nextTask) {
			const lastTask = Object.entries(sameLevelTasks).find(([, task]) => task.previousTaskId === nextTask[0]);
			const tempPreviousId = taskToUpdate.previousTaskId;
			sameLevelTasks[taskId].previousTaskId = nextTask[0];
			sameLevelTasks[nextTask[0]].previousTaskId = tempPreviousId;
			if (lastTask) {
				sameLevelTasks[lastTask[0]].previousTaskId = taskId;
			}
		}
	} else {
		for (const id in sameLevelTasks) {
			if (sameLevelTasks[id].subtasks) {
				sameLevelTasks[id].subtasks = changeTaskOrder(direction, taskId, sameLevelTasks[id].subtasks);
			}
		}
	}
	return sameLevelTasks;
}; */
