import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { Button, ButtonWithIcon } from "./utils/Button";
import { ArrowLongDownIcon, ArrowLongUpIcon, Bars3Icon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export const TaskMenu = (props: {}) => {
	return (
		<DialogTrigger>
			<ButtonWithIcon icon={<Bars3Icon className="w-5 h-5" />} label="Menu" variant="transparent" />
			<Popover>
				<Dialog className="bg-slate-100/90 rounded-xl shadow-md">
					<Button className="flex gap-1 items-center" variant="yellow">
						<TrashIcon className="w-3 h-3" />
						Supprimer la tâche
					</Button>
					<Button className="flex gap-1 items-center" variant="yellow">
						<PencilIcon className="w-3 h-3" />
						Modifier la tâche
					</Button>
					<Button className="flex gap-1 items-center" variant="yellow">
						<ArrowLongUpIcon className="w-3 h-3" />
						Monter la tâche
					</Button>
					<Button className="flex gap-1 items-center" variant="yellow">
						<ArrowLongDownIcon className="w-3 h-3" />
						Descendre la tâche
					</Button>
					<Button className="flex gap-1 items-center" variant="yellow">
						<PlusIcon className="w-3 h-3" />
						Ajouter une sous-tâche
					</Button>
				</Dialog>
			</Popover>
		</DialogTrigger>
	);
};
