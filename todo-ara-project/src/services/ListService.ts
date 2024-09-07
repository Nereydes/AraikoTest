import { generateNewId } from "./GenericService";
import { Task } from "./TaskService";

export interface List {
	id: string;
	name: string;
	color: string;
	tasks: Task[];
}

export const getLists = (): List[] => {
	return [];
};

export const createNewList = (allLists: List[]): List => {
	return {
		id: generateNewId(allLists),
		name: "Nouvelle liste",
		color: "#21c8d8",
		tasks: [],
	};
};

export const addList = (list: List, allLists: List[]): List[] => {
	const lists = [...allLists];
	lists.push(list);
	return lists;
};

export const removeList = (listId: string, allLists: List[]): List[] => {
	const lists = [...allLists];
	const listIndex = lists.findIndex((list) => list.id === listId);
	if (listIndex === -1) {
		return lists;
	}
	lists.splice(listIndex, 0);
	return lists;
};
