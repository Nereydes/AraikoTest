export type TaskRecord = Record<string, Task>;

export interface Task {
	name: string;
	isCompleted: boolean;
	creationDate: Date;
	previousTaskId?: string;
	subtasks?: TaskRecord;
}

export const getTasks = (): TaskRecord => {
	return {
		aBcD3FgHiJkLmNo: {
			name: "Manger de la choucroute",
			creationDate: new Date(2024, 9, 3, 18, 50, 36, 2),
			isCompleted: false,
		},
		XyZ1wV4tYu8QpLm: {
			previousTaskId: "PqRsTuVwXyZaBcD",
			name: "Regarder Harry Potter 3",
			creationDate: new Date(2024, 9, 4, 17, 20, 46, 8),
			isCompleted: true,
			subtasks: {
				MnOpQr2StUvWxYz: {
					name: "Brancher la télé",
					creationDate: new Date(2024, 9, 4, 17, 22, 10, 8),
					isCompleted: true,
				},
				C7D8EfGhIjKlMnO: {
					previousTaskId: "MnOpQr2StUvWxYz",
					name: "Trouver la télécommande",
					creationDate: new Date(2024, 9, 4, 19, 28, 34, 20),
					isCompleted: true,
				},
				C7D8AcF3IjKlMnO: {
					previousTaskId: "C7D8EfGhIjKlMnO",
					name: "Allumer les enceintes",
					creationDate: new Date(2024, 9, 6, 19, 28, 34, 20),
					isCompleted: false,
				},
			},
		},
		PqRsTuVwXyZaBcD: {
			previousTaskId: "aBcD3FgHiJkLmNo",
			name: "Caresser le chat",
			creationDate: new Date(2024, 9, 4, 17, 22, 10, 8),
			isCompleted: true,
		},
	};
};

export const sortTasks = (tasks: TaskRecord): TaskRecord => {
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
};
