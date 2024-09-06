import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { Button, ButtonWithIcon } from "./utils/Button";
import { ArrowLongDownIcon, ArrowLongUpIcon, Bars3Icon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Task, removeTask, swapOrder } from "../services/TaskService";
import { useContext } from "react";
import { ListContext } from "../App";

export const TaskMenu = (props: { task: Task; addSubtask: () => void }) => {
	const { task, addSubtask } = props;
	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [tasksState, setTasksState] = context.tasksState;

	return (
		<DialogTrigger>
			<ButtonWithIcon icon={<Bars3Icon className="w-5 h-5" />} label="Menu" variant="transparent" />
			<Popover>
				<Dialog className="bg-slate-100/90 rounded-xl shadow-md">
					<Button
						className="flex gap-1 items-center"
						variant="yellow"
						onPress={() => {
							setTasksState((prev) => removeTask(task.id, prev));
						}}
					>
						<TrashIcon className="w-3 h-3" />
						Supprimer la tâche
					</Button>
					<Button
						className="flex gap-1 items-center"
						variant="yellow"
						onPress={() => {
							setTasksState((prev) => swapOrder(task.id, "ASC", prev));
						}}
					>
						<ArrowLongUpIcon className="w-3 h-3" />
						Monter la tâche
					</Button>
					<Button
						className="flex gap-1 items-center"
						variant="yellow"
						onPress={() => {
							setTasksState((prev) => swapOrder(task.id, "DESC", prev));
						}}
					>
						<ArrowLongDownIcon className="w-3 h-3" />
						Descendre la tâche
					</Button>
					<Button className="flex gap-1 items-center" variant="yellow" onPress={addSubtask}>
						<PlusIcon className="w-3 h-3" />
						Ajouter une sous-tâche
					</Button>
				</Dialog>
			</Popover>
		</DialogTrigger>
	);
};
