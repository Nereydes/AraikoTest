import { generateNewId } from "./GenericService";
import { Task } from "./TaskService";

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
			name: "Soirée parfaite",
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
	lists.splice(listIndex, 1);
	return lists;
};
