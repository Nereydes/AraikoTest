import { generateRandomString } from "../utils/StringUtilities";

/**
 * Finds an item by its ID in an array of items.
 * @typeParam T - A generic type parameter that extends an object with an `id` property of type `string`.
 * @param id - The ID of the item to search for.
 * @param items - An array of items of type `T` to search within.
 * @returns The item of type `T` with the matching `id`, or `undefined` if no such item is found.
 **/
export const findItemById = <T extends { id: string }>(id: string, items: T[]): T | undefined => {
	return items.find((item) => item.id === id);
};

/**
 * Finds an index item by its ID in an array of items.
 * @typeParam T - A generic type parameter that extends an object with an `id` property of type `string`.
 * @param id - The ID of the item to search for.
 * @param items - An array of items of type `T` to search within.
 * @returns The index item of type `T` with the matching `id`, or `-1` if no such item is found.
 **/
export const findItemIndexById = <T extends { id: string }>(id: string, items: T[]): number => {
	return items.findIndex((item) => item.id === id);
};

/**
 * Generates a new unique ID that does not conflict with any existing IDs in the provided array of items.
 * @typeParam T - A generic type parameter that extends an object with an `id` property of type `string`.
 * @param allItems - An array of items of type `T` to check against for unique IDs.
 * @returns A unique ID as a `string` that is not present in the `allItems` array.
 **/
export const generateNewId = <T extends { id: string }>(allItems: T[]): string => {
	let id = "";
	do {
		id = generateRandomString();
	} while (findItemById(id, allItems));
	return id;
};

/**
 * Updates a specific property of an item in an array of items and returns the updated array.
 * @typeParam T - A generic type parameter representing an object with an `id` property of type `string`.
 * @typeParam V - The type of the new value to set for the specified property.
 * @param itemId - The ID of the item to update.
 * @param propertyName - The name of the property to be updated, which must exist in the object of type T.
 * @param newValue - The new value to set.
 * @param allItems - An array of items of type `T` to update within.
 * @returns A new array of items with the specified item's property updated. If the item is not found, returns the original array.
 **/
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
