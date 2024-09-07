export type TaskRecord = Record<string, Task>;

export interface Task {
	id: string;
	parentId?: string;
	name: string;
	isCompleted: boolean;
	creationDate: number;
	order: number;
}

export const getTasks = (): Task[] => {
	return [];
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

const findTaskById = (id: string, tasks: Task[]): Task | undefined => {
	return tasks.find((task) => task.id === id);
};

const generateNewId = (allTasks: Task[]) => {
	let id = "";
	do {
		id = generateRandomString();
	} while (findTaskById(id, allTasks));
	return id;
};

export const createNewTask = (allTasks: Task[], parentId?: string, nextTaskId?: string): Task => {
	const tasks = [...allTasks];
	const sameLevelTasks = tasks.filter((task) => task.parentId === parentId);
	let order = sameLevelTasks.length;
	if (nextTaskId) {
		const previousTask = findTaskById(nextTaskId, allTasks);
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

export const updateTask = (taskId: string, propertyName: string, newValue: string | boolean | number | undefined, allTasks: Task[]) => {
	const tasks = [...allTasks];
	const taskIndex = tasks.findIndex((task) => task.id === taskId);
	if (taskIndex === -1) {
		return tasks;
	}
	tasks[taskIndex] = {
		...tasks[taskIndex],
		[propertyName]: newValue,
	};
	return tasks;
};

const updateSameLevelTasksOrder = (task: Task, allTasks: Task[], action: "add" | "delete") => {
	let tasks = [...allTasks];
	const sameLevelTasks = tasks.filter((filteredTask) => task.parentId === filteredTask.parentId);
	for (const sameLevelTask of sameLevelTasks) {
		if (sameLevelTask.order >= task.order) {
			const newOrder = action === "add" ? sameLevelTask.order + 1 : sameLevelTask.order - 1;
			tasks = updateTask(sameLevelTask.id, "order", newOrder, tasks);
		}
	}
	return tasks;
};

export const addTask = (task: Task, allTasks: Task[]) => {
	let tasks = updateSameLevelTasksOrder(task, allTasks, "add");
	if (task.parentId) {
		tasks = updateTaskCompletion(false, task.parentId, tasks);
	}
	tasks.push(task);
	return tasks;
};

export const removeTask = (taskId: string, allTasks: Task[]) => {
	const task = findTaskById(taskId, allTasks);
	const taskIndex = allTasks.findIndex((task) => task.id === taskId);
	if (!task || taskIndex === -1) {
		return allTasks;
	}
	let tasks = updateSameLevelTasksOrder(task, allTasks, "delete");
	const subtasks = tasks.filter((subtask) => subtask.parentId === taskId);
	const sameLevelTasks = tasks.filter((filteredTask) => task.parentId === filteredTask.parentId);
	for (let i = 0; i < subtasks.length; i++) {
		tasks = updateTask(subtasks[i].id, "parentId", task.parentId, tasks);
		tasks = updateTask(subtasks[i].id, "order", sameLevelTasks.length + i, tasks);
	}
	tasks.splice(taskIndex, 1);
	return tasks;
};

export const swapOrder = (taskId: string, direction: "ASC" | "DESC", allTasks: Task[]) => {
	let tasks = [...allTasks];
	const task = findTaskById(taskId, tasks);
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
	tasks = updateTask(task.id, "order", direction === "ASC" ? task.order - 1 : task.order + 1, tasks);
	tasks = updateTask(taskToSwap.id, "order", direction === "ASC" ? taskToSwap.order + 1 : taskToSwap.order - 1, tasks);
	return tasks;
};

export const updateTaskCompletion = (isCompleted: boolean, taskId: string, allTasks: Task[]): Task[] => {
	let tasks = [...allTasks];
	const task = findTaskById(taskId, tasks);
	if (!task) {
		return tasks;
	}
	tasks = updateTask(task.id, "isCompleted", isCompleted, tasks);
	if (task.parentId) {
		tasks = updateParentTaskCompletion(task.parentId, tasks);
	}
	return tasks;
};

const updateParentTaskCompletion = (parentId: string, tasks: Task[]): Task[] => {
	const parentTask = findTaskById(parentId, tasks);
	if (!parentTask) return tasks;
	const sameLevelTasks = tasks.filter((sameLevelTask) => sameLevelTask.parentId === parentId);
	const allSameLevelTasksCompleted = sameLevelTasks.every((task) => task.isCompleted);
	tasks = updateTask(parentTask.id, "isCompleted", allSameLevelTasksCompleted, tasks);
	if (parentTask.parentId) {
		tasks = updateParentTaskCompletion(parentTask.parentId, tasks);
	}
	return tasks;
};

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
