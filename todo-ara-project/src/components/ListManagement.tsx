import { ColorThumb, ColorWheel, ColorWheelTrack, Dialog, Input, Label, Modal, parseColor, TextField } from "react-aria-components";
import { addList, createNewList, List } from "../services/ListService";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, ButtonWithIcon } from "./utils/Button";
import { useContext, useMemo, useState } from "react";
import { ListContext } from "../App";
import { updateItem } from "../services/GenericService";

export const ListManagement = (props: { list?: List }) => {
	const { list } = props;

	const context = useContext(ListContext);

	if (!context) {
		throw new Error("Missing context from tasks list");
	}

	const [listsState, setListsState] = context.listsState;

	const currentList = useMemo(
		() => ({
			name: list?.name,
			color: list?.color,
		}),
		[list]
	);

	const createList = () => {
		if (currentList.name && currentList.color) {
			const newList = createNewList(listsState);
			newList.color = currentList.color;
			newList.name = currentList.name;
			setListsState((prev) => addList(newList, prev));
		}
	};

	const updateList = () => {
		if (list && currentList.name && currentList.color) {
			let lists = updateItem(list.id, "name", currentList.name, listsState);
			lists = updateItem(list.id, "color", currentList.color, lists);
			setListsState(lists);
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
