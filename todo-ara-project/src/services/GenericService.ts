import { generateRandomString } from "../utils/StringUtilities";

export const findItemById = <T extends { id: string }>(id: string, items: T[]): T | undefined => {
	return items.find((item) => item.id === id);
};

export const findItemIndexById = <T extends { id: string }>(id: string, items: T[]): number => {
	return items.findIndex((item) => item.id === id);
};

export const generateNewId = <T extends { id: string }>(allItems: T[]): string => {
	let id = "";
	do {
		id = generateRandomString();
	} while (findItemById(id, allItems));
	return id;
};

export const updateItem = <T extends { id: string }, V>(itemId: string, propertyName: keyof T, newValue: V, allItems: T[]): T[] => {
	const items = [...allItems];
	const itemIndex = items.findIndex((item) => item.id === itemId);
	if (itemIndex === -1) {
		return items;
	}
	items[itemIndex] = {
		...items[itemIndex],
		[propertyName]: newValue,
	};
	return items;
};
