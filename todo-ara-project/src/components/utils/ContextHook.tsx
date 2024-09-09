import { useContext } from "react";
import { ListContext, ListOutletContext } from "../../App";

/**
 * Hook to access the context directly and throw an error if it is not found.
 * @returns {ListOutletContext} Context containing the local state of the application (task lists and selected list).
 */
export const useListContext = (): ListOutletContext => {
	const context = useContext(ListContext);

	if (!context) {
		throw new Error("useListContext must be used within a ListContext.Provider");
	}

	return context;
};
