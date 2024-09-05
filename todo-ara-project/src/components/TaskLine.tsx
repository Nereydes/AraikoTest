import { Bars3Icon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Task } from "../services/TaskService";
import { Button, ButtonWithIcon } from "./utils/Button";
import { Checkbox } from "react-aria-components";
import { formatDate } from "../utils/DateUtilities";
import { TaskList } from "./TaskList";
import { TaskMenu } from "./TaskMenu";

export const TaskLine = (props: Task) => {
	const { name, isCompleted, creationDate, subtasks } = props;
	return (
		<li>
			<div className="flex gap-5 items-center group/task peer/task p-3 hover:bg-slate-50 rounded-xl transition-colors">
				<TaskMenu />
				<input type="checkbox" checked={isCompleted} aria-label="Is task completed?" />
				<span className="text-lg grow">{name}</span>
				<span className="hidden group-hover/task:block text-sm text-slate-400 italic">{formatDate(creationDate)}</span>
				<ButtonWithIcon icon={<TrashIcon className="w-5 h-5 text-red-700" />} label="Supprimer la tâche" variant="transparent" />
			</div>
			<TaskList tasks={subtasks || []} />
			<div className="w-full group/newTask h-5 flex items-end">
				<Button className="transition-opacity ml-24 group-hover/newTask:opacity-100 opacity-0 flex gap-1 items-center" variant="yellow">
					<PlusIcon className="w-3 h-3" />
					Ajouter une sous-tâche
				</Button>
			</div>
		</li>
	);
};
