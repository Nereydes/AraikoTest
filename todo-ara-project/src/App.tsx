import "./App.css";
import { createContext, useState } from "react";
import { getLists, List } from "./services/ListService";
import { Button, ButtonWithIcon } from "./components/utils/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { UploadListButton } from "./components/UploadListButton";
import { ListPreview } from "./components/ListPreview";
import { ListDisplay } from "./components/ListDisplay";
import { DialogTrigger } from "react-aria-components";
import { ListManagement } from "./components/ListManagement";

export interface ListOutletContext {
	listsState: [List[], React.Dispatch<React.SetStateAction<List[]>>];
	currentListState: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>];
}

export const ListContext = createContext<ListOutletContext | null>(null);

function App() {
	const listsState = useState(getLists());
	const [lists, setLists] = listsState;
	const currentListState = useState<string | undefined>(lists[0]?.id);
	const [currentList, setCurrentList] = currentListState;

	return (
		<ListContext.Provider value={{ listsState, currentListState }}>
			<div className="h-screen w-screen p-3 xl:flex">
				<div className="w-full h-[35%] min-h-[520px] p-8 xl:basis-1/2 xl:h-full xl:px-8 xl:py-32 2xl:px-20 3xl:px-60 4xl:px-72">
					<div className="h-3/5 xl:h-1/3 w-full space-y-8">
						<h1 className="text-4xl place-self-start font-bold">Mes supers listes</h1>
						<span className="text-sm text-light/60 place-self-start">
							Choisissez une liste pour voir les tâches à effectuer, créez-en une nouvelle ou importez-la depuis un fichier existant !
						</span>
						<DialogTrigger>
							<Button variant="yellow" size="md" className="w-full 2xl:w-1/2 max-w-96 m-auto">
								<PlusIcon className="w-4 h-4" />
								Ajouter une nouvelle liste
							</Button>
							<ListManagement />
						</DialogTrigger>
						<UploadListButton className="w-full 2xl:w-1/2 max-w-96 m-auto" />
					</div>
					<div className="h-2/5 xl:h-2/3 w-full ">
						<p className="text-lg">
							Listes créées <span className="text-light/60 text-sm">({lists.length})</span>
						</p>
						<div className="h-4/5 overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-light scrollbar-track-dark p-1 flex flex-wrap gap-8 ">
							{lists.map((list) => (
								<ListPreview key={list.id} list={list} />
							))}
							{lists.map((list) => (
								<ListPreview key={list.id} list={list} />
							))}
							{lists.map((list) => (
								<ListPreview key={list.id} list={list} />
							))}
							{lists.map((list) => (
								<ListPreview key={list.id} list={list} />
							))}
							{lists.map((list) => (
								<ListPreview key={list.id} list={list} />
							))}
							{lists.map((list) => (
								<ListPreview key={list.id} list={list} />
							))}
							{lists.map((list) => (
								<ListPreview key={list.id} list={list} />
							))}
							{lists.map((list) => (
								<ListPreview key={list.id} list={list} />
							))}
						</div>
					</div>
				</div>
				<div className="w-full h-full md:h-[65%] xl:h-full xl:basis-1/2 rounded-xl bg-light text-dark pt-1 md:p-20">
					<ListDisplay />
				</div>
			</div>
			{/* <div className="h-screen max-h-screen w-full xl:flex xl:flex-row p-3 items-center">
				<div className="max-h-[40%] ">
					<div className="flex flex-col gap-8 items-center">
						<h1 className="text-4xl place-self-start font-bold">Mes supers listes</h1>
						<span className="text-sm text-light/60 place-self-start">
							Choisissez une liste pour voir les tâches à effectuer, créez-en une nouvelle ou importez-la depuis un fichier existant !
						</span>
						<DialogTrigger>
							<Button variant="yellow" size="md" className="w-full 2xl:w-1/2 max-w-96">
								<PlusIcon className="w-4 h-4" />
								Ajouter une nouvelle liste
							</Button>
							<ListManagement />
						</DialogTrigger>
						<UploadListButton className="w-full 2xl:w-1/2 max-w-96" />
					</div>
					<p className="text-lg mt-20">
						Listes créées <span className="text-light/60 text-sm">({lists.length})</span>
					</p>
					<div className="p-1 flex flex-wrap gap-8 mt-5 h-1/3 xl:h-1/2 overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-light scrollbar-track-dark">
						{lists.map((list) => (
							<ListPreview key={list.id} list={list} />
						))}
						{lists.map((list) => (
							<ListPreview key={list.id} list={list} />
						))}
						{lists.map((list) => (
							<ListPreview key={list.id} list={list} />
						))}
						{lists.map((list) => (
							<ListPreview key={list.id} list={list} />
						))}
						{lists.map((list) => (
							<ListPreview key={list.id} list={list} />
						))}
						{lists.map((list) => (
							<ListPreview key={list.id} list={list} />
						))}
						{lists.map((list) => (
							<ListPreview key={list.id} list={list} />
						))}
						{lists.map((list) => (
							<ListPreview key={list.id} list={list} />
						))}
					</div>
				</div>
				<div className="xl:basis-1/2 xl:h-full rounded-xl bg-light text-dark p-20">
					<ListDisplay />
				</div>
			</div> */}
		</ListContext.Provider>
	);
}

export default App;
