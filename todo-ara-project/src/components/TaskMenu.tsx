import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { Button, ButtonWithIcon } from "./utils/Button";
import { ArrowLongDownIcon, ArrowLongUpIcon, Bars3Icon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { SwapDirection, Task, removeTask, swapOrder } from "../services/TaskService";
import { useContext } from "react";
import { ListContext } from "../App";

export const TaskMenu = (props: {
	canGoUp: boolean;
	canGoDown: boolean;
	deleteTask: () => void;
	swapTaskOrder: (direction: SwapDirection) => void;
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
