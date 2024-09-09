import { Dialog, DialogTrigger, Popover } from "react-aria-components";
import { ArrowLongDownIcon, ArrowLongUpIcon, Bars3Icon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { SwapDirection } from "../../services/TaskService";
import { Button, ButtonWithIcon } from "../utils/Button";

/**
 * Button to display a menu of options with various functions for managing a task.
 */
export const TaskMenu = (props: {
	/**
	 * Displays or not the button to move the task up the list.
	 */
	canGoUp: boolean;
	/**
	 * Displays or not the button to move the task down the list.
	 */
	canGoDown: boolean;
	/**
	 * Function to delete a task on click.
	 */
	deleteTask: () => void;
	/**
	 * Changes the order of the task in the list.
	 * @param direction "ASC" move the task up the list, "DESC" move the task down the list.
	 */
	swapTaskOrder: (direction: SwapDirection) => void;
	/**
	 * Adds a subtask to the end of the subtask list.
	 */
	addSubtask: () => void;
}) => {
	const { canGoDown, canGoUp, deleteTask, swapTaskOrder, addSubtask } = props;

	return (
		<DialogTrigger>
			<ButtonWithIcon icon={<Bars3Icon className="w-5 h-5" />} label="Menu" variant="transparent" />
			<Popover>
				<Dialog className="p-5 bg-yellow rounded-xl shadow-md text-dark">
					<Button className="flex gap-1 items-center w-full hover:bg-yellow-light hover:font-bold" variant="transparent" onPress={deleteTask}>
						<TrashIcon className="w-3 h-3" />
						Supprimer la tâche
					</Button>
					{canGoUp && (
						<Button
							className="flex gap-1 items-center w-full hover:bg-yellow-light hover:font-bold"
							variant="transparent"
							onPress={() => {
								swapTaskOrder("ASC");
							}}
						>
							<ArrowLongUpIcon className="w-3 h-3" />
							Monter la tâche
						</Button>
					)}
					{canGoDown && (
						<Button
							className="flex gap-1 items-center w-full hover:bg-yellow-light hover:font-bold"
							variant="transparent"
							onPress={() => {
								swapTaskOrder("DESC");
							}}
						>
							<ArrowLongDownIcon className="w-3 h-3" />
							Descendre la tâche
						</Button>
					)}
					<Button className="flex gap-1 items-center w-full hover:bg-yellow-light hover:font-bold" variant="transparent" onPress={addSubtask}>
						<PlusIcon className="w-3 h-3" />
						Ajouter une sous-tâche
					</Button>
				</Dialog>
			</Popover>
		</DialogTrigger>
	);
};
