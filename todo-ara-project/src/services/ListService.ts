import { generateNewId } from "./GenericService";
import { Task } from "./TaskService";

/**
 * Represents a list.
 * @property id - A unique identifier.
 * @property name - The name of the list.
 * @property color - A color, represented as a string (hex code).
 * @property tasks - An array of tasks.
 **/
export interface List {
	id: string;
	name: string;
	color: string;
	tasks: Task[];
}

export const getLists = (): List[] => {
	return [
		{
			id: "b875AErf1Cdpmq9",
			name: "Soirée à thème",
			color: "#b83aa0",
			tasks: [
				{
					id: "aBcD3FgHiJkLmNo",
					name: "Manger de la choucroute",
					isCompleted: false,
					creationDate: 1727974236002,
					order: 1,
				},
				{
					id: "PqRsTuVwXyZaBcD",
					name: "Caresser le chat",
					isCompleted: true,
					creationDate: 1728055330008,
					order: 0,
				},
				{
					id: "XyZ1wV4tYu8QpLm",
					name: "Regarder Harry Potter 3",
					isCompleted: false,
					creationDate: 1728055246008,
					order: 2,
				},
				{
					id: "MnOpQr2StUvWxYz",
					parentId: "XyZ1wV4tYu8QpLm",
					name: "Brancher la télé",
					isCompleted: true,
					creationDate: 1728055330008,
					order: 0,
				},
				{
					id: "C7D8EfGhIjKlMnO",
					parentId: "XyZ1wV4tYu8QpLm",
					name: "Trouver la télécommande",
					isCompleted: true,
					creationDate: 1728062914020,
					order: 1,
				},
				{
					id: "C7D8AcF3IjKlMnO",
					parentId: "XyZ1wV4tYu8QpLm",
					name: "Allumer les enceintes",
					isCompleted: false,
					creationDate: 1728235714020,
					order: 2,
				},
			],
		},
		{
			id: "A8efgtHB54o6PaZ",
			name: "Cadeaux",
			color: "#1a2b8c",
			tasks: [],
		},
	];
};

/**
 * Creates a new list with a unique ID and default properties.
 * @param allLists - An array of existing lists to ensure the generated ID is unique.
 * @returns A new `List` object with a unique `id`, default `name`, default `color`, and an empty `tasks` array.
 **/
export const createNewList = (allLists: List[]): List => {
	return {
		id: generateNewId(allLists),
		name: "Nouvelle liste",
		color: "#21c8d8",
		tasks: [],
	};
};

/**
 * Adds a new list to an array of lists.
 * @param list - The list to add.
 * @param allLists - The existing array of lists.
 * @returns A new array with the added list.
 */
export const addList = (list: List, allLists: List[]): List[] => {
	const lists = [...allLists];
	lists.push(list);
	return lists;
};

/**
 * Removes a list from an array of lists by its ID.
 * @param listId - The ID of the list to remove.
 * @param allLists - The existing array of lists.
 * @returns A new array with the specified list removed.
 */
export const removeList = (listId: string, allLists: List[]): List[] => {
	const lists = [...allLists];
	const listIndex = lists.findIndex((list) => list.id === listId);
	if (listIndex === -1) {
		return lists;
	}
	lists.splice(listIndex, 1);
	return lists;
};
