import { ColorThumb, ColorWheel, ColorWheelTrack, Dialog, Input, Label, Modal, TextField } from "react-aria-components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { useListContext } from "../utils/ContextHook";
import { addList, createNewList, List } from "../../services/ListService";
import { updateItem } from "../../services/GenericService";
import { Button, ButtonWithIcon } from "../utils/Button";

/**
 * Component displaying a modal for creating or updating a list.
 * @param {List | undefined} props.list If a list has been passed in props, it will be updated when the form is validated. Otherwise, a new list will be created.
 */
export const ListManagement = (props: { list?: List }) => {
	const { list } = props;

	const {
		listsState: [lists, setLists],
	} = useListContext();

	/**
	 * Allows to save the list name and color locally and update them.
	 * Updates when a new list is passed to props.
	 */
	const currentList = useMemo(
		() => ({
			name: list?.name,
			color: list?.color,
		}),
		[list]
	);

	const createList = () => {
		if (currentList.name && currentList.color) {
			const newList = {
				...createNewList(lists),
				color: currentList.color,
				name: currentList.name,
			};
			setLists((prev) => addList(newList, prev));
		}
	};

	const updateList = () => {
		if (list && currentList.name && currentList.color) {
			let listsUpdated = updateItem(list.id, "name", currentList.name, lists);
			listsUpdated = updateItem(list.id, "color", currentList.color, listsUpdated);
			setLists(listsUpdated);
		}
	};

	return (
		<Modal className="absolute top-0 bottom-0 left-0 right-0 bg-dark/50 flex items-center justify-center">
			<Dialog className="w-1/4 bg-light text-dark outline-none overflow-auto min-h-80 rounded-xl">
				{({ close }) => (
					<>
						<ButtonWithIcon className="ml-auto" onPress={close} variant="transparent" label="Fermer" icon={<XMarkIcon className="w-4 h-4" />} />
						<h3 slot="title" className="text-xl font-bold m-auto text-center">
							{list ? "Modifier" : "Créer"} une liste
						</h3>
						<div className="w-full p-8 flex flex-col gap-8 items-center">
							<TextField className="flex flex-col w-full" defaultValue={currentList.name} onChange={(value) => (currentList.name = value)}>
								<Label className="text-sm">Nom</Label>
								<Input className="p-1 m-0 border border-dark/30 rounded-md bg-light text-base text-dark focus:outline-2 focus:outline-yellow focus:-outline-offset-1" />
							</TextField>
							<ColorWheel
								defaultValue={currentList.color}
								onChange={(value) => {
									currentList.color = value.toString("hex");
								}}
								outerRadius={100}
								innerRadius={80}
							>
								<ColorWheelTrack />
								<ColorThumb className="border-2 border-light shadow-sm w-5 h-5 rounded-[50%] box-border focus-visible:w-6 focus-visible:h-6" />
							</ColorWheel>
							<div className="flex w-full gap-5 justify-center items-center">
								<Button variant="yellow" size="md" className="w-40" onPress={close}>
									Annuler
								</Button>
								<Button
									variant="yellow"
									size="md"
									className="w-40"
									onPress={() => {
										if (list) {
											updateList();
										} else {
											createList();
										}
										close();
									}}
								>
									Valider
								</Button>
							</div>
						</div>
					</>
				)}
			</Dialog>
		</Modal>
	);
};
