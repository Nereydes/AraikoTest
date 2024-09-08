import { useContext, useMemo } from "react";
import { ListContext } from "../App";
import { ButtonWithIcon } from "./utils/Button";
import { DocumentArrowDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TaskList } from "./TaskList";
import { DialogTrigger } from "react-aria-components";
import { ListManagement } from "./ListManagement";
import { removeList } from "../services/ListService";
import { getJSONUrlFromTasksList } from "../services/TaskService";

export const ListDisplay = (props: {}) => {
	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [currentListId, setCurrentListId] = context.currentListState;
	const [lists, setLists] = context.listsState;

	const currentList = useMemo(() => lists.find((list) => list.id === currentListId), [lists, currentListId]);

	console.log(currentList);

	return currentList ? (
		<div className="h-full flex flex-col gap-20">
			<div className="flex gap-5 items-center">
				<h2 className="text-4xl font-bold grow">{currentList.name}</h2>
				<DialogTrigger>
					<ButtonWithIcon icon={<PencilIcon className="w-4 h-4" />} label="Modifier la liste" variant="yellow" />
					<ListManagement list={currentList} />
				</DialogTrigger>
				<a href={getJSONUrlFromTasksList(currentList.tasks)} download>
					<ButtonWithIcon icon={<DocumentArrowDownIcon className="w-4 h-4" />} variant="yellow" label="Sauvegarder la liste" />
				</a>
				<ButtonWithIcon
					icon={<TrashIcon className="w-4 h-4" />}
					label="Supprimer la liste"
					variant="yellow"
					onPress={() => {
						setLists((prev) => removeList(currentList.id, prev));
						setCurrentListId(undefined);
					}}
				/>
			</div>
			<div className="h-5/6 overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-dark scrollbar-track-light">
				<TaskList tasks={currentList.tasks.filter((task) => task.parentId === undefined)} />
			</div>
		</div>
	) : null;
};
